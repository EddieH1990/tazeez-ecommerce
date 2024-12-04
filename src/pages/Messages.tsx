import React, { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[80vh]">
            {/* Chat List */}
            <div className={`border-l ${
              selectedChatId ? 'hidden md:block' : ''
            }`}>
              <div className="p-4 border-b">
                <h1 className="text-xl font-bold">المحادثات</h1>
              </div>
              <div className="h-[calc(80vh-73px)] overflow-y-auto">
                <ChatList
                  onSelectChat={(chatId) => setSelectedChatId(chatId)}
                  selectedChatId={selectedChatId || undefined}
                />
              </div>
            </div>

            {/* Chat Window */}
            <div className={`md:col-span-2 ${
              !selectedChatId ? 'hidden md:block' : ''
            }`}>
              {selectedChatId ? (
                <ChatWindow
                  chatId={selectedChatId}
                  onBack={() => setSelectedChatId(null)}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  اختر محادثة للبدء
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;