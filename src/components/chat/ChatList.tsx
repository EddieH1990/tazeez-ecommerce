import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { Chat } from '../../types/chat';
import LoadingSpinner from '../LoadingSpinner';

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedChatId }) => {
  const { chats, isLoadingChats } = useChat();

  if (isLoadingChats) {
    return <LoadingSpinner />;
  }

  if (!chats.length) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          لا توجد محادثات
        </h3>
        <p className="text-gray-500">
          ابدأ محادثة جديدة مع البائعين
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          selected={chat.id === selectedChatId}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </div>
  );
};

const ChatItem: React.FC<{
  chat: Chat;
  selected: boolean;
  onClick: () => void;
}> = ({ chat, selected, onClick }) => {
  const otherParticipant = chat.participants.find(p => p.role !== 'seller');

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      className={`w-full text-right p-4 rounded-lg transition-colors ${
        selected
          ? 'bg-emerald-50'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium">{otherParticipant?.name}</span>
        <span className="text-xs text-gray-500">
          {new Date(chat.updatedAt).toLocaleDateString('ar-SA')}
        </span>
      </div>
      
      {chat.lastMessage && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate">
            {chat.lastMessage.content}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </div>
      )}
    </motion.button>
  );
};

export default ChatList;