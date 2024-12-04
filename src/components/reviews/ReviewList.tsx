import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Check } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { Review } from '../../types/review';
import LoadingSpinner from '../LoadingSpinner';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { reviews, stats, isLoading, markHelpful } = useReviews(productId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          لا توجد تقييمات
        </h3>
        <p className="text-gray-500">
          كن أول من يقيم هذا المنتج
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      {stats && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`w-4 h-4 ${
                      rating <= Math.round(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stats.totalReviews} تقييم
              </div>
            </div>

            <div className="flex-1">
              {Object.entries(stats.ratingDistribution)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="text-sm text-gray-500 w-8">{rating}</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-emerald-600 rounded-full"
                        style={{
                          width: `${(count / stats.totalReviews) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-500 w-8">{count}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onMarkHelpful={() => markHelpful(review.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ReviewItem: React.FC<{
  review: Review;
  onMarkHelpful: () => void;
}> = ({ review, onMarkHelpful }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b pb-6"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.userName}</span>
            {review.verified && (
              <span className="text-emerald-600 text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                مشتري مؤكد
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`w-4 h-4 ${
                  rating <= review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString('ar-SA')}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`صورة ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <button
        onClick={onMarkHelpful}
        disabled={review.helpful}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 disabled:opacity-50"
      >
        <ThumbsUp className="w-4 h-4" />
        <span>مفيد ({review.likes})</span>
      </button>
    </motion.div>
  );
};

export default ReviewList;