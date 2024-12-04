import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useGroupBuy } from '../../hooks/useGroupBuy';
import { CreateGroupBuyData } from '../../types/group';
import LoadingSpinner from '../LoadingSpinner';

const schema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(20, 'الوصف يجب أن يكون 20 حرف على الأقل'),
  originalPrice: z.number().min(1, 'السعر يجب أن يكون أكبر من 0'),
  groupPrice: z.number().min(1, 'سعر المجموعة يجب أن يكون أكبر من 0'),
  minParticipants: z.number().min(2, 'الحد الأدنى للمشاركين يجب أن يكون 2'),
  maxParticipants: z.number().min(2, 'الحد الأقصى للمشاركين يجب أن يكون 2'),
  endDate: z.string().min(1, 'يجب تحديد تاريخ انتهاء'),
  productId: z.string().min(1, 'يجب اختيار المنتج'),
});

interface GroupBuyFormProps {
  onClose: () => void;
  productId?: string;
}

const GroupBuyForm: React.FC<GroupBuyFormProps> = ({ onClose, productId }) => {
  const { createGroup, isCreating } = useGroupBuy();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateGroupBuyData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: productId || '',
      minParticipants: 2,
      maxParticipants: 10,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: CreateGroupBuyData) => {
    createGroup(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">إنشاء مجموعة شراء جديدة</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان المجموعة
            </label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر الأصلي
              </label>
              <input
                type="number"
                {...register('originalPrice', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.originalPrice.message}</p>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الأدنى للمشاركين
              </label>
              <input
                type="number"
                {...register('minParticipants', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.minParticipants && (
                <p className="text-red-500 text-sm mt-1">{errors.minParticipants.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الأقصى للمشاركين
              </label>
              <input
                type="number"
                {...register('maxParticipants', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.maxParticipants && (
                <p className="text-red-500 text-sm mt-1">{errors.maxParticipants.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الانتهاء
              </label>
              <input
                type="date"
                {...register('endDate')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
              )}
            </div>
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
              disabled={isCreating}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? <LoadingSpinner size="sm" /> : 'إنشاء المجموعة'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GroupBuyForm;