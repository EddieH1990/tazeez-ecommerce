import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { Store, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const userSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().min(10, 'رقم الجوال غير صالح'),
  userType: z.enum(['customer', 'seller']),
  // Additional fields for sellers
  storeName: z.string().optional(),
  storeAddress: z.string().optional(),
  commercialRegister: z.string().optional(),
});

type FormData = z.infer<typeof userSchema>;

const Signup = () => {
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer');
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userType: 'customer',
    },
  });

  // Update userType in form when button is clicked
  const handleUserTypeChange = (type: 'customer' | 'seller') => {
    setUserType(type);
    setValue('userType', type);
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Starting signup process with data:', {
        email: data.email,
        name: data.name,
        phone: data.phone,
        userType: data.userType
      });

      if (!data.email || !data.password) {
        console.error('Missing email or password');
        toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور');
        return;
      }

      // Log Firebase auth state
      const currentUser = auth.currentUser;
      console.log('Current auth state:', { 
        isInitialized: auth.currentUser !== undefined,
        currentUser: currentUser ? currentUser.uid : 'none'
      });

      console.log('Attempting to create user with Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        .catch(error => {
          console.error('Firebase Auth Error:', {
            code: error.code,
            message: error.message,
            fullError: error
          });
          throw error; // Re-throw to be caught by outer catch
        });

      console.log('User created successfully:', userCredential.user.uid);

      // Create user profile in Firestore
      try {
        const userProfile = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          userType: data.userType,
          ...(data.userType === 'seller' && {
            storeName: data.storeName,
            storeAddress: data.storeAddress,
            commercialRegister: data.commercialRegister,
            verified: false,
          }),
          createdAt: new Date().toISOString(),
        };
        
        console.log('Creating user profile in Firestore:', userProfile);
        await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
        console.log('User profile created in Firestore');
      } catch (firestoreError) {
        console.error('Firestore Error:', {
          code: firestoreError.code,
          message: firestoreError.message,
          fullError: firestoreError
        });
        // Continue with navigation even if Firestore fails
      }

      // Set the user in the auth store
      setUser(userCredential.user);
      
      toast.success('تم إنشاء الحساب بنجاح');
      console.log('Navigating to dashboard...');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Signup Error:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      
      let errorMessage = 'حدث خطأ، يرجى المحاولة مرة أخرى';

      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
          break;
        case 'auth/invalid-email':
          errorMessage = 'البريد الإلكتروني غير صالح';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'تسجيل المستخدمين غير مفعل حالياً';
          break;
        case 'auth/weak-password':
          errorMessage = 'كلمة المرور ضعيفة جداً';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'فشل الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'تم تجاوز عدد المحاولات المسموح بها، يرجى المحاولة لاحقاً';
          break;
        default:
          errorMessage = `خطأ: ${error.message}`;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 mb-8">
            <ArrowRight className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h1 className="text-3xl font-bold mb-8">إنشاء حساب جديد</h1>

            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => handleUserTypeChange('customer')}
                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                  userType === 'customer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <User className="w-6 h-6" />
                <span>مشتري</span>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('seller')}
                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                  userType === 'seller'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <Store className="w-6 h-6" />
                <span>تاجر</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input type="hidden" {...register('userType')} value={userType} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الجوال
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {userType === 'seller' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اسم المتجر
                    </label>
                    <input
                      {...register('storeName')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.storeName && (
                      <p className="text-red-500 text-sm mt-1">{errors.storeName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عنوان المتجر
                    </label>
                    <input
                      {...register('storeAddress')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.storeAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.storeAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم السجل التجاري
                    </label>
                    <input
                      {...register('commercialRegister')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.commercialRegister && (
                      <p className="text-red-500 text-sm mt-1">{errors.commercialRegister.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                إنشاء حساب
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-emerald-600 hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;