import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { Review, CreateReviewData, ReviewStats } from '../types/review';
import { toast } from 'react-hot-toast';

export const useReviews = (productId?: string) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async (): Promise<Review[]> => {
      if (!productId) return [];
      const q = query(
        collection(db, 'reviews'),
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
    },
    enabled: !!productId,
  });

  const statsQuery = useQuery({
    queryKey: ['reviewStats', productId],
    queryFn: async (): Promise<ReviewStats> => {
      if (!productId || !reviewsQuery.data) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          verifiedPurchases: 0,
        };
      }

      const reviews = reviewsQuery.data;
      const distribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      return {
        averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
        totalReviews: reviews.length,
        ratingDistribution: {
          1: distribution[1] || 0,
          2: distribution[2] || 0,
          3: distribution[3] || 0,
          4: distribution[4] || 0,
          5: distribution[5] || 0,
        },
        verifiedPurchases: reviews.filter(r => r.verified).length,
      };
    },
    enabled: !!productId && !!reviewsQuery.data,
  });

  const createReview = useMutation({
    mutationFn: async (data: CreateReviewData) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const reviewData = {
        ...data,
        userId: user.uid,
        userName: user.displayName || 'مستخدم',
        likes: 0,
        helpful: false,
        verified: true, // Should be checked against orders
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'reviews'), reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId]);
      queryClient.invalidateQueries(['reviewStats', productId]);
      toast.success('تم إضافة التقييم بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إضافة التقييم');
    },
  });

  const markHelpful = useMutation({
    mutationFn: async (reviewId: string) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'reviews', reviewId);
      await updateDoc(docRef, {
        helpful: true,
        likes: (await getDocs(query(collection(db, 'reviews'), where('id', '==', reviewId)))).docs[0].data().likes + 1,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId]);
      toast.success('شكراً على تقييمك');
    },
  });

  return {
    reviews: reviewsQuery.data || [],
    stats: statsQuery.data,
    isLoading: reviewsQuery.isLoading || statsQuery.isLoading,
    isError: reviewsQuery.isError || statsQuery.isError,
    createReview: createReview.mutate,
    markHelpful: markHelpful.mutate,
    isCreating: createReview.isLoading,
    isMarking: markHelpful.isLoading,
  };
};