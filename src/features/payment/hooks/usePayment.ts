import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectPaymentTransactions, selectCurrentPlan, selectPaymentLoading, selectPaymentError } from '../store/payment.selectors';
import { createPayment, verifyPayment, fetchPaymentHistory, fetchCurrentPlan } from '../store/payment.thunks';

export const usePayment = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectPaymentTransactions);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const loading = useAppSelector(selectPaymentLoading);
  const error = useAppSelector(selectPaymentError);

  const purchasePlan = useCallback(
    (data: { plan: string; amount: number; paymentMethod: string; billingCycle?: 'monthly' | 'yearly'; couponCode?: string }) =>
      dispatch(createPayment(data)),
    [dispatch]
  );

  const verifyPlanPayment = useCallback(
    (data: { orderId: string; utr: string }) => dispatch(verifyPayment(data)),
    [dispatch]
  );

  const refresh = useCallback(() => {
    dispatch(fetchPaymentHistory());
    dispatch(fetchCurrentPlan());
  }, [dispatch]);

  return { plans: [], currentPlan, paymentHistory: transactions, loading, error, purchasePlan, verifyPlanPayment, refresh };
};
