import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { UserProfile, ProfileFormData } from '../types/user';
import { toast } from 'react-hot-toast';

export const useProfile = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile', user?.uid],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user?.uid) return null;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() as UserProfile : null;
    },
    enabled: !!user?.uid,
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: data.name,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
        },
        preferences: {
          notifications: data.notifications,
          newsletter: data.newsletter,
          language: data.language,
        },
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', user?.uid]);
      toast.success('تم تحديث الملف الشخصي بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي');
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isLoading,
  };
};