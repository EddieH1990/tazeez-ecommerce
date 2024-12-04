import { NotificationType } from '../types/notification';

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'order_status':
      return 'Package';
    case 'inventory_alert':
      return 'AlertTriangle';
    case 'payment_received':
      return 'CreditCard';
    case 'group_complete':
      return 'Users';
    case 'new_message':
      return 'MessageCircle';
    case 'system':
      return 'Bell';
    default:
      return 'Bell';
  }
};

export const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'order_status':
      return 'text-blue-600 bg-blue-50';
    case 'inventory_alert':
      return 'text-red-600 bg-red-50';
    case 'payment_received':
      return 'text-green-600 bg-green-50';
    case 'group_complete':
      return 'text-purple-600 bg-purple-50';
    case 'new_message':
      return 'text-yellow-600 bg-yellow-50';
    case 'system':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const formatNotificationTime = (date: string) => {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / 1000 / 60);

  if (diffInMinutes < 1) return 'الآن';
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
  
  return notificationDate.toLocaleDateString('ar-SA');
};

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};