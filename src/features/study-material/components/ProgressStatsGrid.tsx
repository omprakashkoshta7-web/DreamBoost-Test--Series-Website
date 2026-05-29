import React from 'react';
import { StatCard } from '@shared/components';
import { Clock, CheckCircle, BookOpen, Target } from '@shared/icons';

interface ProgressStatsGridProps {
  totalStudyHours: number;
  completionPercent: number;
  completedCount: number;
  totalMaterials: number;
  totalChapters: number;
}

const ProgressStatsGrid: React.FC<ProgressStatsGridProps> = ({
  totalStudyHours, completionPercent, completedCount, totalMaterials, totalChapters,
}) => {
  const items = [
    { label: 'Total Study Hours', value: `${totalStudyHours}h`, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-tb-blue"><Clock className="w-5 h-5" /></div> },
    { label: 'Completion Rate', value: `${completionPercent}%`, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><CheckCircle className="w-5 h-5" /></div> },
    { label: 'Materials Completed', value: `${completedCount}/${totalMaterials}`, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><BookOpen className="w-5 h-5" /></div> },
    { label: 'Chapters Available', value: `${totalChapters}`, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-tb-orange"><Target className="w-5 h-5" /></div> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s, i) => (
        <StatCard key={i} icon={s.icon} label={s.label} value={s.value} />
      ))}
    </div>
  );
};

export default ProgressStatsGrid;
