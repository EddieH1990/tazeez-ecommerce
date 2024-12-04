export type OrderStatus = 
  | 'pending'    // Waiting for group completion
  | 'confirmed'  // Group completed, waiting for payment
  | 'paid'       // Payment received
  | 'processing' // Order is being prepared
  | 'shipped'    // Order has been shipped
  | 'delivered'  // Order has been delivered
  | 'cancelled'  // Order was cancelled
  | 'refunded';  // Order was refunded

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  sellerId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderUpdateData {
  status?: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}