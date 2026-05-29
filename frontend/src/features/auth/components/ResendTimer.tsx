import React from 'react';
import { RefreshCw } from '@shared/icons';

interface ResendTimerProps {
  canResend: boolean;
  resendTimer: number;
  onResend: () => void;
}

const ResendTimer: React.FC<ResendTimerProps> = ({ canResend, resendTimer, onResend }) => {
  return (
    <div className="mt-6 text-center">
      {canResend ? (
        <button
          onClick={onResend}
          className="flex items-center justify-center gap-2 mx-auto text-sm text-tb-blue font-medium hover:text-tb-blue-dark"
        >
          <RefreshCw className="w-4 h-4" />
          Resend OTP
        </button>
      ) : (
        <p className="text-sm text-tb-gray-500">
          Resend code in <span className="font-semibold text-tb-navy">{resendTimer}s</span>
        </p>
      )}
    </div>
  );
};

export default ResendTimer;
