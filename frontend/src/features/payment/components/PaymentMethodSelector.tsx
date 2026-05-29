import React from 'react';
import { Smartphone, CreditCard, Building2, Wallet } from '@shared/icons';

const methods = [
  { value: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: Smartphone, color: 'text-tb-blue' },
  { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard, color: 'text-purple-600' },
  { value: 'netbanking', label: 'Net Banking', desc: 'All major banks', icon: Building2, color: 'text-orange-600' },
  { value: 'wallet', label: 'Wallets', desc: 'Paytm, Freecharge, MobiKwik', icon: Wallet, color: 'text-green-600' },
];

interface PaymentMethodSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="space-y-3 mb-6">
      {methods.map((m, i) => {
        const Icon = m.icon;
        const isSelected = selected === m.value;
        return (
          <label key={i} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
            isSelected ? 'border-2 border-tb-blue bg-blue-50/50' : 'border border-tb-gray-200 hover:bg-tb-gray-50'
          }`}>
            <input type="radio" name="payment" checked={isSelected} onChange={() => onChange(m.value)} className="w-4 h-4 text-tb-blue" />
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-100' : 'bg-tb-gray-100'}`}>
              <Icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-tb-navy">{m.label}</p>
              <p className="text-xs text-tb-gray-500">{m.desc}</p>
            </div>
            {m.value === 'upi' && <span className="text-xs font-medium text-tb-green bg-green-50 px-2 py-1 rounded-full">Instant</span>}
          </label>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
