import React from 'react';
import { Card } from '@shared/components';
import { Bell } from '@shared/icons';

const NotificationEmptyState: React.FC = () => {
  return (
    <Card className="text-center py-16">
      <Bell className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-tb-navy">No notifications yet</h3>
      <p className="text-sm text-tb-gray-500 mt-1">We'll notify you when something arrives</p>
    </Card>
  );
};

export default NotificationEmptyState;
