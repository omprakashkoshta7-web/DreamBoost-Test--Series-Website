import React, { useState, useEffect } from 'react';
import SEO from '@shared/components/SEO';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUserRank } from '../store/leaderboard.thunks';
import { selectUserRank } from '../store/leaderboard.selectors';
import { selectAuthUser } from '@features/auth/store/auth.selectors';
import { Loader } from '@shared/components';
import { Trophy } from '@shared/icons';
import TimeFilterBar from '../components/TimeFilterBar';
import TopPerformers from '../components/TopPerformers';
import RankingsTable from '../components/RankingsTable';
import LeaderboardHeader from '@features/leaderboard/components/LeaderboardHeader';
import { useLeaderboard } from '../hooks';

const LeaderboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRankData = useAppSelector(selectUserRank);
  const authUser = useAppSelector(selectAuthUser);

  const { entries, loading, timeFilter, setTimeFilter } = useLeaderboard();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (authUser?.id) dispatch(fetchUserRank(authUser.id));
  }, [dispatch, authUser]);

  if (loading && entries.length === 0) {
    return <div className="flex items-center justify-center py-20"><Loader size="lg" label="Loading leaderboard..." /></div>;
  }

  return (
    <div className="space-y-6">
      <SEO title="Leaderboard" noIndex />
      <LeaderboardHeader userRankData={userRankData} />

      <TimeFilterBar selected={timeFilter || 'weekly'} onChange={setTimeFilter} />
      <TopPerformers entries={entries.slice(0, 3)} />
      <RankingsTable entries={entries.slice(3)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    </div>
  );
};

export default LeaderboardPage;
