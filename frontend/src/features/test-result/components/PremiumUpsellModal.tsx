import React from 'react';
import { Modal, Button } from '@shared/components';
import { Crown } from '@shared/icons';

interface PremiumUpsellModalProps {
  showUpsell: boolean;
  onClose: () => void;
  result: any;
  onViewPlans: () => void;
}

const PremiumUpsellModal: React.FC<PremiumUpsellModalProps> = ({ showUpsell, onClose, result, onViewPlans }) => (
  <Modal isOpen={showUpsell} onClose={onClose} size="sm">
    <div className="text-center py-2">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
        <Crown className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-tb-navy dark:text-white mb-2">Unlock Full {result?.category || ''} Series</h3>
      <p className="text-sm text-tb-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        You've completed a free test in this category! Upgrade to unlock all premium tests, detailed solutions, and advanced analytics.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={onClose}>Maybe Later</Button>
        <Button variant="primary" onClick={onViewPlans}>
          <Crown className="w-4 h-4" /> View Plans
        </Button>
      </div>
    </div>
  </Modal>
);

export default PremiumUpsellModal;
