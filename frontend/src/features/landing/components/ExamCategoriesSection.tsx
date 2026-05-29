import {
  BookOpen, Building2, FileText, TrainFront, School, Shield, Atom, Stethoscope, Landmark,
  Gavel, BriefcaseBusiness, GraduationCap, Calculator, ChevronRight,
} from '@shared/icons';

type NavigateHandler = (path: string) => void;
type AuthHandler = (step: 'login' | 'register') => void;

const categoryIconMap: Record<string, React.ComponentType<any>> = {
  FileText, Building2, TrainFront, School, Shield, Atom, Stethoscope, Landmark,
  Gavel, BriefcaseBusiness, GraduationCap, Calculator, BookOpen,
};

const colorMap: Record<string, string> = {
  'from-blue-500 to-blue-600': 'bg-blue-50',
  'from-green-500 to-emerald-600': 'bg-green-50',
  'from-orange-500 to-orange-600': 'bg-orange-50',
  'from-purple-500 to-purple-600': 'bg-purple-50',
  'from-red-500 to-red-600': 'bg-red-50',
  'from-cyan-500 to-cyan-600': 'bg-cyan-50',
  'from-rose-500 to-rose-600': 'bg-rose-50',
  'from-amber-500 to-amber-600': 'bg-amber-50',
  'from-indigo-500 to-indigo-600': 'bg-indigo-50',
  'from-teal-500 to-teal-600': 'bg-teal-50',
  'from-pink-500 to-pink-600': 'bg-pink-50',
  'from-violet-500 to-violet-600': 'bg-violet-50',
};

export const ExamCategoriesSection = ({
  categories,
  loading,
  isAuthenticated,
  onNavigate,
  onOpenAuth,
}: {
  categories: any[];
  loading: boolean;
  isAuthenticated: boolean;
  onNavigate: NavigateHandler;
  onOpenAuth: AuthHandler;
}) => (
  <section id="exams" className="py-16 sm:py-20 bg-white border-t border-tb-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-tb-blue text-xs font-bold rounded-full uppercase tracking-wider mb-3">Exam Categories</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-tb-navy">Popular Exam Categories</h2>
        <p className="text-sm text-tb-gray-500 mt-2 max-w-md mx-auto">Choose from 50+ exam categories and start your preparation today</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.length > 0 ? categories.map((cat, i) => {
          const Icon = categoryIconMap[cat.icon] || BookOpen;
          const lightBg = colorMap[cat.color] || 'bg-blue-50';
          const textColor = cat.color?.replace('from-', 'text-')?.split(' ')[0] || 'text-blue-600';
          return (
            <button
              key={cat._id || i}
              onClick={() => isAuthenticated ? onNavigate(`/app/exam-categories/${cat.slug}`) : onOpenAuth('register')}
              className="group relative h-[162px] bg-white rounded-2xl border border-tb-gray-200 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 h-full">
                {cat.image ? (
                  <div className="p-5 text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl overflow-hidden border border-blue-200 bg-tb-blue shadow-sm group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-2" loading="lazy" />
                    </div>
                    <h3 className="text-sm font-bold text-tb-navy group-hover:text-white transition-colors duration-300 mt-3">{cat.name}</h3>
                  </div>
                ) : (
                  <div className="p-5 text-center">
                    <div className={`w-14 h-14 mx-auto rounded-xl ${lightBg} ${textColor} flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-sm font-bold text-tb-navy group-hover:text-white transition-colors duration-300">{cat.name}</h3>
                  </div>
                )}
              </div>
            </button>
          );
        }) : !loading && (
          <div className="col-span-full text-center py-8 text-tb-gray-400">No categories available</div>
        )}
      </div>

      <div className="text-center mt-10">
        <button onClick={() => onNavigate(isAuthenticated ? '/app/exam-categories' : '/app/auth/register')} className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-tb-gray-200 rounded-xl text-sm font-semibold text-tb-navy hover:border-tb-blue hover:text-tb-blue hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          View All Exams <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
);
