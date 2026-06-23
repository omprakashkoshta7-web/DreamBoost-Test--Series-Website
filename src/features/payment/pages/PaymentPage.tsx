import React, { useEffect, useState } from 'react';
import SEO from '@shared/components/SEO';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from '@shared/icons';
import apiClient from '@shared/utils/apiClient';
import { usePayment, useCoupon, useCheckout } from '../hooks';
import CurrentPlanBanner from '../components/CurrentPlanBanner';
import PlanCard from '../components/PlanCard';
import PaymentCheckoutModal from '../components/PaymentCheckoutModal';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPlan, loading, refresh } = usePayment();
  const {
    showPaymentModal, selectedPlanData, currentPrice, paymentMethod,
    pendingOrder, utr, paymentError, paymentSuccess,
    setPaymentMethod, setUtr,
    resetPaymentModal, handleSelectPlan, handlePayNow, handleVerifyPayment,
  } = useCheckout();
  const { couponCode, appliedCoupon, couponLoading, couponError, setCouponCode, setCouponError, applyCoupon, removeCoupon } = useCoupon(selectedPlanData);

  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  useEffect(() => {
    refresh();
    const planParam = new URLSearchParams(location.search).get('plan');

    apiClient.get('/subscription/plans').then((r) => {
      const fetchedPlans = r.data.data || [];
      setPlans(fetchedPlans);
      if (!planParam) return;

      const selectedPlan = fetchedPlans.find((plan: any) =>
        [plan._id, plan.slug, plan.name].some((value) => String(value || '').toLowerCase() === planParam.toLowerCase())
      );

      if (selectedPlan) {
        handleSelectPlan(selectedPlan);
      }
    }).catch(() => {}).finally(() => setPlansLoading(false));
  }, [refresh, location.search, handleSelectPlan]);

  const planLabel = currentPlan?.plan || 'Free';
  const planEndDate = currentPlan?.endDate
    ? new Date(currentPlan.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;
  const displayedPlans = plans.slice(0, 3);

  const handleClose = () => {
    resetPaymentModal();
    removeCoupon();
    setCouponCode('');
  };

  return (
    <div className="space-y-6">
      <SEO title="Payments" noIndex />
      <button onClick={() => navigate('/app/dashboard')} className="flex items-center gap-2 text-tb-gray-500 hover:text-tb-navy transition-colors">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm font-medium">Back to Dashboard</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-tb-navy">Upgrade Your Plan</h1>
        <p className="mt-1 text-sm text-tb-gray-500">Unlock premium features and accelerate your preparation</p>
      </div>

      <CurrentPlanBanner planLabel={planLabel} planEndDate={planEndDate} currentPlan={currentPlan} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto items-stretch justify-center">
        {displayedPlans.map((plan, i) => (
          <PlanCard
            key={plan._id || i}
            plan={plan}
            onSelect={handleSelectPlan}
          />
        ))}
        {!plansLoading && plans.length === 0 && <div className="col-span-full text-center py-8 text-tb-gray-400">No plans available</div>}
      </div>

      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
        <Shield className="w-5 h-5 text-tb-green flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Secure Payment</p>
          <p className="text-xs text-green-700 mt-0.5">All transactions are encrypted with 256-bit SSL. Supports UPI, Cards, Net Banking & Wallets.</p>
        </div>
      </div>

      <PaymentCheckoutModal
        isOpen={showPaymentModal}
        selectedPlanData={selectedPlanData}
        currentPrice={currentPrice}
        pendingOrder={pendingOrder}
        utr={utr}
        loading={loading}
        paymentMethod={paymentMethod}
        couponCode={couponCode}
        appliedCoupon={appliedCoupon}
        couponLoading={couponLoading}
        couponError={couponError}
        paymentError={paymentError}
        paymentSuccess={paymentSuccess}
        onClose={handleClose}
        onPaymentMethodChange={setPaymentMethod}
        onCouponCodeChange={setCouponCode}
        onCouponErrorClear={() => setCouponError('')}
        onApplyCoupon={applyCoupon}
        onRemoveCoupon={removeCoupon}
        onUtrChange={setUtr}
        onPayNow={() => handlePayNow(appliedCoupon)}
        onVerifyPayment={handleVerifyPayment}
      />
    </div>
  );
};

export default PaymentPage;
