import React from 'react';
import { Tabs } from '@shared/components';

interface LibraryTabsProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} variant="pills" />;
};

export default LibraryTabs;
