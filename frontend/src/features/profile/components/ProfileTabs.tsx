import React from 'react';
import { Tabs } from '@shared/components';

interface Tab {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const tabItems = tabs.map(t => ({
    key: t.key,
    label: t.label,
    icon: <t.icon className="w-4 h-4" />,
  }));
  return <Tabs tabs={tabItems} activeTab={activeTab} onChange={onTabChange} variant="pills" />;
};

export default ProfileTabs;
