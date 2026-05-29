import React from 'react';
import { BookOpen, Trophy, Users } from '@shared/icons';
import sidebarBadge from '../../../public/ChatGPT Image May 24, 2026, 11_00_50 AM.png';

interface AuthModalSidebarProps {
  step: string;
}

const sidebarItems = [
  { icon: BookOpen, text: '50,000+ Tests' },
  { icon: Trophy, text: 'All India Ranking' },
  { icon: Users, text: '1 Crore+ Students' },
];

const titles: Record<string, string> = {
  login: 'Welcome back!',
  register: 'Join 1Cr+ students',
  'forgot-password': 'Reset Password',
  'forgot-code': 'Reset Password',
  'forgot-reset': 'Reset Password',
};

const subtitles: Record<string, string> = {
  login: 'Continue your preparation and track your progress.',
  register: 'Start your journey to crack your dream exam with India\'s #1 platform.',
  'forgot-password': 'We\'ll help you get back into your account.',
  'forgot-code': 'We\'ll help you get back into your account.',
  'forgot-reset': 'We\'ll help you get back into your account.',
};

const AuthModalSidebar: React.FC<AuthModalSidebarProps> = ({ step }) => (
  <div className="hidden md:flex md:w-[38%] bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 p-7 flex-col justify-between relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-10 top-8 h-24 w-24 overflow-hidden rounded-full border border-white/15 bg-white/10 p-1 shadow-lg shadow-black/10">
        <img src={sidebarBadge} alt="" className="h-full w-full rounded-full object-cover" />
      </div>
      <div className="absolute bottom-16 right-8 w-12 h-12 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 left-4 w-6 h-6 bg-white/10 rounded-full" />
    </div>
    <div className="relative z-10">
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-white leading-tight mb-3">{titles[step] || 'Welcome back!'}</h3>
        <p className="text-sm text-blue-200/75 leading-6">{subtitles[step] || 'Continue your preparation and track your progress.'}</p>
      </div>
    </div>
    <div className="relative z-10 space-y-3 mt-8">
      {sidebarItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="flex items-center gap-3 text-white/80">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-blue-300" />
            </div>
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        );
      })}
    </div>
    <div className="relative z-10 mt-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-xs text-white/80 font-medium">India's #1 Exam Prep</span>
      </div>
    </div>
  </div>
);

export default AuthModalSidebar;
