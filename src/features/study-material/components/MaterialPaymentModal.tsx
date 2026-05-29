import React from 'react';
import { Button, Modal } from '@shared/components';
import { Check, CheckCircle, Crown, Lock, Shield, Smartphone, X, Zap } from '@shared/icons';

interface MaterialPaymentModalProps {
  isOpen: boolean;
  material: any;
  pricing: any;
  planMeta: { label: string; color: string; features: string[] };
  PlanIcon: React.ComponentType<any>;
  discount: number;
  paymentMethod: string;
  pendingOrder: any;
  paymentUtr: string;
  paymentError: string;
  paymentSuccess: string;
  buying: boolean;
  verifyingPayment: boolean;
  onClose: () => void;
  onPaymentMethodChange: (method: string) => void;
  onPaymentUtrChange: (value: string) => void;
  onBuy: () => void;
  onVerifyPayment: () => void;
}

export const MaterialPaymentModal: React.FC<MaterialPaymentModalProps> = ({
  isOpen, material, pricing, planMeta, PlanIcon, discount,
  paymentMethod, pendingOrder, paymentUtr, paymentError, paymentSuccess,
  buying, verifyingPayment, onClose, onPaymentMethodChange, onPaymentUtrChange,
  onBuy, onVerifyPayment,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="" size="2xl">
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-2/5 bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <PlanIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-lg">{planMeta.label} Plan</p>
              <p className="text-xs text-blue-200/70">{material.title}</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">Rs {pricing.price}</span>
              {pricing.originalPrice > pricing.price && (
                <span className="text-lg text-blue-200/70 line-through">Rs {pricing.originalPrice}</span>
              )}
            </div>
            <p className="text-xs text-blue-200/70 mt-1">One-time payment. Lifetime access.</p>
          </div>
          {discount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl border border-green-500/30 mb-6">
              <Zap className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-green-200">Save {discount}% - Limited offer!</span>
            </div>
          )}
          <div className="space-y-3 mb-6">
            {planMeta.features.map((feature, i) => (
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
          </div>
        </div>
      </div>
      <div className="lg:w-3/5 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-tb-navy">Payment Method</h3>
          <button onClick={onClose} className="text-tb-gray-400 hover:text-tb-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        {!pendingOrder && (
          <div className="space-y-3 mb-6">
            <p className="text-sm font-medium text-tb-gray-700">Payment Method</p>
            {['upi', 'card', 'netbanking'].map((method) => (
              <label key={method} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === method ? 'border-tb-blue bg-blue-50' : 'border-tb-gray-200 hover:border-tb-gray-300'}`}>
                <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => onPaymentMethodChange(method)} className="accent-tb-blue" />
                <span className="text-sm font-medium text-tb-navy capitalize">{method === 'card' ? 'Credit / Debit Card' : method === 'netbanking' ? 'Net Banking' : 'UPI'}</span>
              </label>
            ))}
          </div>
        )}
        {pendingOrder?.qrImageUrl && (
          <div className="space-y-5 mb-6">
            <div className="rounded-2xl border border-tb-gray-200 bg-tb-gray-50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-tb-navy mb-3">
                <Smartphone className="w-4 h-4" />Scan QR to Pay
              </div>
              <p className="text-sm font-semibold text-tb-navy mb-3">Scan QR to Pay Rs {pendingOrder.amount}</p>
              <img src={pendingOrder.qrImageUrl} alt={`Payment QR for ${pendingOrder.orderId}`} className="mx-auto h-56 w-56 rounded-xl bg-white p-3 shadow-sm" />
              <p className="mt-3 text-2xl font-black text-tb-navy">Rs {pendingOrder.amount}</p>
              <p className="text-xs text-tb-gray-500">Order ID: {pendingOrder.orderId}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy mb-2">Pay using</p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-tb-gray-600">
                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => <span key={app} className="rounded-lg bg-tb-gray-100 px-2 py-2">{app}</span>)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-tb-gray-700 mb-2">Payment Done? Enter UTR</label>
              <input type="text" placeholder="Paste UTR / transaction reference" value={paymentUtr} onChange={(event) => onPaymentUtrChange(event.target.value)} className="w-full px-4 py-3 border border-tb-gray-300 rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-tb-blue focus:border-transparent transition-all" />
            </div>
          </div>
        )}
        {!pendingOrder && (
          <div className="flex items-center justify-center gap-3 mb-6">
            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
              <span key={app} className="px-3 py-1.5 bg-tb-gray-100 rounded-lg text-xs font-medium text-tb-gray-600">{app}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-6">
          <Shield className="w-4 h-4 text-tb-green flex-shrink-0" />
          <p className="text-xs text-green-700">Your payment is secured with 256-bit SSL encryption. We never store your payment details.</p>
        </div>
        {paymentError && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-tb-red">{paymentError}</p>}
        {paymentSuccess && (
          <p className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />{paymentSuccess}
          </p>
        )}
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
          <Button variant="primary" fullWidth isLoading={pendingOrder ? verifyingPayment : buying} onClick={pendingOrder ? onVerifyPayment : onBuy} className="py-3">
            <Lock className="w-4 h-4" /> {pendingOrder ? 'Verify & Unlock' : `Pay Rs ${pricing.price}`}
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default MaterialPaymentModal;
