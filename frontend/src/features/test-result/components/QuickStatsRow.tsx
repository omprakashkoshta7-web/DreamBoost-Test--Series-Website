import React from 'react';
import { Card } from '@shared/components';
import { Award, TrendingUp, Zap } from '@shared/icons';

interface QuickStatsRowProps {
  correctAnswers: number;
  percentile: number;
  formatTime: (s: number) => string;
  timeUsed: number;
}

const QuickStatsRow: React.FC<QuickStatsRowProps> = ({ correctAnswers, percentile, formatTime, timeUsed }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Card><div className="flex items-center gap-3"><Award className="w-5 h-5 text-tb-orange" /><div><p className="text-sm text-tb-gray-500">Points Earned</p><p className="text-lg font-bold text-tb-orange">+{correctAnswers * 10} pts</p></div></div></Card>
    <Card><div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-tb-green" /><div><p className="text-sm text-tb-gray-500">Percentile</p><p className="text-lg font-bold text-tb-green">{percentile}%</p></div></div></Card>
    <Card><div className="flex items-center gap-3"><Zap className="w-5 h-5 text-purple-600" /><div><p className="text-sm text-tb-gray-500">Time Spent</p><p className="text-lg font-bold text-purple-600">{formatTime(timeUsed)}</p></div></div></Card>
  </div>
);

export default QuickStatsRow;
