import { Alert, Button, Input } from '@shared/components';
import { ArrowRight, CheckCircle, Lock, Mail } from '@shared/icons';

interface AuthForgotStepProps {
  currentStep: 'forgot-password' | 'forgot-code' | 'forgot-reset';
  forgotPw: {
    email: string;
    setEmail: (value: string) => void;
    code: string;
    setCode: (value: string) => void;
    newPassword: string;
    setNewPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    loading: boolean;
    error: string | null;
    maskedEmail: string;
    handleSendCode: (e: React.FormEvent) => Promise<void>;
    handleVerifyCode: (e: React.FormEvent) => Promise<void>;
    handleResetPassword: (e: React.FormEvent) => Promise<boolean | undefined>;
  };
  onBackToLogin: () => void;
  onResetPassword: (e: React.FormEvent) => void;
}

const AuthForgotStep = ({ currentStep, forgotPw, onBackToLogin, onResetPassword }: AuthForgotStepProps) => {
  if (currentStep === 'forgot-password') {
    return (
      <>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
            <Mail className="w-7 h-7 text-tb-blue" />
          </div>
          <h2 className="text-2xl font-bold text-tb-navy">Forgot password?</h2>
          <p className="text-sm text-tb-gray-500 mt-1">No worries, we'll send you reset instructions.</p>
        </div>

        {forgotPw.error && <Alert variant="danger" title="Error">{forgotPw.error}</Alert>}

        <form onSubmit={forgotPw.handleSendCode} className="space-y-4">
          <Input label="Email Address" type="email" placeholder="you@example.com" value={forgotPw.email} onChange={(e) => forgotPw.setEmail(e.target.value)} icon={<Mail className="w-4 h-4" />} required />
          <Button type="submit" variant="primary" fullWidth isLoading={forgotPw.loading} className="py-3">
            Send Reset Code <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-tb-gray-500 mt-6">
          <Button variant="ghost" size="sm" onClick={onBackToLogin}>← Back to Login</Button>
        </p>
      </>
    );
  }

  if (currentStep === 'forgot-code') {
    return (
      <>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl mb-4">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-tb-navy">Check your email</h2>
          <p className="text-sm text-tb-gray-500 mt-1">We've sent a 6-digit code to <span className="font-semibold text-tb-navy">{forgotPw.maskedEmail}</span></p>
        </div>

        {forgotPw.error && <Alert variant="danger" title="Error">{forgotPw.error}</Alert>}

        <form onSubmit={forgotPw.handleVerifyCode} className="space-y-4">
          <Input label="Verification Code" type="text" placeholder="123456" value={forgotPw.code} onChange={(e) => forgotPw.setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength={6} required />
          <Button type="submit" variant="primary" fullWidth isLoading={forgotPw.loading} className="py-3">
            Verify Code <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl mb-4">
          <Lock className="w-7 h-7 text-tb-orange" />
        </div>
        <h2 className="text-2xl font-bold text-tb-navy">Set new password</h2>
        <p className="text-sm text-tb-gray-500 mt-1">Your new password must be different from previous passwords.</p>
      </div>

      {forgotPw.error && <Alert variant="danger" title="Error">{forgotPw.error}</Alert>}

      <form onSubmit={onResetPassword} className="space-y-4">
        <Input label="New Password" type="password" placeholder="Create a password" value={forgotPw.newPassword} onChange={(e) => forgotPw.setNewPassword(e.target.value)} icon={<Lock className="w-4 h-4" />} required />
        <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={forgotPw.confirmPassword} onChange={(e) => forgotPw.setConfirmPassword(e.target.value)} icon={<Lock className="w-4 h-4" />} required />
        <Button type="submit" variant="primary" fullWidth isLoading={forgotPw.loading} className="py-3">
          Reset Password <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </>
  );
};

export default AuthForgotStep;
