import React from 'react';
import { Shield } from '@shared/icons';

const SecurePaymentBanner: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-6">
      <Shield className="w-4 h-4 text-tb-green flex-shrink-0" />
      <p className="text-xs text-green-700">Your payment is secured with 256-bit SSL encryption. We never store your payment details.</p>
    </div>
  );
};

export default SecurePaymentBanner;
