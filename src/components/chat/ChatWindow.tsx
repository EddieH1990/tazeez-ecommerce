import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, ArrowRight } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { Message } from '../../types/chat';
import { useAuthStore } from '../../store/useAuthStore';
import LoadingSpinner from '../LoadingSpinner';

interface ChatWindowProps {
  chatId: string;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, onBack }) => {
  const { messages, sendMessage, markAsRead, isLoadingMessages, isSending } = useChat(chatId);
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Mark unread messages as read
    messages
      .filter(m => !m.read && m.senderId !== user?.uid)
      .forEach(m => markAsRead(m.id));
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    sendMessage({
      chatId,
      type: 'text',
      content: newMessage.trim(),
    });
    
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoadingMessages) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 md:hidden"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h2 className="font-bold">المحادثة</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === user?.uid}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex items-end gap-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Image className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{
  message: Message;
  isOwn: boolean;
}> = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwn
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1">
            {message.senderName}
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${
          isOwn ? 'text-emerald-100' : 'text-gray-500'
        }`}>
          {new Date(message.createdAt).toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;