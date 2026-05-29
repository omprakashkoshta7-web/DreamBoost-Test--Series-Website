import React from 'react';
import { Modal } from '@shared/components';
import { PaymentPlanSidebar } from './PaymentPlanSidebar';
import { PaymentRightPanel } from './PaymentRightPanel';

type AppliedCoupon = {
  code: string;
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
} | null;

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  selectedPlanData: any;
  currentPrice: number;
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

const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen, selectedPlanData, currentPrice, pendingOrder, utr, loading,
  paymentMethod, couponCode, appliedCoupon, couponLoading, couponError,
  paymentError, paymentSuccess, onClose, onPaymentMethodChange,
  onCouponCodeChange, onCouponErrorClear, onApplyCoupon, onRemoveCoupon,
  onUtrChange, onPayNow, onVerifyPayment,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="" size="2xl">
    <div className="flex flex-col lg:flex-row">
      <PaymentPlanSidebar
        name={selectedPlanData?.name || ''}
        currentPrice={currentPrice}
        originalPrice={selectedPlanData?.originalPrice || 0}
        features={selectedPlanData?.features || []}
      />
      <PaymentRightPanel
        pendingOrder={pendingOrder} utr={utr} loading={loading}
        paymentMethod={paymentMethod} couponCode={couponCode}
        appliedCoupon={appliedCoupon} couponLoading={couponLoading}
        couponError={couponError} paymentError={paymentError}
        paymentSuccess={paymentSuccess} currentPrice={currentPrice}
        selectedPlanName={selectedPlanData?.name || ''}
        onClose={onClose} onPaymentMethodChange={onPaymentMethodChange}
        onCouponCodeChange={onCouponCodeChange}
        onCouponErrorClear={onCouponErrorClear} onApplyCoupon={onApplyCoupon}
        onRemoveCoupon={onRemoveCoupon} onUtrChange={onUtrChange}
        onPayNow={onPayNow} onVerifyPayment={onVerifyPayment}
      />
    </div>
  </Modal>
);

export default PaymentCheckoutModal;
