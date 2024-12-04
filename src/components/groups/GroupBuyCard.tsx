import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, AlertTriangle } from 'lucide-react';
import { GroupBuy } from '../../types/group';

interface GroupBuyCardProps {
  group: GroupBuy;
  onJoin?: () => void;
  onManage?: () => void;
  showManageButton?: boolean;
}

const GroupBuyCard: React.FC<GroupBuyCardProps> = ({ 
  group, 
  onJoin, 
  onManage,
  showManageButton = false,
}) => {
  const progress = (group.currentParticipants / group.minParticipants) * 100;
  const isExpiringSoon = new Date(group.endDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;
  const remainingSpots = group.maxParticipants - group.currentParticipants;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">{group.title}</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${
            group.status === 'active' ? 'bg-green-100 text-green-600' :
            group.status === 'completed' ? 'bg-blue-100 text-blue-600' :
            group.status === 'expired' ? 'bg-red-100 text-red-600' :
            'bg-yellow-100 text-yellow-600'
          }`}>
            {group.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-6">{group.description}</p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">السعر الأصلي</span>
            <span className="text-lg text-gray-400 line-through">
              {group.originalPrice} ر.س
            </span>
          </div>
          
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-emerald-600">سعر المجموعة</span>
            <span className="text-2xl font-bold text-emerald-600">
              {group.groupPrice} ر.س
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{group.currentParticipants}/{group.minParticipants} مشارك</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>متبقي {new Date(group.endDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {isExpiringSoon && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span>ينتهي العرض قريباً! متبقي {remainingSpots} مقعد</span>
            </div>
          )}
        </div>

        {showManageButton ? (
          <button
            onClick={onManage}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            إدارة المجموعة
          </button>
        ) : (
          <button
            onClick={onJoin}
            disabled={group.status !== 'active'}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300"
          >
            {group.status === 'active' ? 'انضم للمجموعة' : 'المجموعة مغلقة'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GroupBuyCard;