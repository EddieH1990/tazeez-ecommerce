export type GroupStatus = 
  | 'pending'    // Waiting for more participants
  | 'active'     // Group is active and accepting participants
  | 'completed'  // Required participants reached
  | 'expired'    // Time limit reached without completion
  | 'cancelled'; // Group was cancelled

export interface GroupParticipant {
  userId: string;
  name: string;
  joinedAt: string;
  paymentStatus: 'pending' | 'paid';
}

export interface GroupBuy {
  id: string;
  productId: string;
  sellerId: string;
  title: string;
  description: string;
  originalPrice: number;
  groupPrice: number;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  participants: GroupParticipant[];
  startDate: string;
  endDate: string;
  status: GroupStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupBuyData {
  productId: string;
  title: string;
  description: string;
  originalPrice: number;
  groupPrice: number;
  minParticipants: number;
  maxParticipants: number;
  endDate: string;
}