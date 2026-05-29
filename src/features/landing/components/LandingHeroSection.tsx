import {
  ArrowRight, BookOpen, Search, Trophy, Users,
} from '@shared/icons';
import AnimatedCounter from './AnimatedCounter';

type NavigateHandler = (path: string) => void;
type AuthHandler = (step: 'login' | 'register') => void;

export const LandingHeroSection = ({
  heroLoaded,
  searchQuery,
  isAuthenticated,
  onSearchChange,
  onNavigate,
  onOpenAuth,
}: {
  heroLoaded: boolean;
  searchQuery: string;
  isAuthenticated: boolean;
  onSearchChange: (value: string) => void;
  onNavigate: NavigateHandler;
  onOpenAuth: AuthHandler;
}) => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-float-delay" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-[15%] left-[10%] w-4 h-4 bg-blue-400/30 rounded-full animate-bounce-slow" />
      <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-orange-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-5 h-5 bg-green-400/20 rounded-lg animate-float-delay" />
      <div className="absolute top-[60%] right-[8%] w-6 h-6 bg-purple-400/20 rounded-full animate-spin-slow" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 w-full">
      <div className="flex justify-center">
        <div className={`max-w-3xl text-center transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-6 hover:bg-white/15 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-sm text-white/80 font-medium">India's #1 Exam Prep Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Crack Your
            <span className="relative inline-block ml-3">
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">Dream Exam</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-500/20 rounded-full blur-sm" />
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-200/80">With Confidence</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-blue-100/70 max-w-lg leading-relaxed mx-auto">
            Practice with <span className="text-white font-semibold">50,000+ tests</span>, get detailed analysis, and compete with <span className="text-white font-semibold">1 Crore+ students</span> across India.
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl shadow-blue-500/10 overflow-hidden transition-all duration-300 focus-within:bg-white/15 focus-within:border-white/30 focus-within:shadow-blue-500/20">
              <Search className="w-5 h-5 text-white/40 ml-5 flex-shrink-0 group-focus-within:text-white/60 transition-colors" />
              <input
                type="text"
                placeholder="Search exams (SSC, Banking, JEE...)"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { isAuthenticated ? onNavigate(`/app/test-series?q=${encodeURIComponent(searchQuery)}`) : onOpenAuth('register'); } }}
                className="flex-1 px-4 py-4 text-sm text-white placeholder-white/30 bg-transparent focus:outline-none"
              />
              <button onClick={() => isAuthenticated ? onNavigate(`/app/test-series?q=${encodeURIComponent(searchQuery)}`) : onOpenAuth('register')} className="m-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0">Explore</button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {[
              { icon: Users, value: 1, suffix: 'Cr+', label: 'Students' },
              { icon: BookOpen, value: 50, suffix: 'K+', label: 'Tests' },
              { icon: Trophy, value: 1000, suffix: '+', label: 'Daily Selections' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/15 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white"><AnimatedCounter end={stat.value} suffix={stat.suffix} /></p>
                  <p className="text-xs text-blue-200/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="rgb(245, 247, 250)" />
      </svg>
    </div>
  </section>
);
