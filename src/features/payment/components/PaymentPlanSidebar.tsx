import React from 'react';
import { Check, Crown, RefreshCw, Shield } from '@shared/icons';

interface PaymentPlanSidebarProps {
  name: string;
  currentPrice: number;
  originalPrice: number;
  features: string[];
}

export const PaymentPlanSidebar: React.FC<PaymentPlanSidebarProps> = ({ name, currentPrice, originalPrice, features }) => (
  <div className="lg:w-2/5 bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 p-6 lg:p-8 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Crown className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-lg">{name} Plan</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">Rs {currentPrice}</span>
        </div>
        {originalPrice > currentPrice && <p className="text-sm text-blue-200/70 line-through mt-1">Rs {originalPrice}</p>}
      </div>
      <div className="space-y-3 mb-6">
        {features?.map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-sm text-blue-100/80">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-blue-200/70">
          <Shield className="w-4 h-4" /><span>256-bit SSL encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-200/70 mt-2">
          <RefreshCw className="w-4 h-4" /><span>7-day money-back guarantee</span>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentPlanSidebar;
