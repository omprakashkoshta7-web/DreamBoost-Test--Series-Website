import React from 'react';
import { Card, Badge } from '@shared/components';
import { Clock, Play } from '@shared/icons';

interface UpcomingTestsProps {
  scheduled: any[];
  live: any[];
  onStartTest: (id: string) => void;
}

const UpcomingTests: React.FC<UpcomingTestsProps> = ({ scheduled, live, onStartTest }) => {
  if (!scheduled.length && !live.length) return null;

  return (
    <Card title="Upcoming Tests">
      <div className="space-y-3 mt-3">
        {live.map((t: any) => (
          <div key={t._id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700">LIVE NOW</span>
              </div>
              <p className="text-sm font-semibold text-tb-navy mt-1">{t.name}</p>
              <p className="text-xs text-tb-gray-500">{t.duration} min</p>
            </div>
            <button onClick={() => onStartTest(t._id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-tb-green text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
              <Play className="w-3.5 h-3.5" /> Start
            </button>
          </div>
        ))}
        {scheduled.slice(0, 3).map((t: any) => (
          <div key={t._id} className="flex items-center justify-between p-3 bg-tb-gray-50 rounded-xl border border-tb-gray-200">
            <div>
              <Badge variant="primary">{t.category || 'General'}</Badge>
              <p className="text-sm font-semibold text-tb-navy mt-1">{t.name}</p>
              <p className="text-xs text-tb-gray-500 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> {t.scheduledAt ? new Date(t.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'TBD'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTests;
