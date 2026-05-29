import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@shared/components';
import { BookOpen, CheckCircle, TrendingUp, Trophy, Flame, Star } from '@shared/icons';

interface DashboardWelcomeBannerProps {
  userName?: string;
  streak?: number;
  totalPoints?: number;
  totalTests?: number;
  completedTests?: number;
  avgScore?: number;
  rank?: string;
}

const DashboardWelcomeBanner: React.FC<DashboardWelcomeBannerProps> = ({
  userName, streak, totalPoints, totalTests, completedTests, avgScore, rank,
}) => {
  const stats = [
    { label: 'Tests Available', value: totalTests?.toString() || '0', icon: <BookOpen className="w-5 h-5 text-blue-300" /> },
    { label: 'Tests Taken', value: completedTests?.toString() || '0', icon: <CheckCircle className="w-5 h-5 text-green-300" /> },
    { label: 'Avg Score', value: `${avgScore || 0}%`, icon: <TrendingUp className="w-5 h-5 text-orange-300" /> },
    { label: 'All India Rank', value: rank || '#--', icon: <Trophy className="w-5 h-5 text-purple-300" /> },
  ];

  return (
    <div className="relative bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full" />
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {userName || 'Student'}!</h1>
              <p className="text-blue-200/70 mt-1 text-sm">Continue your preparation. You're doing great!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-bold">{streak || 0} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold">{totalPoints || 0} pts</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              className="bg-white/10 backdrop-blur-sm border-white/10"
              labelClassName="text-blue-200/60"
              valueClassName="text-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcomeBanner;
