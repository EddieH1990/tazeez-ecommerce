import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { Product, ProductFormData } from '../types/product';
import { toast } from 'react-hot-toast';

export const useProducts = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products', user?.uid],
    queryFn: async (): Promise<Product[]> => {
      if (!user?.uid) return [];
      const q = query(
        collection(db, 'products'),
        where('sellerId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    },
    enabled: !!user?.uid,
  });

  const createProduct = useMutation({
    mutationFn: async (data: ProductFormData) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const productData = {
        ...data,
        sellerId: user.uid,
        currentParticipants: 0,
        inventory: {
          total: data.inventory,
          available: data.inventory,
          reserved: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'products'), productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products', user?.uid]);
      toast.success('تم إضافة المنتج بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إضافة المنتج');
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductFormData> }) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products', user?.uid]);
      toast.success('تم تحديث المنتج بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث المنتج');
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products', user?.uid]);
      toast.success('تم حذف المنتج بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء حذف المنتج');
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
    isCreating: createProduct.isLoading,
    isUpdating: updateProduct.isLoading,
    isDeleting: deleteProduct.isLoading,
  };
};