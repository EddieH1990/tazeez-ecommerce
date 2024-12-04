export type NotificationType = 
  | 'order_status'
  | 'inventory_alert'
  | 'payment_received'
  | 'group_complete'
  | 'new_message'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    order_status: boolean;
    inventory_alert: boolean;
    payment_received: boolean;
    group_complete: boolean;
    new_message: boolean;
    system: boolean;
  };
}