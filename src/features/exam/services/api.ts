import apiClient from '@shared/utils/apiClient';

export const getCategories = async () => {
  const response = await apiClient.get('/exam/categories');
  return response.data.data;
};

export const getCategoryExams = async (slug: string) => {
  const response = await apiClient.get(`/exam/categories/${slug}/exams`);
  return response.data.data;
};

export const getExamDetail = async (slug: string, classFilter?: string) => {
  const params = classFilter ? { class: classFilter } : {};
  const response = await apiClient.get(`/exam/exams/${slug}`, { params });
  return response.data.data;
};

export const fetchHomeData = async () => {
  const response = await apiClient.get('/exam/home');
  return response.data.data;
};

export const checkAccess = async (testId: string) => {
  const response = await apiClient.get(`/exam/access/${testId}`);
  return response.data.data;
};

export const fetchDashboard = async () => {
  const response = await apiClient.get('/exam/dashboard');
  return response.data.data;
};
