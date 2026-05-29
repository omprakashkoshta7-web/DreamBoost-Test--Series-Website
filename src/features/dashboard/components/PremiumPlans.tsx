import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { Crown, Star, CheckCircle, ChevronRight, ArrowRight } from '@shared/icons';

interface PremiumPlansProps {
  plans: any[];
}

const PremiumPlans: React.FC<PremiumPlansProps> = ({ plans }) => {
  const navigate = useNavigate();
  if (plans.length === 0) return null;
  const displayedPlans = plans.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <Crown className="w-5 h-5 text-tb-orange" />
          Premium Plans
        </h2>
        <button onClick={() => navigate('/app/payment')} className="text-sm text-tb-blue font-medium flex items-center gap-1 hover:text-tb-blue-dark transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto items-stretch justify-center">
        {displayedPlans.map((plan: any, i: number) => {
          const isPopular = plan.isPopular;
          return (
            <div key={plan._id || i} className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              isPopular ? 'bg-white shadow-tb-lg sm:scale-105 z-10' : 'bg-white shadow-tb border border-tb-gray-200 hover:shadow-tb-md'
            }`}>
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
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-tb-navy">₹{plan.price}</span>
                    {plan.originalPrice > plan.price && (
                      <>
                        <span className="text-sm text-tb-gray-400 line-through">₹{plan.originalPrice}</span>
                        <span className="text-xs font-bold text-tb-green bg-green-50 px-2 py-0.5 rounded-full">{plan.discount}% OFF</span>
                      </>
                    )}
                  </div>
                </div>
                {plan.features && Array.isArray(plan.features) && (
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feat: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-3 text-sm text-tb-gray-600">
                        <CheckCircle className="w-4 h-4 text-tb-green mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button variant={isPopular ? 'orange' : 'primary'} fullWidth onClick={() => navigate(plan.price > 0 ? `/app/payment?plan=${plan._id}` : '/app/dashboard')}>
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

export default PremiumPlans;
