import { Notification } from '../interfaces/mock-notification.interface';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'System Update Available',
    message: 'A new system update is available. Please review and install at your earliest convenience.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    actionRequired: true,
    category: 'system',
    priority: 'medium',
    link: {
      url: '/settings/updates',
      label: 'View Update'
    }
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Unusual login activity detected from IP 192.168.1.100',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    read: false,
    actionRequired: true,
    category: 'security',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Agent Status Change',
    message: 'Production server is now offline',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    read: false,
    category: 'alert',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Policy Update Success',
    message: 'New security policy has been successfully applied to all agents',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    read: true,
    category: 'update',
    priority: 'low'
  }
];
