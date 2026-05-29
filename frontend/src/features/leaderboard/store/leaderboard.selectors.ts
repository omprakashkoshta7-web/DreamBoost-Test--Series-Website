import { RootState } from '@store/store';

export const selectLeaderboardEntries = (state: RootState) => state.leaderboard.entries;
export const selectUserRank = (state: RootState) => state.leaderboard.userRank;
export const selectLeaderboardLoading = (state: RootState) => state.leaderboard.loading;
export const selectLeaderboardError = (state: RootState) => state.leaderboard.error;
export const selectLeaderboardPagination = (state: RootState) => state.leaderboard.pagination;
