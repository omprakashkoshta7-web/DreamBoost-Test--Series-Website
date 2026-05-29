import apiClient from '@shared/utils/apiClient';

export const createPayment = async (payload: { plan: string; amount: number; paymentMethod: string; billingCycle?: 'monthly' | 'yearly'; couponCode?: string }): Promise<any> => {
  const response = await apiClient.post('/payments', payload);
  return response.data.data;
};

export const verifyPayment = async (payload: { orderId: string; utr: string }): Promise<any> => {
  const response = await apiClient.post(`/payments/${payload.orderId}/verify`, { utr: payload.utr });
  return response.data.data;
};

export const fetchPaymentHistory = async (): Promise<any> => {
  const response = await apiClient.get('/payments');
  return response.data.data;
};

export const fetchCurrentPlan = async (): Promise<{ plan: string; endDate: string | null; autoRenew: boolean }> => {
  const response = await apiClient.get('/payments/current-plan');
  return response.data.data;
};
