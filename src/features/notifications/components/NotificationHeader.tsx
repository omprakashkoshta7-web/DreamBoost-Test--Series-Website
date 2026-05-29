import React from 'react';
import { PageHeader, Button } from '@shared/components';
import { CheckCircle } from '@shared/icons';

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ unreadCount, onMarkAllRead }) => (
  <PageHeader
    title="Notifications"
    subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
    action={unreadCount > 0 ? (
      <Button variant="secondary" size="sm" onClick={onMarkAllRead}>
        <CheckCircle className="w-4 h-4" /> Mark All Read
      </Button>
    ) : undefined}
  />
);

export default NotificationHeader;
