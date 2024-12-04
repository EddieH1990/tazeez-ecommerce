export type PaymentMethod = 'card' | 'bank_transfer' | 'mada';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface PaymentDetails {
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

export interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferDate: string;
  referenceNumber: string;
}