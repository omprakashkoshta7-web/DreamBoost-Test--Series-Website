import React from 'react';
import AuthLoginStep from './AuthLoginStep';
import AuthRegisterStep from './AuthRegisterStep';
import AuthForgotStep from './AuthForgotStep';
import AuthOtpStep from './AuthOtpStep';
import AuthProfileSetupStep from './AuthProfileSetupStep';
import AuthModalSidebar from './AuthModalSidebar';
import AuthModalShell from './AuthModalShell';
import { useAuthModal } from './useAuthModal';
import type { AuthStep } from './useAuthModal';

const examOptions = [
  'SSC CGL', 'SSC CHSL', 'Banking PO', 'Banking Clerk', 'Railway NTPC',
  'UPSC Prelims', 'JEE Main', 'JEE Advanced', 'NEET', 'GATE',
  'CAT', 'Class 10', 'Class 12', 'Other',
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: AuthStep;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialStep = 'login' }) => {
  const {
    step, setStep, email, setEmail, name, setName, password, setPassword,
    confirmPassword, setConfirmPassword, showPassword, setShowPassword,
    agreeTerms, setAgreeTerms, errors, socialError, isVisible, setSocialError,
    auth, forgotPw, otpHook, profileSetup, strength, maskedEmail, showSidebar,
    handleClose, handleLogin, handleGoogleLogin, handleRegister,
    handleVerifyOTP, handleOtpChange, handleOtpKeyDown, handleOtpPaste,
    handleProfileSetup, onResetPassword,
  } = useAuthModal(isOpen, onClose, initialStep);

  if (!isOpen) return null;

  const content = (() => {
    switch (step) {
      case 'login':
        return <AuthLoginStep email={email} onEmailChange={setEmail} password={password} onPasswordChange={setPassword} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} authError={auth.error} socialError={socialError} onCloseAuthError={() => {}} onCloseSocialError={() => setSocialError('')} loading={auth.loading} onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} onForgotPassword={() => { forgotPw.setEmail(email); forgotPw.setStep('email'); setStep('forgot-password'); }} onSwitchToRegister={() => setStep('register')} />;
      case 'register':
        return <AuthRegisterStep name={name} onNameChange={setName} email={email} onEmailChange={setEmail} password={password} onPasswordChange={setPassword} confirmPassword={confirmPassword} onConfirmPasswordChange={setConfirmPassword} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} agreeTerms={agreeTerms} onAgreeTermsChange={setAgreeTerms} errors={errors} strength={strength} authError={auth.error} onCloseAuthError={() => {}} loading={auth.loading} onRegister={handleRegister} onSwitchToLogin={() => setStep('login')} />;
      case 'forgot-password': case 'forgot-code': case 'forgot-reset':
        return <AuthForgotStep currentStep={step} forgotPw={forgotPw} onBackToLogin={() => setStep('login')} onResetPassword={onResetPassword} />;
      default: return null;
    }
  })();

  const standaloneContent = step === 'otp-verify' ? (
    <AuthOtpStep otp={otpHook.otp} maskedEmail={maskedEmail} loading={otpHook.loading} error={otpHook.error} canResend={otpHook.canResend} resendTimer={otpHook.resendTimer} onVerifyOTP={handleVerifyOTP} onResendOTP={() => otpHook.handleResend()} onOtpChange={handleOtpChange} onOtpKeyDown={handleOtpKeyDown} onOtpPaste={handleOtpPaste} />
  ) : (
    <AuthProfileSetupStep name={name} profile={profileSetup.profile} loading={profileSetup.loading} error={profileSetup.error} errors={profileSetup.errors} examOptions={examOptions} onSetField={(field, value) => profileSetup.setField(field as any, value)} onSubmit={handleProfileSetup} />
  );

  return (
    <AuthModalShell isVisible={isVisible} onClose={handleClose} showSidebar={showSidebar} sidebar={<AuthModalSidebar step={step} />}>
      {showSidebar ? content : standaloneContent}
    </AuthModalShell>
  );
};

export default AuthModal;
