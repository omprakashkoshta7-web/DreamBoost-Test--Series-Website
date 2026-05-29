import React from 'react';
import { Card, Badge } from '@shared/components';
import { Target } from '@shared/icons';

interface RecentTestsProps {
  recentTests: any[];
}

const RecentTests: React.FC<RecentTestsProps> = ({ recentTests }) => {
  if (!recentTests || recentTests.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <Target className="w-5 h-5 text-tb-green" />
          Recent Tests
        </h2>
      </div>
      <div className="space-y-3">
        {recentTests.slice(0, 5).map((test, i) => (
          <Card key={i} className="p-4 hover:shadow-tb transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  test.status === 'success' ? 'bg-green-100' : test.status === 'warning' ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  <Target className={`w-6 h-6 ${
                    test.status === 'success' ? 'text-tb-green' : test.status === 'warning' ? 'text-tb-orange' : 'text-tb-red'
                  }`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-tb-navy">{test.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-tb-gray-500">Score: <span className="font-semibold text-tb-navy">{test.score}/{test.total}</span></span>
                    <span className="text-xs text-tb-gray-500">•</span>
                    <span className="text-xs text-tb-gray-500">Accuracy: <span className="font-semibold text-tb-navy">{test.accuracy}%</span></span>
                  </div>
                </div>
              </div>
              <Badge variant={test.status as any}>{test.score >= 70 ? 'Passed' : test.score >= 50 ? 'Average' : 'Needs Work'}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentTests;
