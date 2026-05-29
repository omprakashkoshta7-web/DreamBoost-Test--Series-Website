import React from 'react';
import { Button } from '@shared/components';
import { Play, ArrowRight } from '@shared/icons';

interface ContinueLearningProps {
  testId: string;
  testName: string;
  progress: number;
  remainingTime: number;
  category: string;
  onResume: () => void;
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({ testName, progress, remainingTime, onResume }) => {
  if (progress >= 100) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Continue Learning</p>
          <h3 className="text-base font-bold text-tb-navy">{testName}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-tb-gray-500">
            <span className="font-semibold text-tb-blue">{progress}% Complete</span>
            {remainingTime > 0 && <span>{formatTime(remainingTime)} left</span>}
          </div>
          <div className="mt-3 w-full max-w-xs">
            <div className="h-2.5 bg-white rounded-full overflow-hidden border border-blue-100">
              <div className="h-full bg-gradient-to-r from-tb-blue to-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={onResume}>
          <Play className="w-4 h-4" /> Resume <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ContinueLearning;
