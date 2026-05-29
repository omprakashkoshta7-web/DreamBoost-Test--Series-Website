import React from 'react';
import { Button, Card } from '@shared/components';
import { Bell, Megaphone, Info, AlertTriangle } from '@shared/icons';

interface NotificationsPanelProps {
  items: any[];
  unread: number;
  onViewAll: () => void;
}

const typeIcons: Record<string, React.ComponentType<any>> = {
  test_launch: Megaphone,
  result: Info,
  promotional: Megaphone,
  system: Info,
  reminder: AlertTriangle,
};

const typeColors: Record<string, string> = {
  test_launch: 'text-tb-blue bg-blue-50',
  result: 'text-tb-green bg-green-50',
  promotional: 'text-tb-orange bg-orange-50',
  system: 'text-purple-600 bg-purple-50',
  reminder: 'text-tb-orange bg-orange-50',
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ items, unread, onViewAll }) => {
  if (!items.length) return null;

  return (
    <Card header={
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4" /> Notifications
        {unread > 0 && <span className="px-1.5 py-0.5 bg-tb-red text-white text-xs font-bold rounded-full">{unread}</span>}
      </div>
    }>
      <div className="space-y-2 mt-3">
        {items.slice(0, 4).map((n: any) => {
          const Icon = typeIcons[n.type] || Bell;
          const colors = typeColors[n.type] || 'text-tb-gray-500 bg-tb-gray-50';
          return (
            <div key={n._id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-tb-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-tb-navy">{n.title}</p>
                <p className="text-xs text-tb-gray-500 line-clamp-1">{n.body || n.message}</p>
                <p className="text-xs text-tb-gray-400 mt-0.5">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="ghost" size="sm" fullWidth onClick={onViewAll}>View All Notifications -&gt;</Button>
    </Card>
  );
};

export default NotificationsPanel;
