import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@shared/components';
import { ArrowLeft, Check, Crown, Lock } from '@shared/icons';

interface LockedMaterialCardProps {
  material: any;
  pricing: any;
  planMeta: { label: string; color: string; features: string[] };
  discount: number;
  buying: boolean;
  onBuyClick: () => void;
}

export const LockedMaterialCard: React.FC<LockedMaterialCardProps> = ({
  material, pricing, planMeta, discount, buying, onBuyClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto mt-16 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-tb-gray-500 hover:text-tb-navy transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm font-medium">Back</span>
      </button>
      <Card className="text-center overflow-hidden">
        <div className={`bg-gradient-to-br ${planMeta.color} p-8 text-white relative`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-1">{planMeta.label} Plan</h2>
            <p className="text-white/70 text-sm">{material.title}</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-tb-navy">Rs {pricing.price}</p>
              {pricing.originalPrice > pricing.price && <p className="text-sm text-tb-gray-400 line-through">Rs {pricing.originalPrice}</p>}
              <p className="text-xs text-tb-gray-500 mt-1">One-time payment</p>
            </div>
            {discount > 0 && (
              <>
                <div className="w-px h-12 bg-tb-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{discount}%</p>
                  <p className="text-xs text-tb-gray-500">Discount</p>
                </div>
              </>
            )}
          </div>
          <div className="space-y-2 text-left text-sm text-tb-gray-600">
            {planMeta.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> {feature}
              </div>
            ))}
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={onBuyClick}>
            <Crown className="w-4 h-4" /> {buying ? 'QR bana rahe hain...' : `Buy Now - Rs ${pricing.price}`}
          </Button>
          <button onClick={() => navigate('/app/study-material')} className="text-sm text-tb-gray-500 hover:text-tb-navy transition-colors w-full">
            Browse Free Materials
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LockedMaterialCard;
