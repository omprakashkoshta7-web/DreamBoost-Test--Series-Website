import React from 'react';
import { Search, FileText, Award, Users } from '@shared/icons';

type NavigateHandler = (path: string) => void;

const actions = [
  { label: 'Explore Exams', icon: Search, path: '/app/exam-categories', color: 'from-blue-500 to-blue-600' },
  { label: 'My Tests', icon: FileText, path: '/app/test-series', color: 'from-purple-500 to-purple-600' },
  { label: 'My Purchases', icon: Award, path: '/app/payment', color: 'from-orange-500 to-amber-500' },
  { label: 'Profile', icon: Users, path: '/app/profile', color: 'from-emerald-500 to-emerald-600' },
];

export const QuickActionButtons = ({ onNavigate }: { onNavigate: NavigateHandler }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {actions.map((item, i) => {
      const Icon = item.icon;
      return (
        <button
          key={i}
          onClick={() => onNavigate(item.path)}
          className="group relative overflow-hidden bg-gradient-to-br rounded-xl p-5 text-white shadow-tb hover:shadow-tb-md transition-all duration-300 hover:-translate-y-1"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--tw-gradient-stops))' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold">{item.label}</span>
          </div>
        </button>
      );
    })}
  </div>
);

export default QuickActionButtons;
