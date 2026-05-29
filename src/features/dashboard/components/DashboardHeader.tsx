import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { Bell, ChevronRight, Crown } from '@shared/icons';

interface DashboardHeaderProps {
  name: string;
  avatar?: string;
  targetExam: string;
  planName: string;
  planStatus: 'premium' | 'free';
  notificationCount: number;
  onExamChange: () => void;
  onSettings: () => void;
  onProfile: () => void;
  onNotifications: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, avatar, targetExam, planName, planStatus, notificationCount, onExamChange, onSettings, onProfile, onNotifications }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-white/5 rounded-full translate-y-1/2" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img src={avatar} alt={name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-lg font-bold shadow-lg">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Hi {name.split(' ')[0]} 👋</h1>
              <p className="text-sm text-blue-200/80 mt-0.5">
                {targetExam || 'Set your target exam'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${planStatus === 'premium' ? 'bg-amber-400/20 text-amber-300' : 'bg-white/10 text-blue-200'}`}>
                  <Crown className="w-3 h-3" />
                  {planName === 'Free' ? 'Free Plan' : `${planName} Active`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onNotifications} className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
          <button onClick={onExamChange} className="flex items-center gap-1.5 text-xs text-blue-200/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">
            {targetExam ? `Target: ${targetExam}` : 'Set Target Exam'} <ChevronRight className="w-3 h-3" />
          </button>
          <Button variant="ghost" size="sm" onClick={onProfile}>Profile</Button>
          <Button variant="ghost" size="sm" onClick={onSettings}>Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
