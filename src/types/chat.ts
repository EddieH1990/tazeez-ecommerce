export type MessageType = 'text' | 'image' | 'system';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  type: MessageType;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    role: 'seller' | 'customer';
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageData {
  chatId: string;
  type: MessageType;
  content: string;
}