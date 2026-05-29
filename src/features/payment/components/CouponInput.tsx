import React from 'react';
import { Tag, Check, X } from '@shared/icons';
import { Button } from '@shared/components';

interface CouponInputProps {
  couponCode: string;
  setCouponCode: (v: string) => void;
  appliedCoupon: { code: string; discountPercent: number; discountAmount: number; finalAmount: number } | null;
  couponLoading: boolean;
  couponError: string;
  onApply: () => void;
  onRemove: () => void;
  selectedPlanName: string;
  currentPrice: number;
  billingCycle: 'monthly' | 'yearly';
}

const CouponInput: React.FC<CouponInputProps> = ({
  couponCode, setCouponCode, appliedCoupon, couponLoading, couponError,
  onApply, onRemove, selectedPlanName, currentPrice, billingCycle,
}) => {
  return (
    <div className="mb-6 p-4 bg-tb-gray-50 rounded-xl border border-tb-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-tb-blue" />
        <span className="text-sm font-semibold text-tb-navy">Have a coupon?</span>
      </div>
      {appliedCoupon ? (
        <div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-tb-green" />
              <span className="text-sm font-medium text-green-800">{appliedCoupon.code}</span>
              <span className="text-xs font-semibold text-tb-green bg-green-100 px-2 py-0.5 rounded-full">{appliedCoupon.discountPercent}% OFF</span>
            </div>
            <button onClick={onRemove} className="p-1 hover:bg-green-200 rounded-lg transition-colors"><X className="w-4 h-4 text-green-700" /></button>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between text-tb-gray-500"><span>Original Amount</span><span>₹{currentPrice}{billingCycle === 'yearly' ? '/mo' : ''}</span></div>
            <div className="flex justify-between text-tb-green"><span>Discount</span><span>-₹{appliedCoupon.discountAmount}</span></div>
            <div className="flex justify-between font-bold text-tb-navy border-t border-tb-gray-200 pt-1 mt-1"><span>Final Amount</span><span>₹{appliedCoupon.finalAmount}{billingCycle === 'yearly' ? '/mo' : ''}</span></div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input type="text" placeholder="Enter coupon code" value={couponCode}
            onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); }}
            onKeyDown={(e) => e.key === 'Enter' && onApply()}
            className="flex-1 px-3 py-2 border border-tb-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue focus:border-transparent transition-all uppercase" />
          <Button variant="primary" size="sm" onClick={onApply} isLoading={couponLoading} disabled={!couponCode.trim()}>Apply</Button>
        </div>
      )}
      {couponError && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><X className="w-3 h-3" /> {couponError}</p>}
    </div>
  );
};

export default CouponInput;
