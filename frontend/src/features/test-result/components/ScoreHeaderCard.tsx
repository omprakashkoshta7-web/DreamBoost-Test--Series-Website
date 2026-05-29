import React from 'react';

interface ScoreHeaderCardProps {
  score: number;
  totalMarks: number;
}

const ScoreHeaderCard: React.FC<ScoreHeaderCardProps> = ({ score, totalMarks }) => {
  return (
    <div className="rounded-2xl border border-sky-200 bg-white px-5 py-5 shadow-[0_1px_0_rgba(59,130,246,0.05)] sm:px-7 sm:py-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-900">SCORE</p>
          <div className="mt-4 flex items-end gap-1.5">
            <span className="text-5xl font-black leading-none text-[#0f5b8f] sm:text-6xl">{score}</span>
            <span className="pb-1 text-xl font-semibold leading-none text-slate-900 sm:text-3xl">/{totalMarks || 0}</span>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <svg className="h-28 w-28 sm:h-32 sm:w-32" viewBox="0 0 120 120" role="img" aria-label="Test result chart illustration">
            <rect x="16" y="68" width="12" height="36" fill="#9ae6c2" rx="1.5" />
            <rect x="38" y="50" width="12" height="54" fill="#8ecaf9" rx="1.5" />
            <rect x="60" y="58" width="12" height="46" fill="#f8dd72" rx="1.5" />
            <rect x="82" y="42" width="12" height="62" fill="#fb8d88" rx="1.5" />
            <path d="M20 34 L42 18 L66 35 L90 22" fill="none" stroke="#4c6287" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="34" r="5" fill="#9ae6c2" />
            <circle cx="42" cy="18" r="5" fill="#8ecaf9" />
            <circle cx="66" cy="35" r="5" fill="#f8dd72" />
            <circle cx="90" cy="22" r="5" fill="#fb8d88" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScoreHeaderCard;
