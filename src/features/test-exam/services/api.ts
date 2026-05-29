import apiClient from '@shared/utils/apiClient';

export const fetchTestForExam = async (testId: string) => {
  const response = await apiClient.get(`/tests/${testId}`);
  return response.data.data;
};

export const submitTestExam = async (testId: string, data: { answers: Record<string, number>; timeTaken: number; startedAt: string; completedAt: string }) => {
  const response = await apiClient.post(`/tests/${testId}/submit`, data);
  return response.data.data;
};
