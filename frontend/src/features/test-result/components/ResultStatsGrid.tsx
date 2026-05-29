import React from 'react';
import { CheckCircle, XCircle, Clock, Minus, Target } from '@shared/icons';

interface ResultStatsGridProps {
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  percentile: number;
  accuracy: number;
  result: any;
}

const ResultStatsGrid: React.FC<ResultStatsGridProps> = ({ correctCount, wrongCount, skippedCount, percentile, accuracy, result }) => {
  const negativeMarksDeducted = result?.negativeMarksDeducted ?? ((result?.wrongAnswers ?? wrongCount) * (result?.negativeMarks || 0));
  const rawScore = result?.scoreBeforeNegative ?? ((result?.score || 0) + negativeMarksDeducted);
  const totalMarks = result?.totalMarks || 0;
  const stats = [
    { label: 'Before Negative', value: `${rawScore}/${totalMarks}`, icon: Target, color: 'text-tb-blue', bg: 'bg-blue-50' },
    { label: 'Correct', value: result?.correctAnswers ?? correctCount, icon: CheckCircle, color: 'text-tb-green', bg: 'bg-green-50' },
    { label: 'Wrong', value: result?.wrongAnswers ?? wrongCount, icon: XCircle, color: 'text-tb-red', bg: 'bg-red-50' },
    { label: 'Skipped', value: result?.skippedAnswers ?? skippedCount, icon: Clock, color: 'text-tb-orange', bg: 'bg-orange-50' },
    { label: 'Negative Marks', value: negativeMarksDeducted > 0 ? `-${negativeMarksDeducted}` : '0', icon: Minus, color: 'text-tb-red', bg: 'bg-red-50' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 sm:p-6">
      {stats.map((s, i) => { const Icon = s.icon; return (
        <div key={i} className="text-center">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${s.bg} ${s.color} mb-2`}><Icon className="w-5 h-5" /></div>
          <p className="text-lg font-bold text-tb-navy">{s.value}</p>
          <p className="text-xs text-tb-gray-500">{s.label}</p>
        </div>
      ); })}
    </div>
  );
};

export default ResultStatsGrid;
