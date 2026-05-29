import React from 'react';
import { Modal, Button } from '@shared/components';
import { Flame, Star, Smile } from '@shared/icons';

interface StreakPopupModalProps {
  showStreakPopup: boolean;
  onClose: () => void;
  result: any;
}

const StreakPopupModal: React.FC<StreakPopupModalProps> = ({ showStreakPopup, onClose, result }) => (
  <Modal isOpen={showStreakPopup} onClose={onClose} size="sm">
    <div className="relative overflow-hidden rounded-2xl bg-white px-5 py-7 text-center">
      <div className="pointer-events-none absolute inset-0">
        <Star className="streak-star streak-star-one absolute h-5 w-5 fill-amber-300 text-amber-300" />
        <Star className="streak-star streak-star-two absolute h-4 w-4 fill-orange-300 text-orange-300" />
        <Star className="streak-star streak-star-three absolute h-6 w-6 fill-yellow-300 text-yellow-300" />
      </div>

      <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-orange-200 streak-pulse" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 shadow-xl shadow-orange-500/25">
          <Flame className="h-10 w-10 text-white streak-flame" />
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
          <Smile className="h-5 w-5 text-amber-500" />
        </div>
      </div>

      <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Daily Streak</p>
      <h3 className="mt-2 text-3xl font-black text-tb-navy">{result?.streak?.current || 1} Day Streak!</h3>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-tb-gray-500">
        {result?.streak?.message || 'Nice work! Your daily test streak has been counted.'}
      </p>

      <div className="mt-6 rounded-2xl bg-orange-50 px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-orange-700">
          <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-bold">Come back tomorrow and keep it alive</span>
        </div>
      </div>

      <Button variant="orange" fullWidth className="mt-6" onClick={onClose}>
        Awesome
      </Button>
    </div>
  </Modal>
);

export default StreakPopupModal;
