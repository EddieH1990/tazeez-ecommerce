import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { Chat, Message, CreateMessageData } from '../types/chat';
import { toast } from 'react-hot-toast';

export const useChat = (chatId?: string) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const chatsQuery = useQuery({
    queryKey: ['chats', user?.uid],
    queryFn: async (): Promise<Chat[]> => {
      if (!user?.uid) return [];
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', { id: user.uid }),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];
    },
    enabled: !!user?.uid,
  });

  const messagesQuery = useQuery({
    queryKey: ['messages', chatId],
    queryFn: async (): Promise<Message[]> => {
      if (!chatId) return [];
      const q = query(
        collection(db, 'messages'),
        where('chatId', '==', chatId),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
    },
    enabled: !!chatId,
  });

  const sendMessage = useMutation({
    mutationFn: async (data: CreateMessageData) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const messageData = {
        ...data,
        senderId: user.uid,
        senderName: user.displayName || 'مستخدم',
        read: false,
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'messages'), messageData);
      
      // Update chat's last message and timestamp
      const chatRef = doc(db, 'chats', data.chatId);
      await updateDoc(chatRef, {
        lastMessage: messageData,
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', chatId]);
      queryClient.invalidateQueries(['chats', user?.uid]);
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إرسال الرسالة');
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (messageId: string) => {
      if (!user?.uid) throw new Error('User not authenticated');
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', chatId]);
      queryClient.invalidateQueries(['chats', user?.uid]);
    },
  });

  return {
    chats: chatsQuery.data || [],
    messages: messagesQuery.data || [],
    isLoadingChats: chatsQuery.isLoading,
    isLoadingMessages: messagesQuery.isLoading,
    isError: chatsQuery.isError || messagesQuery.isError,
    sendMessage: sendMessage.mutate,
    markAsRead: markAsRead.mutate,
    isSending: sendMessage.isLoading,
  };
};