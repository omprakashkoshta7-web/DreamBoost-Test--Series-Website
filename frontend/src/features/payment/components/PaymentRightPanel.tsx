import React from 'react';
import { Button } from '@shared/components';
import { CheckCircle, Lock, X } from '@shared/icons';
import CouponInput from './CouponInput';
import PaymentMethodSelector from './PaymentMethodSelector';
import SecurePaymentBanner from './SecurePaymentBanner';
import UPIPaymentQR from './UPIPaymentQR';

type AppliedCoupon = { code: string; discountPercent: number; discountAmount: number; finalAmount: number } | null;

interface PaymentRightPanelProps {
  pendingOrder: any;
  utr: string;
  loading: boolean;
  paymentMethod: string;
  couponCode: string;
  appliedCoupon: AppliedCoupon;
  couponLoading: boolean;
  couponError: string;
  paymentError: string;
  paymentSuccess: string;
  currentPrice: number;
  selectedPlanName: string;
  onClose: () => void;
  onPaymentMethodChange: (method: string) => void;
  onCouponCodeChange: (value: string) => void;
  onCouponErrorClear: () => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onUtrChange: (value: string) => void;
  onPayNow: () => void;
  onVerifyPayment: () => void;
}

export const PaymentRightPanel: React.FC<PaymentRightPanelProps> = ({
  pendingOrder, utr, loading, paymentMethod, couponCode, appliedCoupon,
  couponLoading, couponError, paymentError, paymentSuccess, currentPrice,
  selectedPlanName, onClose, onPaymentMethodChange, onCouponCodeChange,
  onCouponErrorClear, onApplyCoupon, onRemoveCoupon, onUtrChange,
  onPayNow, onVerifyPayment,
}) => (
  <div className="lg:w-3/5 p-6 lg:p-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-tb-navy">Payment Method</h3>
      <button onClick={onClose} className="text-tb-gray-400 hover:text-tb-gray-600 transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>

    {!pendingOrder ? (
      <>
        <CouponInput couponCode={couponCode} setCouponCode={(value) => { onCouponCodeChange(value); onCouponErrorClear(); }}
          appliedCoupon={appliedCoupon} couponLoading={couponLoading} couponError={couponError}
          onApply={onApplyCoupon} onRemove={onRemoveCoupon} selectedPlanName={selectedPlanName}
          currentPrice={currentPrice} billingCycle="yearly" />
        <PaymentMethodSelector selected={paymentMethod} onChange={onPaymentMethodChange} />
        <div className="flex items-center justify-center gap-3 mb-6">
          {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
            <span key={app} className="px-3 py-1.5 bg-tb-gray-100 rounded-lg text-xs font-medium text-tb-gray-600">{app}</span>
          ))}
        </div>
      </>
    ) : (
      <UPIPaymentQR pendingOrder={pendingOrder} utr={utr} setUtr={onUtrChange} />
    )}

    <SecurePaymentBanner />

    {paymentError && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-tb-red">{paymentError}</p>}
    {paymentSuccess && (
      <p className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
        <CheckCircle className="w-4 h-4" />{paymentSuccess}
      </p>
    )}
    <div className="flex gap-3">
      <Button variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
      <Button variant="primary" fullWidth isLoading={loading} onClick={pendingOrder ? onVerifyPayment : onPayNow} className="py-3">
        <Lock className="w-4 h-4" /> {pendingOrder ? 'Verify UTR' : `Pay Rs ${appliedCoupon ? appliedCoupon.finalAmount : currentPrice}`}
      </Button>
    </div>
  </div>
);

export default PaymentRightPanel;
