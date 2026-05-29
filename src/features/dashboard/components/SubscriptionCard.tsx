import React from 'react';
import { Card, Button } from '@shared/components';
import { Crown, Check, ArrowRight } from '@shared/icons';

interface SubscriptionCardProps {
  isPremium: boolean;
  plan?: string;
  endDate?: string;
  autoRenew?: boolean;
  features?: string[];
  onUpgrade: () => void;
  onRenew: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ isPremium, plan, endDate, autoRenew, features = [], onUpgrade, onRenew }) => {
  if (isPremium && plan) {
    return (
      <Card>
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-tb-navy">{plan} Plan Active</p>
              {endDate && <p className="text-xs text-tb-gray-500">Expires: {new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
              {autoRenew && <p className="text-xs text-tb-green">Auto-renew on</p>}
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full xl:w-auto whitespace-nowrap" onClick={onRenew}>Renew</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tb-blue to-indigo-600 flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-tb-navy">Unlock Full Access</p>
            <p className="text-xs text-tb-gray-500">Get premium tests, detailed analysis, and more</p>
          </div>
        </div>
        <Button variant="primary" size="sm" className="w-full xl:w-auto whitespace-nowrap" onClick={onUpgrade}>
          View Plans <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      {features.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-tb-gray-100">
          {features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-tb-gray-600">
              <Check className="w-3.5 h-3.5 text-tb-green flex-shrink-0" /> {f}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SubscriptionCard;
