import React from 'react';
import { Card, Button } from '@shared/components';
import { ArrowRight } from '@shared/icons';

interface TestAgreementFooterProps {
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
  onStart: () => void;
}

const TestAgreementFooter: React.FC<TestAgreementFooterProps> = ({ agreed, onAgreedChange, onStart }) => (
  <Card>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={agreed} onChange={(e) => onAgreedChange(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-gray-300 text-tb-blue focus:ring-tb-blue" />
        <span className="text-sm text-tb-gray-700">I have read all instructions and agree to follow them.</span>
      </label>
      <Button variant="primary" size="lg" disabled={!agreed} onClick={onStart} className="flex-shrink-0">
        Start Test <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  </Card>
);

export default TestAgreementFooter;
