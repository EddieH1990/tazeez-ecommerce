import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { Order, OrderUpdateData } from '../types/order';
import { toast } from 'react-hot-toast';

export const useOrders = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders', user?.uid],
    queryFn: async (): Promise<Order[]> => {
      if (!user?.uid) return [];
      const q = query(
        collection(db, 'orders'),
        where('sellerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
    },
    enabled: !!user?.uid,
  });

  const updateOrder = useMutation({
    mutationFn: async ({ orderId, data }: { orderId: string; data: OrderUpdateData }) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', user?.uid]);
      toast.success('تم تحديث الطلب بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث الطلب');
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    updateOrder: updateOrder.mutate,
    isUpdating: updateOrder.isLoading,
  };
};