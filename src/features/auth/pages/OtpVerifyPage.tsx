import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Alert } from '@shared/components';
import BrandLogo from '@shared/components/BrandLogo';
import { useOtpVerify } from '../hooks';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, RefreshCw } from '@shared/icons';
import OtpInput from '@features/auth/components/OtpInput';
import ResendTimer from '@features/auth/components/ResendTimer';

const OtpVerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    otp,
    loading,
    error,
    resendTimer,
    canResend,
    handleChange: hookHandleChange,
    handleKeyDown: hookHandleKeyDown,
    handlePaste: hookHandlePaste,
    handleVerify: hookHandleVerify,
    handleResend: hookHandleResend,
  } = useOtpVerify(email);

  useEffect(() => {
    if (!email) {
      navigate('/app/auth/register');
      return;
    }
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    const result = hookHandleChange(index, value);
    if (result?.focusIndex !== undefined) {
      inputRefs.current[result.focusIndex]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const focusIndex = hookHandleKeyDown(index, e);
    if (focusIndex >= 0) {
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const focusIndex = hookHandlePaste(e);
    if (focusIndex >= 0) {
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    const success = await hookHandleVerify(e);
    if (success) {
      navigate('/app/auth/profile-setup', { state: { email } });
    }
  };

  const handleResend = async () => {
    await hookHandleResend();
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/app/auth/register')}
          className="flex items-center gap-2 text-tb-gray-500 hover:text-tb-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to register</span>
        </button>

        <BrandLogo className="flex items-center gap-1.5 mb-8" textClassName="text-xl font-bold bg-gradient-to-r from-tb-blue to-blue-700 bg-clip-text text-transparent" />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-tb-blue" />
            </div>
            <h1 className="text-2xl font-bold text-tb-navy">Verify your email</h1>
            <p className="mt-2 text-sm text-tb-gray-500">
              We sent a 6-digit code to <span className="font-semibold text-tb-navy">{maskedEmail}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {error && <Alert variant="danger" title="Verification Failed">{error}</Alert>}

            <OtpInput otp={otp} onChange={handleChange} onKeyDown={handleKeyDown} onPaste={handlePaste} inputRefs={inputRefs} />

            <Button type="submit" variant="primary" fullWidth isLoading={loading}>
              Verify OTP
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <ResendTimer canResend={canResend} resendTimer={resendTimer} onResend={handleResend} />


        </div>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
