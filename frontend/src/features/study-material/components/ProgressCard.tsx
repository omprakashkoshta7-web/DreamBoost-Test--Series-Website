import React from 'react';
import { StatCard } from '@shared/components';
import { Clock, CheckCircle, BookOpen, Target } from '@shared/icons';

interface ProgressCardProps {
  progress: any;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  if (!progress) return null;

  return (
    <div className="bg-white border border-tb-gray-100 rounded-2xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-tb-blue"><Clock className="w-5 h-5" /></div>}
          label="Study Hours"
          value={`${progress.totalStudyHours}h`}
        />
        <StatCard
          icon={<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><CheckCircle className="w-5 h-5" /></div>}
          label="Completion"
          value={`${progress.completionPercent}%`}
        />
        <StatCard
          icon={<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><BookOpen className="w-5 h-5" /></div>}
          label="Completed"
          value={`${progress.completedCount}/${progress.totalMaterials}`}
        />
        <StatCard
          icon={<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-tb-orange"><Target className="w-5 h-5" /></div>}
          label="Chapters"
          value={`${progress.totalChapters}`}
        />
      </div>
      {progress.weakSubjects?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-tb-gray-100">
          <p className="text-tb-gray-500 text-xs uppercase tracking-wider mb-2">Need Improvement</p>
          <div className="flex gap-2 flex-wrap">
            {progress.weakSubjects.map((s: any) => (
              <span key={s.id} className="px-3 py-1 bg-tb-gray-100 rounded-full text-xs font-medium text-tb-navy">{s.name} ({s.progress}%)</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
