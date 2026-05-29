import { ArrowRight } from '@shared/icons';

type NavigateHandler = (path: string) => void;
type AuthHandler = (step: 'login' | 'register') => void;

export const LandingCtaSection = ({
  isAuthenticated,
  onNavigate,
  onOpenAuth,
}: {
  isAuthenticated: boolean;
  onNavigate: NavigateHandler;
  onOpenAuth: AuthHandler;
}) => (
  <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
    </div>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
        Start Your Preparation <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Today</span>
      </h2>
      <p className="text-blue-100/70 mb-10 max-w-xl mx-auto text-lg">Join 1 crore+ students who trust DreamBoost for their exam preparation</p>
      <button onClick={() => isAuthenticated ? onNavigate('/app/dashboard') : onOpenAuth('register')} className="w-full sm:w-auto px-8 py-4 text-base font-bold text-tb-blue bg-white rounded-xl hover:bg-gray-50 shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2">
        {isAuthenticated ? 'Go to Dashboard' : 'Start Free'} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </section>
);
