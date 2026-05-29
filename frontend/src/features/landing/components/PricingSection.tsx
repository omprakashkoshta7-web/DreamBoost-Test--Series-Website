import { Check, ChevronRight, Crown } from '@shared/icons';

type NavigateHandler = (path: string) => void;
type AuthHandler = (step: 'login' | 'register') => void;

export const PricingSection = ({
  plans,
  loading,
  isAuthenticated,
  onNavigate,
  onOpenAuth,
}: {
  plans: any[];
  loading: boolean;
  isAuthenticated: boolean;
  onNavigate: NavigateHandler;
  onOpenAuth: AuthHandler;
}) => (
  <section id="pricing" className="py-16 sm:py-20 bg-white border-t border-tb-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider mb-3">Pricing</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-tb-navy">Affordable Pricing</h2>
        <p className="text-sm text-tb-gray-500 mt-2 max-w-md mx-auto">Start free, upgrade when ready</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto items-stretch justify-center">
        {plans.length > 0 ? plans.map((plan, i) => (
          <div key={plan._id || i} className={`card min-h-[490px] p-8 text-center relative flex flex-col ${plan.isPopular ? 'shadow-tb-lg scale-[1.03]' : 'shadow-tb-md'}`}>
            {plan.isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-tb-orange text-white text-xs font-bold rounded-full shadow-lg">Most Popular</span>}
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.isPopular ? 'bg-tb-orange' : 'bg-tb-blue-light'}`}>
                <Crown className={`w-6 h-6 ${plan.isPopular ? 'text-white' : 'text-tb-blue'}`} />
              </div>
              <h3 className="text-xl font-bold text-tb-navy">{plan.name}</h3>
            </div>
            <div className="mt-4 mb-7">
              <span className="text-4xl font-black text-tb-navy">Rs {plan.price}</span>
              {plan.originalPrice > plan.price && <span className="text-sm text-tb-gray-400 line-through ml-2">Rs {plan.originalPrice}</span>}
              {plan.discount > 0 && <span className="block text-sm font-bold text-tb-green mt-2">{plan.discount}% OFF</span>}
            </div>
            {plan.features && Array.isArray(plan.features) && (
              <ul className="space-y-4 mb-7 text-base text-tb-gray-600 flex-1">
                {plan.features.map((feature: string, fi: number) => (
                  <li key={fi} className="flex items-center gap-3 justify-center"><Check className="w-4 h-4 text-tb-green flex-shrink-0" />{feature}</li>
                ))}
              </ul>
            )}
            <button
              onClick={() => plan.price > 0 ? (isAuthenticated ? onNavigate('/app/payment') : onOpenAuth('register')) : (isAuthenticated ? onNavigate('/app/dashboard') : onOpenAuth('register'))}
              className={`mt-auto w-full py-3.5 rounded-lg text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                plan.isPopular ? 'bg-tb-orange text-white hover:bg-tb-orange-hover shadow-lg shadow-orange-500/25' : 'bg-tb-blue text-white hover:bg-tb-blue-dark'
              }`}
            >
              {plan.price > 0 ? 'Subscribe' : 'Start Free'}
            </button>
          </div>
        )) : !loading && (
          <div className="col-span-full text-center py-8 text-tb-gray-400">No plans available</div>
        )}
      </div>
    </div>
  </section>
);
