import { api } from './client';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationPreferences {
  email: {
    sales: boolean;
    uploads: boolean;
    weekly: boolean;
    marketing: boolean;
  };
  inApp: {
    sales: boolean;
    uploads: boolean;
    likes: boolean;
    follows: boolean;
  };
}

export interface NotificationsResponse {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  unreadCount: number;
}

/**
 * Get notifications
 */
export async function getNotifications(
  page: number = 1,
  limit: number = 50,
  unreadOnly: boolean = false
): Promise<NotificationsResponse> {
  return api.get('/notifications', {
    query: { page, limit, unreadOnly },
  });
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  return api.patch(`/notifications/${notificationId}/read`);
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<void> {
  return api.post('/notifications/mark-all-read');
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string): Promise<void> {
  return api.delete(`/notifications/${notificationId}`);
}

/**
 * Get notification preferences
 */
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  return api.get('/notifications/preferences');
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferences> {
  return api.patch('/notifications/preferences', preferences);
}
