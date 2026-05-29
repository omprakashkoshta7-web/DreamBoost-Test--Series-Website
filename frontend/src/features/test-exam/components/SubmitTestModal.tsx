import React from 'react';
import { Modal, Button } from '@shared/components';
import { Send, AlertCircle } from '@shared/icons';

interface Section {
  name: string;
  questions: any[];
}

interface SubmitTestModalProps {
  showSubmitModal: boolean;
  onClose: () => void;
  answers: Record<string, number>;
  totalQuestions: number;
  onSubmit: () => void;
  sections?: Section[];
}

const SubmitTestModal: React.FC<SubmitTestModalProps> = ({ showSubmitModal, onClose, answers, totalQuestions, onSubmit, sections }) => {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  return (
    <Modal isOpen={showSubmitModal} onClose={onClose} title="Submit Test?" size="sm">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-tb-gray-50 rounded-lg"><p className="text-tb-gray-500">Answered</p><p className="text-xl font-bold text-tb-green">{answeredCount}/{totalQuestions}</p></div>
          <div className="p-3 bg-tb-gray-50 rounded-lg"><p className="text-tb-gray-500">Unanswered</p><p className="text-xl font-bold text-tb-red">{unansweredCount}</p></div>
        </div>
        {sections && sections.length > 1 && (
          <div className="space-y-1.5 text-sm">
            <p className="text-xs font-semibold text-tb-gray-500">Section Progress</p>
            {sections.map((sec) => {
              const secQs = Array.isArray(sec.questions) ? sec.questions : [];
              const secAns = secQs.filter((q: any) => answers[q._id] !== undefined).length;
              return (
                <div key={sec.name} className="flex items-center justify-between p-2 rounded-lg bg-tb-gray-50">
                  <span className="text-xs font-medium text-tb-navy">{sec.name}</span>
                  <span className="text-xs font-bold">{secAns}/{secQs.length}</span>
                </div>
              );
            })}
          </div>
        )}
        {unansweredCount > 0 && <p className="text-sm text-amber-600 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{unansweredCount} unanswered</p>}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>Go Back</Button>
          <Button variant="primary" onClick={onSubmit}><Send className="w-4 h-4" /> Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitTestModal;
