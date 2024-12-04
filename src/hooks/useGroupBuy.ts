import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { GroupBuy, CreateGroupBuyData, GroupStatus } from '../types/group';
import { toast } from 'react-hot-toast';

export const useGroupBuy = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const groupsQuery = useQuery({
    queryKey: ['groups', user?.uid],
    queryFn: async (): Promise<GroupBuy[]> => {
      if (!user?.uid) return [];
      const q = query(
        collection(db, 'groups'),
        where('sellerId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GroupBuy[];
    },
    enabled: !!user?.uid,
  });

  const createGroup = useMutation({
    mutationFn: async (data: CreateGroupBuyData) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const groupData = {
        ...data,
        sellerId: user.uid,
        currentParticipants: 0,
        participants: [],
        status: 'pending' as GroupStatus,
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'groups'), groupData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groups', user?.uid]);
      toast.success('تم إنشاء المجموعة بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إنشاء المجموعة');
    },
  });

  const updateGroup = useMutation({
    mutationFn: async ({ groupId, data }: { groupId: string; data: Partial<GroupBuy> }) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const docRef = doc(db, 'groups', groupId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groups', user?.uid]);
      toast.success('تم تحديث المجموعة بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء تحديث المجموعة');
    },
  });

  const joinGroup = useMutation({
    mutationFn: async ({ groupId, userId, name }: { groupId: string; userId: string; name: string }) => {
      const docRef = doc(db, 'groups', groupId);
      const participant = {
        userId,
        name,
        joinedAt: new Date().toISOString(),
        paymentStatus: 'pending',
      };
      await updateDoc(docRef, {
        participants: [...(await getDocs(query(collection(db, 'groups'), where('id', '==', groupId)))).docs[0].data().participants, participant],
        currentParticipants: (await getDocs(query(collection(db, 'groups'), where('id', '==', groupId)))).docs[0].data().currentParticipants + 1,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
      toast.success('تم الانضمام للمجموعة بنجاح');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء الانضمام للمجموعة');
    },
  });

  return {
    groups: groupsQuery.data || [],
    isLoading: groupsQuery.isLoading,
    isError: groupsQuery.isError,
    createGroup: createGroup.mutate,
    updateGroup: updateGroup.mutate,
    joinGroup: joinGroup.mutate,
    isCreating: createGroup.isLoading,
    isUpdating: updateGroup.isLoading,
    isJoining: joinGroup.isLoading,
  };
};