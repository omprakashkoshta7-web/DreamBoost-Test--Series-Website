import React from 'react';
import { Trophy } from '@shared/icons';

interface UserRankBadgeProps {
  rank: number;
}

const UserRankBadge: React.FC<UserRankBadgeProps> = ({ rank }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
      <Trophy className="w-5 h-5 text-tb-orange" /><span className="text-sm font-bold text-tb-navy">Your Rank: #{rank}</span>
    </div>
  );
};

export default UserRankBadge;
