import React from 'react';
import { Button, Card } from '@shared/components';
import { Lock, Crown } from '@shared/icons';

interface LockedTestCardProps {
  test: any;
  onUnlock: () => void;
  onBrowseFree: () => void;
}

const LockedTestCard: React.FC<LockedTestCardProps> = ({ test, onUnlock, onBrowseFree }) => (
  <div className="max-w-lg mx-auto mt-16">
    <Card className="text-center">
      <div className="p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-tb-navy mb-2">Premium Test</h2>
        <p className="text-sm text-tb-gray-500 mb-1">{test.name}</p>
        <p className="text-sm text-tb-gray-400 mb-6">Subscribe to unlock this premium test and access all questions.</p>
        <div className="flex items-center justify-center gap-6 mb-6 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-tb-navy">{test.totalQuestions || 0}</p>
            <p className="text-xs text-tb-gray-500">Questions</p>
          </div>
          <div className="w-px h-10 bg-tb-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-tb-navy">{test.duration || 0}</p>
            <p className="text-xs text-tb-gray-500">Minutes</p>
          </div>
          <div className="w-px h-10 bg-tb-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">₹{test.price || 0}</p>
            <p className="text-xs text-tb-gray-500">Price</p>
          </div>
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={onUnlock}>
          <Crown className="w-4 h-4" /> Unlock Now
        </Button>
        <Button variant="ghost" size="sm" onClick={onBrowseFree} className="mt-3">Browse Free Tests</Button>
      </div>
    </Card>
  </div>
);

export default LockedTestCard;
