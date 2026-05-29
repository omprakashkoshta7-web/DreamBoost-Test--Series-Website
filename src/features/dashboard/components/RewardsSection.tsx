import React from 'react';
import { Card } from '@shared/components';
import { Flame, Award } from '@shared/icons';

interface RewardsSectionProps {
  badges: any[];
  streak: number;
  achievements: number;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ badges, streak, achievements }) => {
  if (!badges.length && !streak && !achievements) return null;

  return (
    <Card title="Rewards & Achievements">
      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-tb-orange/10 rounded-xl">
          <Flame className="w-5 h-5 text-tb-orange" />
          <div>
            <p className="text-sm font-bold text-tb-navy">{streak} Day Streak</p>
            <p className="text-xs text-tb-gray-500">Keep going!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-xl">
          <Award className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm font-bold text-tb-navy">{achievements} Achievements</p>
            <p className="text-xs text-tb-gray-500">{badges.length} badges</p>
          </div>
        </div>
      </div>
      {badges.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {badges.slice(0, 5).map((b: any) => (
            <div key={b.id} className="flex-shrink-0 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-sm">
                {b.icon || '🏆'}
              </div>
              <p className="text-xs text-tb-gray-500 mt-1 whitespace-nowrap">{b.title}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RewardsSection;
