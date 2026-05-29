import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectLeaderboardEntries, selectLeaderboardLoading, selectLeaderboardError, selectLeaderboardPagination } from '../store/leaderboard.selectors';
import { fetchLeaderboard } from '../store/leaderboard.thunks';

export const useLeaderboard = () => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector(selectLeaderboardEntries);
  const loading = useAppSelector(selectLeaderboardLoading);
  const error = useAppSelector(selectLeaderboardError);
  const { total, page, limit, hasMore } = useAppSelector(selectLeaderboardPagination);
  const [timeFilter, setTimeFilterState] = useState<string | undefined>();

  const fetchPage = useCallback(
    (newPage: number) => dispatch(fetchLeaderboard({ timeFilter, page: newPage, limit })),
    [dispatch, timeFilter, limit]
  );

  const setTimeFilter = useCallback(
    (newFilter: string) => {
      setTimeFilterState(newFilter);
      dispatch(fetchLeaderboard({ timeFilter: newFilter, page: 1, limit }));
    },
    [dispatch, limit]
  );

  return { entries, total, page, loading, error, fetchPage, setTimeFilter, timeFilter, hasMore };
};
