import React from 'react';
import { Card } from '@shared/components';
import { CheckCircle, XCircle, Clock } from '@shared/icons';

interface RecentActivityProps {
  activities: { testName: string; score: number; totalMarks: number; accuracy: number; correctAnswers: number; wrongAnswers: number; completedAt: string }[];
  onViewResult: (index: number) => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities, onViewResult }) => {
  if (!activities.length) return null;

  return (
    <Card title="Recent Activity">
      <div className="space-y-2 mt-3">
        {activities.slice(0, 5).map((a, i) => (
          <button key={i} onClick={() => onViewResult(i)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-tb-gray-50 transition-colors border border-transparent hover:border-tb-gray-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="flex items-center gap-1 text-tb-green"><CheckCircle className="w-3.5 h-3.5" />{a.correctAnswers}</span>
                <span className="flex items-center gap-1 text-tb-red"><XCircle className="w-3.5 h-3.5" />{a.wrongAnswers}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-tb-navy truncate">{a.testName}</p>
                <p className="text-xs text-tb-gray-500">{a.accuracy}% accuracy</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-sm font-bold text-tb-navy">{a.score}/{a.totalMarks}</p>
              <p className="text-xs text-tb-gray-500">{new Date(a.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
