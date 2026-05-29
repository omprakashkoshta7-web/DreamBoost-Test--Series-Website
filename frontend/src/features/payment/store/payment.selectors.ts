import { RootState } from '@store/store';

export const selectPaymentTransactions = (state: RootState) => state.payment.transactions;
export const selectCurrentPlan = (state: RootState) => state.payment.currentPlan;
export const selectPaymentLoading = (state: RootState) => state.payment.loading;
export const selectPaymentError = (state: RootState) => state.payment.error;
