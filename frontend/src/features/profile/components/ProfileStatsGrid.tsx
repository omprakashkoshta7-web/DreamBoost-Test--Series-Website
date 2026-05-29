import React from 'react';
import { StatCard } from '@shared/components';
import { BookOpen, TrendingUp, Flame, Trophy } from '@shared/icons';

interface Stats {
  testsCompleted?: number;
  totalPoints?: number;
  streak?: number;
  achievements?: number;
}

interface ProfileStatsGridProps {
  stats: Stats | null;
}

const ProfileStatsGrid: React.FC<ProfileStatsGridProps> = ({ stats }) => {
  const items = [
    { label: 'Tests Done', value: stats?.testsCompleted || 0, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-tb-blue"><BookOpen className="w-5 h-5" /></div> },
    { label: 'Avg Score', value: stats ? `${stats.totalPoints} pts` : '0 pts', icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><TrendingUp className="w-5 h-5" /></div> },
    { label: 'Streak', value: stats?.streak ? `${stats.streak} days` : '0 days', icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-tb-orange"><Flame className="w-5 h-5" /></div> },
    { label: 'Achievements', value: stats?.achievements || 0, icon: <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><Trophy className="w-5 h-5" /></div> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s, i) => (
        <StatCard key={i} icon={s.icon} label={s.label} value={s.value} />
      ))}
    </div>
  );
};

export default ProfileStatsGrid;
