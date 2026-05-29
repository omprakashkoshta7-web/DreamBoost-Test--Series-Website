import React from 'react';
import { BookOpen, FileText, Video, RefreshCw, Edit } from '@shared/icons';

interface CategoryChipsProps {
  chips: { key: string; label: string; icon: any }[];
  active: string;
  onChange: (key: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ chips, active, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {chips.map((chip) => {
      const Icon = chip.icon;
      return (
        <button key={chip.key} onClick={() => onChange(chip.key)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${active === chip.key ? 'bg-tb-blue text-white shadow-sm' : 'bg-white border border-tb-gray-200 text-tb-gray-600 hover:border-tb-blue hover:text-tb-blue'}`}>
          <Icon className="w-4 h-4" />{chip.label}
        </button>
      );
    })}
  </div>
);

export default CategoryChips;
