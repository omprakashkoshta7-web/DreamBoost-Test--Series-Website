import React from 'react';
import { Tabs } from '@shared/components';

interface ResultTabsProps {
  tab: 'review' | 'topic';
  onTabChange: (tab: 'review' | 'topic') => void;
}

const tabs = [
  { key: 'review', label: 'Question Review' },
  { key: 'topic', label: 'Topic Analysis' },
];

const ResultTabs: React.FC<ResultTabsProps> = ({ tab, onTabChange }) => (
  <Tabs tabs={tabs} activeTab={tab} onChange={(k) => onTabChange(k as 'review' | 'topic')} variant="underline" />
);

export default ResultTabs;
