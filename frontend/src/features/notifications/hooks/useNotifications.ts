import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectNotifications, selectUnreadCount, selectNotificationLoading, selectNotificationError } from '../store/notification.selectors';
import { fetchNotifications, markAsRead } from '../store/notification.thunks';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unreadCount = useAppSelector(selectUnreadCount);
  const loading = useAppSelector(selectNotificationLoading);
  const error = useAppSelector(selectNotificationError);

  const fetchAll = useCallback(() => dispatch(fetchNotifications()), [dispatch]);
  const mark = useCallback((id: string) => dispatch(markAsRead(id)), [dispatch]);

  return { notifications, unreadCount, loading, error, fetchNotifications: fetchAll, markAsRead: mark, refresh: fetchAll };
};
