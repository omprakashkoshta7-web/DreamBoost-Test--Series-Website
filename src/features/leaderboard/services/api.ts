import apiClient from '@shared/utils/apiClient';

export interface FetchLeaderboardParams {
  timeFilter?: string;
  page?: number;
  limit?: number;
}

export const fetchLeaderboard = async (params: FetchLeaderboardParams) => {
  const response = await apiClient.get('/leaderboard', { params });
  return response.data.data;
};

export const fetchUserRank = async (userId: string) => {
  const response = await apiClient.get(`/leaderboard/${userId}/rank`);
  return response.data.data;
};
