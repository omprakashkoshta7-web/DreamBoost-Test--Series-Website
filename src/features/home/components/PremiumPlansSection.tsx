import React from 'react';
import { Button } from '@shared/components';
import { ArrowRight, CheckCircle, Crown, Star } from '@shared/icons';

type NavigateHandler = (path: string) => void;

export const PremiumPlansSection = ({ plans, onNavigate }: { plans?: any[]; onNavigate: NavigateHandler }) => {
  if (!plans?.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <Crown className="w-5 h-5 text-tb-orange" />
          Premium Plans
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto items-stretch justify-center">
        {plans.slice(0, 3).map((plan: any, i: number) => {
          const isPopular = plan.isPopular || plan.popular || i === Math.floor(Math.min(plans.length, 3) / 2);
          return (
            <div
              key={plan._id || i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isPopular ? 'bg-white shadow-tb-lg scale-105 sm:scale-105 z-10' : 'bg-white shadow-tb border border-tb-gray-200 hover:shadow-tb-md'
              }`}
            >
              {isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-l from-tb-orange to-amber-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPopular ? 'bg-tb-orange' : 'bg-tb-blue-light'}`}>
                    <Crown className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-tb-blue'}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-tb-navy">{plan.name}</h3>
                    {plan.description && <p className="text-xs text-tb-gray-500">{plan.description}</p>}
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-tb-navy">Rs {plan.price}</span>
                    {plan.originalPrice && (
                      <>
                        <span className="text-sm text-tb-gray-400 line-through">Rs {plan.originalPrice}</span>
                        {plan.discount && <span className="text-xs font-bold text-tb-green bg-green-50 px-2 py-0.5 rounded-full">{plan.discount}% OFF</span>}
                      </>
                    )}
                  </div>
                </div>
                {plan.features?.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feat: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-3 text-sm text-tb-gray-600">
                        <CheckCircle className="w-4 h-4 text-tb-green mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button variant={isPopular ? 'orange' : 'primary'} fullWidth onClick={() => onNavigate(plan.price > 0 ? `/app/payment?plan=${plan._id || plan.name}` : '/app/dashboard')}>
                  {plan.price > 0 ? 'Subscribe' : 'Start Free'} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumPlansSection;
