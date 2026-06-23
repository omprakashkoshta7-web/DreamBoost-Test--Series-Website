import React from 'react';
import SEO from '@shared/components/SEO';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '@shared/components';
import BrandLogo from '@shared/components/BrandLogo';
import { useForgotPassword } from '../hooks';
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from '@shared/icons';
import ForgotPasswordStepHeader from '@features/auth/components/ForgotPasswordStepHeader';
import EmailSentConfirmation from '@features/auth/components/EmailSentConfirmation';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    step, email, code, newPassword, confirmPassword,
    loading, error, maskedEmail,
    setEmail, setCode, setNewPassword, setConfirmPassword, setStep,
    handleSendCode, handleVerifyCode, handleResetPassword: hookHandleResetPassword
  } = useForgotPassword();

  const handleResetPassword = async (e: React.FormEvent) => {
    const success = await hookHandleResetPassword(e);
    if (success) {
      navigate('/?auth=login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center px-4 py-12">
      <SEO title="Forgot Password" description="Reset your DreamBoost account password." />
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" onClick={() => navigate('/?auth=login')} className="mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Button>

        <BrandLogo className="flex items-center gap-1.5 mb-8" textClassName="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {step === 'email' && (
            <>
              <ForgotPasswordStepHeader title="Forgot password?" description="No worries, we'll send you reset instructions." />
              <form onSubmit={handleSendCode} className="space-y-5">
                {error && <Alert variant="danger" title="Error">{error}</Alert>}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" variant="primary" fullWidth isLoading={loading}>
                  Send Reset Code
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {step === 'sent' && (
            <>
              <EmailSentConfirmation maskedEmail={maskedEmail} />
              <form onSubmit={handleVerifyCode} className="space-y-5">
                {error && <Alert variant="danger" title="Error">{error}</Alert>}
                <Input
                  label="Verification Code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); }}
                  maxLength={6}
                  required
                />
                <Button type="submit" variant="primary" fullWidth isLoading={loading}>
                  Verify Code
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" fullWidth type="button" onClick={() => setStep('email')}>Change email address</Button>
              </form>
            </>
          )}

          {step === 'reset' && (
            <>
              <ForgotPasswordStepHeader title="Set new password" description="Your new password must be different from previous passwords." />
              <form onSubmit={handleResetPassword} className="space-y-5">
                {error && <Alert variant="danger" title="Error">{error}</Alert>}
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Create a password"
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); }}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); }}
                  required
                />
                <Button type="submit" variant="primary" fullWidth isLoading={loading}>
                  Reset Password
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}


        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
