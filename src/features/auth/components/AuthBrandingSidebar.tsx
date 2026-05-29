import BrandLogo from '@shared/components/BrandLogo';

const AuthBrandingSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      <div className="relative z-10 flex flex-col justify-center px-12 text-white">
        <BrandLogo className="flex items-center gap-1.5 mb-8" textClassName="text-2xl font-bold" />
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Welcome back to your<br />learning journey
        </h1>
        <p className="text-lg text-blue-100 mb-8 max-w-md">
          Access your test series, track progress, and continue improving your skills.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'].map((color, i) => (
              <div key={i} className={`w-10 h-10 ${color} rounded-full border-2 border-white flex items-center justify-center text-xs font-bold`}>
                {['AK', 'SM', 'RJ', 'PD'][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-100">
            <span className="font-semibold text-white">10,000+</span> students learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthBrandingSidebar;
