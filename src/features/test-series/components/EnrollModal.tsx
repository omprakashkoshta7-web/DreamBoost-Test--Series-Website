import React, { useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { selectAuthUser } from '@features/auth/store/auth.selectors';
import { Modal, Loader } from '@shared/components';
import { BookOpen, Clock, HelpCircle, Target, X, Check, Shield, ChevronRight, Sparkles } from '@shared/icons';

interface EnrollModalProps {
  test: any;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const EnrollModal: React.FC<EnrollModalProps> = ({ test, onClose, onConfirm, loading }) => {
  const user = useAppSelector(selectAuthUser);
  const [agreed, setAgreed] = useState(false);
  const quesCount = test?.questionCount || test?.totalQuestions || 0;

  return (
    <Modal isOpen={!!test} onClose={onClose} size="md" closeButton={false}>
      <div className="bg-gradient-to-br from-tb-blue via-blue-600 to-indigo-600 -mx-6 -mt-5 px-6 pt-6 pb-14">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Enroll Now</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <h3 className="text-white/90 text-sm mt-3 font-medium">{test?.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white/90">{test?.category}</span>
          {test?.subject && <span className="text-[10px] text-white/60">{test.subject}</span>}
        </div>
      </div>

      <div className="-mx-6 px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl border border-tb-gray-100 shadow-sm p-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <HelpCircle className="w-4 h-4 text-tb-blue mx-auto mb-1" />
            <p className="text-[10px] text-tb-gray-500">Questions</p>
            <p className="text-sm font-bold text-tb-navy">{quesCount}</p>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-tb-blue mx-auto mb-1" />
            <p className="text-[10px] text-tb-gray-500">Duration</p>
            <p className="text-sm font-bold text-tb-navy">{test?.duration} min</p>
          </div>
          <div className="text-center">
            <Target className="w-4 h-4 text-tb-blue mx-auto mb-1" />
            <p className="text-[10px] text-tb-gray-500">Marks</p>
            <p className="text-sm font-bold text-tb-navy">{test?.totalMarks || quesCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div>
          <label className="text-xs font-semibold text-tb-gray-600 mb-1.5 block">Your Name</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-tb-gray-50 rounded-xl border border-tb-gray-100">
            <BookOpen className="w-4 h-4 text-tb-gray-400" />
            <span className="text-sm text-tb-navy">{user?.name || 'User'}</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-tb-gray-600 mb-1.5 block">Email</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-tb-gray-50 rounded-xl border border-tb-gray-100">
            <BookOpen className="w-4 h-4 text-tb-gray-400" />
            <span className="text-sm text-tb-gray-600">{user?.email || '—'}</span>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              agreed ? 'bg-tb-blue border-tb-blue' : 'border-tb-gray-300 group-hover:border-tb-blue'
            }`}>
            {agreed && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-xs text-tb-gray-500 leading-relaxed">
            I agree to the <span className="text-tb-blue font-medium">terms and conditions</span> and confirm that I will attempt this test honestly.
          </span>
        </label>

        <button onClick={onConfirm} disabled={!agreed || loading}
          className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            agreed && !loading
              ? 'bg-gradient-to-r from-tb-blue to-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-tb-gray-100 text-tb-gray-400 cursor-not-allowed'
          }`}>
          {loading ? (
            <Loader size="sm" />
          ) : (
            <><Shield className="w-4 h-4" /> Enroll & Start Test <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default EnrollModal;
