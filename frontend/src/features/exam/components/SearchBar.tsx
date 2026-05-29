import React from 'react';
import { SearchBar as SharedSearchBar } from '@shared/components';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <SharedSearchBar value={value} onChange={onChange} placeholder="Search categories..." />
);

export default SearchBar;
