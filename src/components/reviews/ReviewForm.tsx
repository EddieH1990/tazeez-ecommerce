import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, X, Upload } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { CreateReviewData, ReviewRating } from '../../types/review';
import LoadingSpinner from '../LoadingSpinner';

const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'التعليق يجب أن يكون 10 أحرف على الأقل'),
  images: z.array(z.string()).optional(),
});

interface ReviewFormProps {
  productId: string;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onClose }) => {
  const { createReview, isCreating } = useReviews(productId);
  const [hoveredRating, setHoveredRating] = React.useState<ReviewRating | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateReviewData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId,
      rating: 5,
      images: [],
    },
  });

  const currentRating = watch('rating');

  const onSubmit = (data: CreateReviewData) => {
    createReview(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-xl m-4"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">إضافة تقييم</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التقييم
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setValue('rating', rating as ReviewRating)}
                  onMouseEnter={() => setHoveredRating(rating as ReviewRating)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="text-2xl focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoveredRating !== null ? rating <= hoveredRating : rating <= currentRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التعليق
            </label>
            <textarea
              {...register('comment')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="اكتب تجربتك مع المنتج..."
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إضافة صور
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                اسحب وأفلت الصور هنا، أو اضغط للاختيار
              </p>
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
              {isCreating ? <LoadingSpinner size="sm" /> : 'إضافة التقييم'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReviewForm;