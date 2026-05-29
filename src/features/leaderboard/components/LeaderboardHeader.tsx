import React from 'react';
import { PageHeader } from '@shared/components';
import { Trophy } from '@shared/icons';
import UserRankBadge from './UserRankBadge';

interface LeaderboardHeaderProps {
  userRankData: { rank: number } | null;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ userRankData }) => (
  <PageHeader
    title="All India Leaderboard"
    subtitle="Compete with students across India"
    icon={
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
        <Trophy className="w-6 h-6 text-white" />
      </div>
    }
    action={userRankData ? <UserRankBadge rank={userRankData.rank} /> : undefined}
  />
);

export default LeaderboardHeader;
