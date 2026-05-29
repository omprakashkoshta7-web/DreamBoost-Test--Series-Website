import React from 'react';
import { Crown, Check } from '@shared/icons';

interface Plan {
  _id?: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  isPopular?: boolean;
  features: string[];
}

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`card min-h-[490px] p-8 text-center relative flex flex-col ${plan.isPopular ? 'shadow-tb-lg scale-[1.03]' : 'shadow-tb-md'}`}>
      {plan.isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-tb-orange text-white text-xs font-bold rounded-full shadow-lg">Most Popular</span>}
      <div className="flex items-center gap-4 justify-center mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.isPopular ? 'bg-tb-orange' : 'bg-tb-blue-light'}`}>
          <Crown className={`w-6 h-6 ${plan.isPopular ? 'text-white' : 'text-tb-blue'}`} />
        </div>
        <h3 className="text-xl font-bold text-tb-navy">{plan.name}</h3>
      </div>
      <div className="mt-4 mb-7">
        <span className="text-4xl font-black text-tb-navy">₹{plan.price}</span>
        {plan.originalPrice > plan.price && <span className="text-sm text-tb-gray-400 line-through ml-2">₹{plan.originalPrice}</span>}
        {plan.discount > 0 && <span className="block text-sm font-bold text-tb-green mt-2">{plan.discount}% OFF</span>}
      </div>
      {plan.features && Array.isArray(plan.features) && (
        <ul className="space-y-4 mb-7 text-base text-tb-gray-600 flex-1">
          {plan.features.map((f: string, fi: number) => (
            <li key={fi} className="flex items-center gap-3 justify-center"><Check className="w-4 h-4 text-tb-green flex-shrink-0" />{f}</li>
          ))}
        </ul>
      )}
      <button onClick={() => onSelect(plan)}
        disabled={plan.price <= 0}
        className={`mt-auto w-full py-3.5 rounded-lg text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
          plan.price <= 0 ? 'bg-tb-gray-100 text-tb-gray-500 cursor-default hover:scale-100 active:scale-100' : plan.isPopular ? 'bg-tb-orange text-white hover:bg-tb-orange-hover shadow-lg shadow-orange-500/25' : 'bg-tb-blue text-white hover:bg-tb-blue-dark'
        }`}
      >
        {plan.price <= 0 ? 'Current Plan' : 'Subscribe'}
      </button>
    </div>
  );
};

export default PlanCard;
