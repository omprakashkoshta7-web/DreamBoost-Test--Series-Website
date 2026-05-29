import React from 'react';
import { Card } from '@shared/components';
import { Flame, Target, TrendingUp } from '@shared/icons';

interface PreparationProgressProps {
  overallPercent: number;
  dailyGoal: number;
  weeklyGoal: number;
  streak: number;
  subjectProgress: { subject: string; score: number }[];
  testProgress: number;
}

const PreparationProgress: React.FC<PreparationProgressProps> = ({ overallPercent, dailyGoal, weeklyGoal, streak, subjectProgress, testProgress }) => {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-tb-navy">Preparation Progress</h3>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-tb-orange">
            <Flame className="w-4 h-4" />
            {streak} Day Streak
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-tb-gray-500">Overall Progress</span>
            <span className="font-bold text-tb-navy">{overallPercent}%</span>
          </div>
          <div className="h-3 bg-tb-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-tb-blue to-indigo-500 rounded-full transition-all" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-tb-blue mb-1">
              <Target className="w-4 h-4" /> {dailyGoal}
            </div>
            <p className="text-xs text-tb-gray-500">Today</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-purple-600 mb-1">
              <TrendingUp className="w-4 h-4" /> {weeklyGoal}
            </div>
            <p className="text-xs text-tb-gray-500">This Week</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <div className="text-sm font-bold text-tb-green mb-1">{testProgress}</div>
            <p className="text-xs text-tb-gray-500">Tests Done</p>
          </div>
        </div>

        {subjectProgress.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-tb-navy">Subject Progress</h4>
            {subjectProgress.slice(0, 5).map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-medium text-tb-gray-600 w-20 truncate">{s.subject}</span>
                <div className="flex-1 h-2 bg-tb-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.score >= 70 ? 'bg-tb-green' : s.score >= 40 ? 'bg-tb-orange' : 'bg-tb-red'}`}
                    style={{ width: `${s.score}%` }} />
                </div>
                <span className="text-xs font-bold text-tb-navy w-10 text-right">{s.score}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PreparationProgress;
