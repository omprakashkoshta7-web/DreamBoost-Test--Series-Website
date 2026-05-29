import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck } from '@shared/icons';

const ProTipCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-tb-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-tb-navy">Track Your Progress</p>
            <p className="text-xs text-tb-gray-500 mt-1">Review detailed analytics after each test to identify strengths and areas for improvement.</p>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/app/dashboard')} className="bg-white rounded-xl border border-tb-gray-100 p-5 hover:shadow-md transition-shadow text-left">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-tb-blue-light flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-tb-blue" />
            </div>
            <div>
              <p className="text-sm font-bold text-tb-navy">My Dashboard</p>
              <p className="text-xs text-tb-gray-500 mt-1">View your test history, scores, and overall performance at a glance.</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-tb-gray-400 flex-shrink-0 mt-1" />
        </div>
      </button>
    </div>
  );
};

export default ProTipCard;
