import { useState, useCallback } from 'react';
import { useAppDispatch } from '@store/hooks';
import { usePayment } from './usePayment';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const { purchasePlan, verifyPlanPayment, refresh } = usePayment();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [utr, setUtr] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');

  const currentPrice = selectedPlanData?.price ?? 0;

  const resetPaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    setSelectedPlanData(null);
    setPendingOrder(null);
    setUtr('');
    setPaymentError('');
    setPaymentSuccess('');
  }, []);

  const handleSelectPlan = useCallback((plan: any) => {
    if (plan.price <= 0) return;
    setSelectedPlanData(plan);
    setShowPaymentModal(true);
  }, []);

  const handlePayNow = useCallback(async (appliedCoupon: any) => {
    if (!selectedPlanData || currentPrice === 0) return;
    const amount = appliedCoupon ? appliedCoupon.finalAmount : currentPrice;
    setPaymentError('');
    const result = await purchasePlan({
      plan: selectedPlanData.slug || selectedPlanData.name?.toLowerCase(),
      amount,
      paymentMethod,
      billingCycle: 'yearly' as const,
      couponCode: appliedCoupon?.code,
    });
    if (result?.meta?.requestStatus === 'fulfilled') {
      setPendingOrder(result.payload);
    } else {
      setPaymentError((result as any)?.payload || 'Unable to create payment order');
    }
  }, [selectedPlanData, currentPrice, purchasePlan, paymentMethod]);

  const handleVerifyPayment = useCallback(async () => {
    if (!pendingOrder?.orderId) return;
    setPaymentError('');
    setPaymentSuccess('');
    const result = await verifyPlanPayment({ orderId: pendingOrder.orderId, utr });
    if (result?.meta?.requestStatus === 'fulfilled') {
      setPaymentSuccess('Payment verified. Your subscription is active now.');
      refresh();
      setTimeout(resetPaymentModal, 900);
    } else {
      setPaymentError((result as any)?.payload || 'Payment verification failed');
    }
  }, [pendingOrder, utr, verifyPlanPayment, refresh, resetPaymentModal]);

  return {
    showPaymentModal, selectedPlanData, currentPrice, paymentMethod,
    pendingOrder, utr, paymentError, paymentSuccess,
    setShowPaymentModal, setSelectedPlanData, setPaymentMethod, setUtr,
    setPaymentError, setPaymentSuccess, setPendingOrder,
    resetPaymentModal, handleSelectPlan, handlePayNow, handleVerifyPayment,
  };
};
