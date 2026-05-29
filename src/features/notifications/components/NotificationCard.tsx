import React from 'react';
import { Card, Badge } from '@shared/components';
import { BookOpen, Trophy, Award, Settings, CreditCard, Clock, Check, Trash2, Flame } from '@shared/icons';

const getIcon = (type: string) => {
  switch (type) {
    case 'test':
    case 'test_launch':
      return <BookOpen className="w-5 h-5 text-tb-blue" />;
    case 'reminder': return <Flame className="w-5 h-5 text-tb-orange" />;
    case 'result': return <Trophy className="w-5 h-5 text-tb-green" />;
    case 'achievement': return <Award className="w-5 h-5 text-tb-orange" />;
    case 'payment': return <CreditCard className="w-5 h-5 text-purple-600" />;
    default: return <Settings className="w-5 h-5 text-tb-gray-400" />;
  }
};

const getBgColor = (type: string) => {
  switch (type) {
    case 'test':
    case 'test_launch':
      return 'bg-blue-50';
    case 'reminder': return 'bg-orange-50';
    case 'result': return 'bg-green-50';
    case 'achievement': return 'bg-orange-50';
    case 'payment': return 'bg-purple-50';
    default: return 'bg-tb-gray-50';
  }
};

const formatTime = (date: string) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

interface Notification {
  _id: string;
  type: string;
  title: string;
  message?: string;
  body?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkRead, onDelete }) => {
  return (
    <Card
      className={`p-4 transition-all ${
        !notification.isRead ? 'border-l-4 border-l-tb-blue bg-blue-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-tb-navy">{notification.title}</h3>
              <p className="text-sm text-tb-gray-600 mt-0.5">{notification.message || notification.body}</p>
            </div>
            {!notification.isRead && (
              <div className="w-2.5 h-2.5 bg-tb-blue rounded-full flex-shrink-0 mt-1.5" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-tb-gray-400">
              <Clock className="w-3 h-3" />
              {formatTime(notification.createdAt)}
            </span>
            <Badge variant={notification.type === 'result' ? 'success' : notification.type === 'achievement' || notification.type === 'reminder' ? 'warning' : 'primary'}>
              {notification.type}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification._id)}
              className="p-1.5 rounded-lg hover:bg-tb-gray-100 text-tb-gray-400 hover:text-tb-green transition-colors"
              title="Mark as read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(notification._id)}
            className="p-1.5 rounded-lg hover:bg-tb-gray-100 text-tb-gray-400 hover:text-tb-red transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
