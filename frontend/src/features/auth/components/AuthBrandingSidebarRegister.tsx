import BrandLogo from '@shared/components/BrandLogo';
import { Check } from '@shared/icons';

const AuthBrandingSidebarRegister: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      <div className="relative z-10 flex flex-col justify-center px-12 text-white">
        <BrandLogo className="flex items-center gap-1.5 mb-8" textClassName="text-2xl font-bold" />
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Start your learning<br />journey today
        </h1>
        <p className="text-lg text-blue-100 mb-8 max-w-md">
          Join thousands of students achieving their goals with our comprehensive test series.
        </p>
        <div className="space-y-4">
          {['Free access to 10+ tests', 'Detailed performance analytics', 'Compete on global leaderboard'].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-blue-100">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthBrandingSidebarRegister;
