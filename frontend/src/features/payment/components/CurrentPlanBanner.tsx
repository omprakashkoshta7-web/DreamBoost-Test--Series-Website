import React from 'react';
import { Badge } from '@shared/components';
import { Crown } from '@shared/icons';

interface CurrentPlanBannerProps {
  planLabel: string;
  planEndDate: string | null;
  currentPlan: any;
}

const CurrentPlanBanner: React.FC<CurrentPlanBannerProps> = ({ planLabel, planEndDate, currentPlan }) => {
  return (
    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg"><Crown className="w-5 h-5 text-tb-blue" /></div>
          <div><p className="font-semibold text-tb-navy">Current Plan: {planLabel}</p>{planEndDate && <p className="text-sm text-tb-gray-500">Expires: {planEndDate}</p>}</div>
        </div>
        <Badge variant={currentPlan?.plan ? 'success' : 'warning'}>{currentPlan?.plan ? 'Active' : 'Free Tier'}</Badge>
      </div>
    </div>
  );
};

export default CurrentPlanBanner;
