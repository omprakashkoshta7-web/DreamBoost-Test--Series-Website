import React from 'react';
import { Tabs } from '@shared/components';

interface MaterialTabsProps {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: any) => void;
}

const MaterialTabs: React.FC<MaterialTabsProps> = ({ tabs, active, onChange }) => (
  <Tabs tabs={tabs} activeTab={active} onChange={onChange} variant="pills" />
);

export default MaterialTabs;
