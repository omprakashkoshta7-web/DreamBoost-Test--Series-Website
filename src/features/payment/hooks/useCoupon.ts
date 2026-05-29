import { useState, useCallback } from 'react';
import apiClient from '@shared/utils/apiClient';

interface AppliedCoupon {
  code: string;
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
}

export const useCoupon = (selectedPlanData: any) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = useCallback(async () => {
    const trimmed = couponCode.trim();
    if (!trimmed || !selectedPlanData) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await apiClient.post('/payments/apply-coupon', {
        code: trimmed,
        plan: selectedPlanData.slug || selectedPlanData.name?.toLowerCase(),
        billingCycle: 'yearly',
      });
      const { discountPercent, discountAmount, finalAmount } = res.data.data;
      setAppliedCoupon({ code: trimmed, discountPercent, discountAmount, finalAmount });
      setCouponCode('');
    } catch (err: any) {
      setAppliedCoupon(null);
      setCouponError(err.response?.data?.message || 'Invalid or expired coupon code');
    } finally {
      setCouponLoading(false);
    }
  }, [couponCode, selectedPlanData]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError('');
  }, []);

  return { couponCode, appliedCoupon, couponLoading, couponError, setCouponCode, setCouponError, applyCoupon, removeCoupon };
};
