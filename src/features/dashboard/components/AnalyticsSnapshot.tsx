import React from 'react';
import { Card, Button } from '@shared/components';
import { Clock, TrendingUp, Target } from '@shared/icons';

interface AnalyticsSnapshotProps {
  totalTimeSpent: number;
  attemptTrend: number;
  accuracyTrend: number;
  onViewDetailed: () => void;
}

const AnalyticsSnapshot: React.FC<AnalyticsSnapshotProps> = ({ totalTimeSpent, attemptTrend, accuracyTrend, onViewDetailed }) => {
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const items = [
    { label: 'Time Spent', value: formatTime(totalTimeSpent), icon: Clock, color: 'text-tb-blue', bg: 'bg-blue-50' },
    { label: 'Tests Attempted', value: attemptTrend, icon: TrendingUp, color: 'text-tb-green', bg: 'bg-green-50' },
    { label: 'Avg Accuracy', value: `${accuracyTrend}%`, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <Card title="Analytics Snapshot">
      <div className="grid grid-cols-3 gap-3 mt-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="text-center p-3 rounded-xl bg-tb-gray-50">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${item.bg} ${item.color} mb-1.5`}><Icon className="w-4 h-4" /></div>
              <p className="text-sm font-bold text-tb-navy">{item.value}</p>
              <p className="text-xs text-tb-gray-500">{item.label}</p>
            </div>
          );
        })}
      </div>
      <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={onViewDetailed}>View Detailed Analytics →</Button>
    </Card>
  );
};

export default AnalyticsSnapshot;
