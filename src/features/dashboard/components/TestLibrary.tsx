import React, { useState } from 'react';
import { Card, Tabs, Badge, EmptyState } from '@shared/components';
import { BookOpen, Clock } from '@shared/icons';
import { useNavigate } from 'react-router-dom';

interface TestLibraryProps {
  mockTests: any[];
  topicTests: any[];
  pyq: any[];
  miniTests: any[];
}

const tabs = [
  { key: 'mock', label: 'Mock Tests' },
  { key: 'topic', label: 'Topic Tests' },
  { key: 'pyq', label: 'PYQ' },
  { key: 'mini', label: 'Mini Tests' },
];

const difficultyFilter = ['All', 'Easy', 'Medium', 'Hard'];

const TestLibrary: React.FC<TestLibraryProps> = ({ mockTests, topicTests, pyq, miniTests }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mock');
  const [difficulty, setDifficulty] = useState('All');

  const dataMap: Record<string, any[]> = { mock: mockTests, topic: topicTests, pyq, mini: miniTests };
  const items = dataMap[activeTab] || [];
  const filtered = difficulty === 'All' ? items : items.filter((t: any) => t.difficulty === difficulty.toLowerCase());

  return (
    <Card title="Test Library">
      <div className="mt-3 space-y-3">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {difficultyFilter.map((d) => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${difficulty === d ? 'bg-tb-navy text-white' : 'bg-tb-gray-50 text-tb-gray-500 border border-tb-gray-200 hover:bg-tb-gray-100'}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {filtered.slice(0, 4).map((t: any) => (
            <div key={t._id} onClick={() => navigate(`/app/test-instructions/${t._id}`)}
              className="p-3 bg-tb-gray-50 rounded-xl border border-tb-gray-200 hover:border-tb-blue hover:shadow-sm transition-all cursor-pointer group">
              <p className="text-xs font-semibold text-tb-navy group-hover:text-tb-blue transition-colors line-clamp-2">{t.name}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-tb-gray-400">
                <Badge variant={t.difficulty === 'easy' ? 'success' : t.difficulty === 'medium' ? 'warning' : 'danger'}>
                  {t.difficulty}
                </Badge>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}m</span>
              </div>
              {t.isPremium && <Badge variant="primary">Premium</Badge>}
            </div>
          ))}
        </div>
        {filtered.length === 0 && <EmptyState title="No tests found" />}
      </div>
    </Card>
  );
};

export default TestLibrary;
