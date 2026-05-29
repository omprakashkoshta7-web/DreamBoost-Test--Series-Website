import { Alert, Button } from '@shared/components';
import { ArrowRight, Mail, RefreshCw } from '@shared/icons';

interface AuthOtpStepProps {
  otp: string[];
  maskedEmail: string;
  loading: boolean;
  error: string | null;
  canResend: boolean;
  resendTimer: number;
  onVerifyOTP: (e: React.FormEvent) => void;
  onResendOTP: () => void;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onOtpPaste: (e: React.ClipboardEvent) => void;
}

const AuthOtpStep = ({
  otp, maskedEmail, loading, error, canResend, resendTimer,
  onVerifyOTP, onResendOTP, onOtpChange, onOtpKeyDown, onOtpPaste,
}: AuthOtpStepProps) => (
  <div className="p-8">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4">
        <Mail className="w-10 h-10 text-tb-blue" />
      </div>
      <h2 className="text-2xl font-bold text-tb-navy">Verify your email</h2>
      <p className="text-sm text-tb-gray-500 mt-2">We sent a 6-digit code to <span className="font-semibold text-tb-navy">{maskedEmail}</span></p>
    </div>

    {error && <Alert variant="danger" title="Verification Failed">{error}</Alert>}

    <form onSubmit={onVerifyOTP} className="space-y-6">
      <div className="flex justify-center gap-3" onPaste={onOtpPaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onOtpChange(index, e.target.value)}
            onKeyDown={(e) => onOtpKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-tb-gray-200 rounded-xl focus:border-tb-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        ))}
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={loading} className="py-3">
        Verify OTP <ArrowRight className="w-4 h-4" />
      </Button>
    </form>

    <div className="mt-6 text-center">
      {canResend ? (
        <Button variant="ghost" size="sm" onClick={onResendOTP}><RefreshCw className="w-4 h-4" /> Resend OTP</Button>
      ) : (
        <p className="text-sm text-tb-gray-500">Resend code in <span className="font-semibold text-tb-navy">{resendTimer}s</span></p>
      )}
    </div>
  </div>
);

export default AuthOtpStep;
