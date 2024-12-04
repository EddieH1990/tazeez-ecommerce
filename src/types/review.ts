export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: ReviewRating;
  comment: string;
  images?: string[];
  likes: number;
  helpful: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  productId: string;
  rating: ReviewRating;
  comment: string;
  images?: string[];
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<ReviewRating, number>;
  verifiedPurchases: number;
}