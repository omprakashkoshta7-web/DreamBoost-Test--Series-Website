import {
  BookOpen, GraduationCap, Trophy,
} from '@shared/icons';

export const HowItWorksSection = () => (
  <section className="py-16 sm:py-20 bg-white border-t border-tb-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 text-xs font-bold rounded-full uppercase tracking-wider mb-3">Simple Steps</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-tb-navy">How It Works</h2>
        <p className="text-sm text-tb-gray-500 mt-2 max-w-md mx-auto">Start preparing in 3 simple steps</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-tb-blue via-tb-orange to-tb-green opacity-20" />
        {[
          { step: '01', icon: GraduationCap, title: 'Create Free Account', desc: 'Sign up in 30 seconds with email or phone' },
          { step: '02', icon: BookOpen, title: 'Choose Your Exam', desc: 'Select from 50+ exam categories' },
          { step: '03', icon: Trophy, title: 'Practice & Succeed', desc: 'Take tests, analyze performance, improve score' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="text-center relative">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-tb-blue to-blue-700 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
                  <Icon className="w-10 h-10" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-tb-orange text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg">{item.step}</span>
              </div>
              <h3 className="text-lg font-bold text-tb-navy mt-6 mb-2">{item.title}</h3>
              <p className="text-sm text-tb-gray-500">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
