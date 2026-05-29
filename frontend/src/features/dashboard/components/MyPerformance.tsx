import React from 'react';
import { Card } from '@shared/components';
import { Trophy, Target, Circle, Activity, TrendingUp } from '@shared/icons';

interface MyPerformanceProps {
  totalTests: number;
  avgScore: number;
  accuracy: number;
  speed: number;
  rank: number;
}

const MyPerformance: React.FC<MyPerformanceProps> = ({ totalTests, avgScore, accuracy, speed, rank }) => {
  const items = [
    { label: 'Total Tests', value: totalTests, icon: Trophy, color: 'text-tb-blue', bg: 'bg-blue-50' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: Target, color: 'text-tb-green', bg: 'bg-green-50' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: Circle, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Speed', value: `${speed}/m`, icon: Activity, color: 'text-tb-orange', bg: 'bg-orange-50' },
    { label: 'Rank', value: `#${rank}`, icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <Card title="My Performance">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 mt-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="text-center p-3 rounded-xl bg-tb-gray-50 min-w-0">
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${item.bg} ${item.color} mb-1.5`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-tb-navy">{item.value}</p>
              <p className="text-xs text-tb-gray-500 truncate">{item.label}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MyPerformance;
