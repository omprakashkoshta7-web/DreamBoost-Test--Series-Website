import React from 'react';
import { Card, Button, Toggle } from '@shared/components';
import { Check } from '@shared/icons';

interface NotificationSettingsProps {
  settings: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
  saving: boolean;
  onSave: () => void;
}

const labels: Record<string, { title: string; desc: string }> = {
  emailNotifications: { title: 'Email Notifications', desc: 'Receive updates via email' },
  testReminders: { title: 'Test Reminders', desc: 'Get notified before tests' },
  leaderboardUpdates: { title: 'Leaderboard Updates', desc: 'Rank change notifications' },
  promotionalEmails: { title: 'Promotional Emails', desc: 'Offers and discounts' },
  resultNotifications: { title: 'Result Notifications', desc: 'Get notified when results are ready' },
  achievementAlerts: { title: 'Achievement Alerts', desc: 'Celebrate your milestones' },
  systemUpdates: { title: 'System Updates', desc: 'Platform maintenance and features' },
};

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onChange, saving, onSave }) => (
  <Card title="Notification Preferences">
    <div className="space-y-3 mt-4">
      {Object.entries(settings).map(([key, value]) => {
        const label = labels[key] || { title: key, desc: '' };
        return (
          <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-tb-gray-200">
            <div><h4 className="font-medium text-sm text-tb-navy">{label.title}</h4><p className="text-xs text-tb-gray-500">{label.desc}</p></div>
            <Toggle checked={value} onChange={() => onChange(key, !value)} />
          </div>
        );
      })}
      <Button variant="primary" onClick={onSave} isLoading={saving}><Check className="w-4 h-4" /> Save Preferences</Button>
    </div>
  </Card>
);

export default NotificationSettings;
