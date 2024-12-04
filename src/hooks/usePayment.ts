import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { PaymentDetails, PaymentMethod, CardDetails, BankTransferDetails } from '../types/payment';
import { toast } from 'react-hot-toast';

export const usePayment = () => {
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = useMutation({
    mutationFn: async ({
      amount,
      method,
      orderId,
      details
    }: {
      amount: number;
      method: PaymentMethod;
      orderId: string;
      details: CardDetails | BankTransferDetails;
    }) => {
      if (!user) throw new Error('User not authenticated');
      setIsProcessing(true);

      try {
        // Create payment record
        const paymentData: Partial<PaymentDetails> = {
          method,
          amount,
          currency: 'SAR',
          status: 'processing',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Add payment to Firestore
        const paymentRef = await addDoc(collection(db, 'payments'), paymentData);

        // Update order with payment reference
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
          paymentId: paymentRef.id,
          paymentStatus: 'processing',
          updatedAt: new Date().toISOString(),
        });

        // Process payment based on method
        if (method === 'card') {
          // Integrate with Stripe or other payment gateway
          // This is where you'd make the actual payment processing call
          console.log('Processing card payment:', details);
        } else if (method === 'bank_transfer') {
          // Handle bank transfer verification
          console.log('Processing bank transfer:', details);
        }

        // Update payment status to completed
        await updateDoc(doc(db, 'payments', paymentRef.id), {
          status: 'completed',
          updatedAt: new Date().toISOString(),
        });

        return { success: true, paymentId: paymentRef.id };
      } catch (error) {
        console.error('Payment processing error:', error);
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: () => {
      toast.success('تم معالجة الدفع بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء معالجة الدفع');
    },
  });

  const refundPayment = useMutation({
    mutationFn: async ({ paymentId, amount }: { paymentId: string; amount: number }) => {
      if (!user) throw new Error('User not authenticated');

      // Process refund
      const paymentRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentRef, {
        status: 'refunded',
        refundedAmount: amount,
        refundedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return { success: true };
    },
    onSuccess: () => {
      toast.success('تم إجراء الاسترداد بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إجراء الاسترداد');
    },
  });

  return {
    processPayment: processPayment.mutate,
    refundPayment: refundPayment.mutate,
    isProcessing,
    isRefunding: refundPayment.isLoading,
  };
};