import React from 'react';
import { Search, X } from '@shared/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...', className = '' }) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-10 py-3 bg-white border border-tb-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue/20 focus:border-tb-blue"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-tb-gray-400 hover:text-tb-gray-600 hover:bg-tb-gray-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default SearchBar;
