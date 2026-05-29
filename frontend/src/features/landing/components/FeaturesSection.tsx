import {
  BarChart3, BookOpen, FileText, ShieldCheck, Sparkles, Trophy, Zap,
} from '@shared/icons';

export const FeaturesSection = () => (
  <section id="features" className="relative py-20 sm:py-28 overflow-hidden bg-white border-t border-tb-gray-100">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-tb-blue/5 via-tb-blue/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-tb-orange/5 via-tb-orange/10 to-transparent rounded-full blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center mb-14 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-tb-green text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-green-200/50 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-tb-navy tracking-tight">
          Why Choose <span className="bg-gradient-to-r from-tb-blue to-tb-orange bg-clip-text text-transparent">DreamBoost</span>?
        </h2>
        <p className="text-base sm:text-lg text-tb-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          Everything you need to crack your exam, curated content, smart analytics, and expert guidance under one roof.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[
          { icon: BookOpen, title: '500+ Test Series', desc: 'Comprehensive tests designed by subject experts covering all major competitive exams with real exam pattern simulation.', color: 'from-blue-500 to-blue-600', border: 'border-blue-100 hover:border-blue-200' },
          { icon: BarChart3, title: 'In-Depth Analysis', desc: 'Smart performance analytics with strength-weakness mapping, topic-wise breakdown, and personalized improvement tips.', color: 'from-emerald-500 to-green-600', border: 'border-emerald-100 hover:border-emerald-200' },
          { icon: Trophy, title: 'All India Ranking', desc: 'Compete with lakhs of students across the country. Know your rank, percentile, and benchmark your preparation.', color: 'from-orange-500 to-orange-600', border: 'border-orange-100 hover:border-orange-200' },
          { icon: Zap, title: 'Instant Results', desc: 'Get detailed results immediately after each test with question-wise analysis, time management insights, and accuracy trends.', color: 'from-purple-500 to-purple-600', border: 'border-purple-100 hover:border-purple-200' },
          { icon: FileText, title: 'Previous Year Papers', desc: 'Practice with curated previous year question papers from SSC, Banking, Railways, UPSC, and 50+ other exam categories.', color: 'from-red-500 to-rose-600', border: 'border-red-100 hover:border-red-200' },
          { icon: ShieldCheck, title: 'Expert Solutions', desc: 'Every question comes with a detailed step-by-step solution explained by subject matter experts to strengthen concepts.', color: 'from-cyan-500 to-teal-600', border: 'border-cyan-100 hover:border-cyan-200' },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className={`card p-7 border ${feature.border} hover:shadow-tb-lg hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-tb-navy mb-2">{feature.title}</h3>
              <p className="text-sm text-tb-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
