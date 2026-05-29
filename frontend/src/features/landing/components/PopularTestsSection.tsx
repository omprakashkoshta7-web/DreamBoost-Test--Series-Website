import {
  Atom, BookOpen, Building2, Calculator, ChevronRight, Clock, FileText,
  Landmark, Shield, Stethoscope, TrainFront, Users,
} from '@shared/icons';

type NavigateHandler = (path: string) => void;

export const PopularTestsSection = ({
  tests,
  loading,
  onNavigate,
  onStartTest,
}: {
  tests: any[];
  loading: boolean;
  onNavigate: NavigateHandler;
  onStartTest: (test?: any) => void;
}) => {
  const gradientMap: Record<string, { from: string; to: string; icon: React.ComponentType<any> }> = {
    default: { from: 'from-blue-500', to: 'to-indigo-600', icon: BookOpen },
    SSC: { from: 'from-cyan-500', to: 'to-blue-600', icon: FileText },
    Banking: { from: 'from-emerald-500', to: 'to-teal-600', icon: Building2 },
    Railway: { from: 'from-orange-500', to: 'to-red-500', icon: TrainFront },
    JEE: { from: 'from-purple-500', to: 'to-pink-500', icon: Atom },
    NEET: { from: 'from-green-500', to: 'to-emerald-600', icon: Stethoscope },
    UPSC: { from: 'from-rose-500', to: 'to-pink-600', icon: Landmark },
    GATE: { from: 'from-violet-500', to: 'to-purple-600', icon: Calculator },
    Defence: { from: 'from-yellow-600', to: 'to-orange-600', icon: Shield },
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-tb-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-tb-orange text-xs font-bold rounded-full uppercase tracking-wider mb-2">Trending</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-tb-navy">Popular Test Series</h2>
            <p className="text-sm text-tb-gray-500 mt-1">Most purchased test series this month</p>
          </div>
          <button onClick={() => onNavigate('/app/test-series')} className="hidden sm:flex items-center gap-1 text-sm font-medium text-tb-blue hover:text-tb-blue-dark">View All <ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.length > 0 ? tests.slice(0, 6).map((test, i) => {
            const gradient = gradientMap[test.category] || gradientMap.default;
            const Icon = gradient.icon;
            return (
              <div key={test._id || i} className="group relative h-full rounded-xl border border-orange-200 bg-white shadow-tb hover:shadow-tb-lg transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1">
                <div className="absolute left-0 top-0 z-10">
                  <div className="relative bg-tb-orange px-4 py-1.5 text-[11px] font-black uppercase tracking-wide text-white">
                    {test.isPremium ? 'Premium' : 'Popular'}
                    <span className="absolute right-[-14px] top-0 h-full w-4 bg-tb-orange [clip-path:polygon(0_0,100%_0,0_100%)]" />
                  </div>
                </div>
                <div onClick={() => onStartTest(test)} className="flex h-full flex-col">
                  <div className="p-4 pb-0">
                    <div className="relative mt-5 overflow-hidden rounded-lg bg-sky-100 px-5 py-8 text-center">
                      <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-white/20" />
                      <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient.from} ${gradient.to} shadow-md shadow-blue-500/15`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <p className="text-xl font-black uppercase tracking-wide text-blue-900 line-clamp-2">{test.category || 'Test Series'}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">Complete Practice Set</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-5">
                    <h3 className="text-lg font-bold text-tb-navy group-hover:text-tb-blue transition-colors line-clamp-2">{test.name}</h3>
                    <p className="text-sm text-tb-gray-500 mt-1.5 line-clamp-2 leading-relaxed min-h-[2.5rem]">{test.description || 'Practice with exam-style questions and track your performance.'}</p>
                    <div className="mt-5 space-y-3 text-sm text-tb-gray-600">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-tb-gray-400" />
                        <span className="line-clamp-1">{test.description || 'Practice questions for exam preparation'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-tb-gray-400" />
                        <span>{test.totalQuestions || test.questionCount || 0} Questions</span>
                        <Clock className="ml-2 h-4 w-4 text-tb-gray-400" />
                        <span>{test.duration || 0} min</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-6">
                      <div className="mb-4 h-px bg-tb-gray-100" />
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          {test.isFree || !test.isPremium ? (
                            <span className="text-xl font-black text-tb-blue">Free</span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-tb-navy">Rs {test.price || 0}</span>
                              {test.originalPrice > test.price && <span className="text-xs text-tb-gray-400 line-through">Rs {test.originalPrice}</span>}
                            </div>
                          )}
                          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-tb-gray-400">Plan starting from</p>
                        </div>
                        <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">Best Value</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={(event) => { event.stopPropagation(); onNavigate('/app/test-series'); }} className="rounded-lg border border-tb-blue px-4 py-3 text-sm font-bold text-tb-blue hover:bg-tb-blue-light active:scale-[0.98]">Explore</button>
                        <button onClick={(event) => { event.stopPropagation(); onStartTest(test); }} className="rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 active:scale-[0.98]">Start Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : !loading && (
            <div className="col-span-full text-center py-8 text-tb-gray-400">No tests available</div>
          )}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => onNavigate('/app/test-series')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-tb-blue to-indigo-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
            View All Test Series <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
