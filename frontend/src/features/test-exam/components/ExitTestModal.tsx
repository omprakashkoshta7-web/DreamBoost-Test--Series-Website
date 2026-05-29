import React from 'react';
import { Modal, Button } from '@shared/components';
import { AlertCircle } from '@shared/icons';

interface ExitTestModalProps {
  showExitModal: boolean;
  onClose: () => void;
  onExit: () => void;
}

const ExitTestModal: React.FC<ExitTestModalProps> = ({ showExitModal, onClose, onExit }) => (
  <Modal isOpen={showExitModal} onClose={onClose} title="Exit Test?" size="sm">
    <div className="text-center">
      <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
      <p className="text-tb-gray-600 mb-6">Are you sure you want to exit? Your progress will be lost.</p>
      <div className="flex gap-3 justify-center">
        <Button variant="secondary" onClick={onClose}>Continue</Button>
        <Button variant="danger" onClick={onExit}>Exit</Button>
      </div>
    </div>
  </Modal>
);

export default ExitTestModal;
