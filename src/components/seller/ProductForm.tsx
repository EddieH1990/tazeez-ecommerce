import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { ProductFormData } from '../../types/product';
import LoadingSpinner from '../LoadingSpinner';

const schema = z.object({
  name: z.string().min(3, 'اسم المنتج يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(20, 'وصف المنتج يجب أن يكون 20 حرف على الأقل'),
  price: z.number().min(1, 'السعر يجب أن يكون أكبر من 0'),
  groupPrice: z.number().min(1, 'سعر المجموعة يجب أن يكون أكبر من 0'),
  requiredParticipants: z.number().min(2, 'عدد المشاركين يجب أن يكون 2 على الأقل'),
  category: z.string().min(1, 'يجب اختيار الفئة'),
  inventory: z.number().min(1, 'المخزون يجب أن يكون أكبر من 0'),
  images: z.array(z.string()).min(1, 'يجب إضافة صورة واحدة على الأقل'),
  features: z.array(z.string()),
  specifications: z.record(z.string()),
  status: z.enum(['active', 'draft', 'inactive']),
});

interface ProductFormProps {
  productId?: string | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, onClose }) => {
  const { products, createProduct, updateProduct, isCreating, isUpdating } = useProducts();
  const product = productId ? products.find(p => p.id === productId) : null;

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      groupPrice: product.groupPrice,
      requiredParticipants: product.requiredParticipants,
      category: product.category,
      inventory: product.inventory.total,
      images: product.images,
      features: product.features,
      specifications: product.specifications,
      status: product.status,
    } : {
      status: 'draft',
      features: [],
      specifications: {},
      images: [],
    },
  });

  const onSubmit = (data: ProductFormData) => {
    if (productId) {
      updateProduct({ id: productId, data });
    } else {
      createProduct(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {productId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المنتج
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">اختر الفئة</option>
                <option value="electronics">إلكترونيات</option>
                <option value="fashion">أزياء</option>
                <option value="home">منزل</option>
                <option value="beauty">جمال وعناية</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف المنتج
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر الأصلي
              </label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر المجموعة
              </label>
              <input
                type="number"
                {...register('groupPrice', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.groupPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.groupPrice.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عدد المشاركين المطلوب
              </label>
              <input
                type="number"
                {...register('requiredParticipants', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.requiredParticipants && (
                <p className="text-red-500 text-sm mt-1">{errors.requiredParticipants.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المخزون
            </label>
            <input
              type="number"
              {...register('inventory', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            {errors.inventory && (
              <p className="text-red-500 text-sm mt-1">{errors.inventory.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isCreating || isUpdating ? (
                <LoadingSpinner size="sm" />
              ) : productId ? (
                'تحديث المنتج'
              ) : (
                'إضافة المنتج'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;