import React from 'react';
import { Search, FileText, BookOpen, RefreshCw } from '@shared/icons';

interface QuickActionsProps {
  onStartMock: () => void;
  onPractice: () => void;
  onPYQ: () => void;
  onRevision: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onStartMock, onPractice, onPYQ, onRevision }) => {
  const items = [
    { label: 'Start Mock Test', icon: Search, color: 'from-blue-500 to-blue-600', desc: 'Full-length mocks', onClick: onStartMock },
    { label: 'Practice Questions', icon: FileText, color: 'from-purple-500 to-purple-600', desc: 'Topic-wise practice', onClick: onPractice },
    { label: 'Previous Year Papers', icon: BookOpen, color: 'from-orange-500 to-amber-500', desc: 'Past exam papers', onClick: onPYQ },
    { label: 'Revision Mode', icon: RefreshCw, color: 'from-green-500 to-emerald-500', desc: 'Quick revision', onClick: onRevision },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <button key={i} onClick={item.onClick}
            className="group relative overflow-hidden rounded-xl p-4 text-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><Icon className="w-5 h-5" /></div>
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-xs text-white/70">{item.desc}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
