import apiClient from '@shared/utils/apiClient';

export const fetchNotifications = async (): Promise<{ items: any[]; total: number; unreadCount: number }> => {
  const response = await apiClient.get('/notifications');
  return response.data.data;
};

export const markAsRead = async (notificationId: string): Promise<string> => {
  await apiClient.post(`/notifications/${notificationId}/read`);
  return notificationId;
};

export const markAllAsRead = async (): Promise<void> => {
  await apiClient.post('/notifications/read-all');
};

export const deleteNotification = async (notificationId: string): Promise<string> => {
  await apiClient.delete(`/notifications/${notificationId}`);
  return notificationId;
};
