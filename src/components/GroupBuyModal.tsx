import React, { useState } from 'react';
import { X, Share2 } from 'lucide-react';

interface GroupBuyModalProps {
  product: {
    name: string;
    groupPrice: number;
    requiredParticipants: number;
    currentParticipants: number;
  };
  onClose: () => void;
}

const GroupBuyModal: React.FC<GroupBuyModalProps> = ({ product, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">انضم للمجموعة</h2>
        <p className="text-gray-600 mb-6">{product.name}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الجوال
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">سعر المجموعة:</span>
              <span className="font-bold text-emerald-600">{product.groupPrice} ر.س</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">المشاركون:</span>
              <span>{product.currentParticipants}/{product.requiredParticipants}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            تأكيد الانضمام
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>شارك مع الأصدقاء</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupBuyModal;