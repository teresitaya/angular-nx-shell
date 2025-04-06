export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  category: 'system' | 'security' | 'update' | 'alert';
  priority: 'low' | 'medium' | 'high';
  link?: {
    url: string;
    label: string;
  };
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface NotificationUpdate {
  id: string;
  read: boolean;
}
