import React from 'react';
import { Star, Zap, Award, Trophy } from '@shared/icons';

interface TimeFilterBarProps {
  selected: string;
  onChange: (key: string) => void;
}

const filters = [
  { key: 'daily', label: 'Today', icon: Zap },
  { key: 'weekly', label: 'This Week', icon: Star },
  { key: 'monthly', label: 'This Month', icon: Award },
  { key: 'alltime', label: 'All Time', icon: Trophy },
];

const TimeFilterBar: React.FC<TimeFilterBarProps> = ({ selected, onChange }) => (
  <div className="bg-white rounded-xl border border-tb-gray-200 p-2">
    <div className="flex gap-2 overflow-x-auto">
      {filters.map((f) => {
        const Icon = f.icon;
        return (
          <button key={f.key} onClick={() => onChange(f.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selected === f.key ? 'bg-tb-blue text-white shadow-lg shadow-blue-500/25' : 'text-tb-gray-600 hover:bg-tb-gray-50'}`}>
            <Icon className="w-4 h-4" />{f.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default TimeFilterBar;
