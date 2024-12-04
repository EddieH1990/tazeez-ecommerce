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

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userType: 'customer',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
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
      });

      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/dashboard');
    } catch (error) {
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى');
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
                onClick={() => setUserType('customer')}
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
                onClick={() => setUserType('seller')}
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