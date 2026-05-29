import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Crown, Star, Sparkles } from '@shared/icons';

interface MaterialCardProps {
  material: any;
}

const PLAN_ICONS: Record<string, any> = {
  basic: Star, standard: Sparkles, premium: Crown,
};
const PLAN_COLORS: Record<string, string> = {
  basic: 'from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50',
  standard: 'from-purple-50 to-violet-50 text-purple-700 border-purple-200/50',
  premium: 'from-amber-50 to-orange-50 text-amber-700 border-amber-200/50',
};

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const navigate = useNavigate();
  const sub = typeof material.subject === 'object' ? material.subject : null;
  const pricing = material.pricing || { plan: 'free', price: 0, originalPrice: 0 };
  const isPaid = pricing.price > 0;
  const PlanIcon = isPaid ? (PLAN_ICONS[pricing.plan] || Crown) : null;

  return (
    <div onClick={() => navigate(`/app/study-material/view/${material.id}`)}
      className="bg-white rounded-xl border border-tb-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2 py-0.5 bg-tb-blue-light text-tb-blue rounded-full capitalize">{material.category}</span>
        {material.duration > 0 && <span className="text-xs text-tb-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{material.duration}m</span>}
      </div>
      {isPaid && PlanIcon && (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r ${PLAN_COLORS[pricing.plan] || PLAN_COLORS.premium} rounded-lg text-[10px] font-bold border float-right`}>
          <PlanIcon className="w-3 h-3" /> ₹{pricing.price}
        </span>
      )}
      <h3 className="font-semibold text-tb-navy text-sm line-clamp-2">{material.title}</h3>
      {sub && <p className="text-xs text-tb-gray-400 mt-1">{sub.name}</p>}
      {material.author && <p className="text-xs text-tb-gray-400 mt-0.5">by {material.author}</p>}
    </div>
  );
};

export default MaterialCard;
