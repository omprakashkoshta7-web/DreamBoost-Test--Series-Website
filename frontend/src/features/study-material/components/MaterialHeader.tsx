import React from 'react';
import { Badge } from '@shared/components';
import { BookOpen, Clock, User, CheckCircle, Crown, Lock, Star, Sparkles } from '@shared/icons';

interface MaterialHeaderProps {
  material: any;
  markedComplete: boolean;
  onMarkComplete: () => void;
}

const PLAN_META: Record<string, { icon: any; color: string }> = {
  basic: { icon: Star, color: 'from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50' },
  standard: { icon: Sparkles, color: 'from-purple-50 to-violet-50 text-purple-700 border-purple-200/50' },
  premium: { icon: Crown, color: 'from-amber-50 to-orange-50 text-amber-700 border-amber-200/50' },
};

const MaterialHeader: React.FC<MaterialHeaderProps> = ({ material, markedComplete, onMarkComplete }) => {
  const sub = typeof material.subject === 'object' ? material.subject : null;
  const pricing = material.pricing || { plan: 'free', price: 0, originalPrice: 0 };
  const planMeta = pricing.plan !== 'free' ? PLAN_META[pricing.plan] : null;
  const PlanIcon = planMeta?.icon;

  return (
    <div className="bg-white rounded-2xl border border-tb-gray-100 p-6">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-tb-blue-light flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-7 h-7 text-tb-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant="primary">{material.category}</Badge>
            {sub && <span className="text-xs text-tb-gray-400">{sub.name}</span>}
            {material.chapter && <span className="text-xs text-tb-gray-400">&bull; {material.chapter}</span>}
            {material.isLocked && !material.isPurchased && pricing.price > 0 && planMeta && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r ${planMeta.color} rounded-lg text-[10px] font-bold border`}>
                {PlanIcon && <PlanIcon className="w-3 h-3" />} ₹{pricing.price}
              </span>
            )}
            {material.isPurchased && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg text-[10px] font-bold border border-green-200/50">
                <Crown className="w-3 h-3" /> Purchased
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-tb-navy mt-1">{material.title}</h1>
          <p className="text-sm text-tb-gray-500 mt-2">{material.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-tb-gray-400">
            {material.duration > 0 && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{material.duration} min</span>}
            {material.author && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{material.author}</span>}
          </div>
        </div>
        <button onClick={onMarkComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${markedComplete ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-tb-blue text-white hover:bg-tb-blue-dark'}`}>
          <CheckCircle className="w-4 h-4" />{markedComplete ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
      {(material.progress?.progress ?? 0) > 0 && (
        <div className="mt-4 pt-4 border-t border-tb-gray-100">
          <div className="flex items-center justify-between text-xs text-tb-gray-500 mb-1.5">
            <span>Progress</span><span>{material.progress?.progress || 0}%</span>
          </div>
          <div className="w-full h-2 bg-tb-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-tb-blue rounded-full transition-all duration-500" style={{ width: `${material.progress?.progress || 0}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialHeader;
