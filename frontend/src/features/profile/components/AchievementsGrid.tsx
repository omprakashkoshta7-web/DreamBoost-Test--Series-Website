import React from 'react';
import { Card, Badge } from '@shared/components';
import { Award, Lock } from '@shared/icons';

interface Achievement {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

interface AchievementsGridProps {
  achievements: Achievement[];
}

const AchievementsGrid: React.FC<AchievementsGridProps> = ({ achievements }) => {
  return (
    <Card title="Achievements">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {achievements.map((a) => { const Icon = Award; return (
          <div key={a.id} className={`p-4 rounded-xl text-center ${a.unlocked ? 'bg-blue-50 border border-blue-200' : 'bg-tb-gray-50 opacity-60'}`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${a.unlocked ? 'bg-gradient-to-br from-tb-blue to-indigo-500 text-white' : 'bg-tb-gray-200 text-tb-gray-400'}`}><Icon className="w-6 h-6" /></div>
            <h4 className="font-semibold text-sm text-tb-navy">{a.title}</h4>
            <p className="text-xs text-tb-gray-500 mt-1">{a.desc}</p>
            {!a.unlocked && <Badge variant="warning" className="mt-2"><Lock className="w-3 h-3 mr-1" /> Locked</Badge>}
          </div>
        );})}
      </div>
    </Card>
  );
};

export default AchievementsGrid;
