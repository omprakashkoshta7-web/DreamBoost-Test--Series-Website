import React from 'react';
import { SearchBar } from '@shared/components';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  resultCount: number;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ searchQuery, onSearchChange, categories, selectedCategory, onCategoryChange, resultCount }) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search test series..." />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-tb-navy text-white shadow-md shadow-tb-navy/15'
                : 'bg-white text-tb-gray-600 border border-tb-gray-200 hover:border-tb-gray-300 hover:text-tb-navy'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="ml-auto text-xs text-tb-gray-400 whitespace-nowrap">
        {resultCount} test{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  </div>
);

export default SearchFilterBar;
