import React, { useEffect } from 'react';
import { Card, Badge, Button, Loader } from '@shared/components';
import { useAppDispatch } from '@store/hooks';
import { markAllAsRead, deleteNotification } from '../store/notification.thunks';
import { useNotifications } from '../hooks';
import {
  Bell,
  Check,
  Trash2,
  BookOpen,
  Trophy,
  Award,
  Settings,
  CreditCard,
  Clock,
  CheckCircle,
} from '@shared/icons';
import NotificationHeader from '@features/notifications/components/NotificationHeader';
import NotificationCard from '@features/notifications/components/NotificationCard';
import NotificationEmptyState from '@features/notifications/components/NotificationEmptyState';

const NotificationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, loading, fetchNotifications, markAsRead } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkRead = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNotification(id));
  };

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" label="Loading notifications..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <NotificationHeader unreadCount={unreadCount} onMarkAllRead={() => dispatch(markAllAsRead())} />

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard key={notification._id} notification={notification} onMarkRead={handleMarkRead} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <NotificationEmptyState />
      )}
    </div>
  );
};

export default NotificationPage;
