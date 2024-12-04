import React from 'react';
import { motion } from 'framer-motion';
import * as icons from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { getNotificationIcon, getNotificationColor, formatNotificationTime } from '../../utils/notifications';

interface NotificationListProps {
  onClose: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // Handle navigation or action based on notification type
  };

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-500">لا توجد إشعارات</div>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="p-4 border-b sticky top-0 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">الإشعارات</h3>
          <button
            onClick={markAllAsRead}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            تحديد الكل كمقروء
          </button>
        </div>
      </div>

      <div className="divide-y">
        {notifications.map((notification) => {
          const IconComponent = icons[getNotificationIcon(notification.type) as keyof typeof icons];
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-emerald-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{notification.title}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <icons.X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    {formatNotificationTime(notification.createdAt)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;