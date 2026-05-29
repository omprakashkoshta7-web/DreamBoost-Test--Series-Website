import { useState, useEffect } from 'react';
import { useAppDispatch } from '@store/hooks';
import { googleLoginUser, sendOTP } from '@features/auth/store/auth.thunks';
import { useAuth, useForgotPassword, useOtpVerify, useProfileSetup } from '@features/auth/hooks';
import { getGoogleAccessToken } from '@features/auth/utils/googleAuth';

export type AuthStep = 'login' | 'register' | 'otp-verify' | 'profile-setup' | 'forgot-password' | 'forgot-code' | 'forgot-reset';

export function useAuthModal(isOpen: boolean, onClose: () => void, initialStep: AuthStep = 'login') {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const forgotPw = useForgotPassword();
  const [email, setEmail] = useState('');
  const otpHook = useOtpVerify(email);
  const profileSetup = useProfileSetup();

  const [step, setStep] = useState<AuthStep>(initialStep);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [socialError, setSocialError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setErrors({});
      setSocialError('');
      requestAnimationFrame(() => setIsVisible(true));
    } else setIsVisible(false);
  }, [isOpen, initialStep]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [isOpen]);

  useEffect(() => {
    if (!step.startsWith('forgot-')) return;
    if (forgotPw.step === 'sent' && step !== 'forgot-code') setStep('forgot-code');
    else if (forgotPw.step === 'reset' && step !== 'forgot-reset') setStep('forgot-reset');
  }, [forgotPw.step, step]);

  const resetAll = () => {
    setStep('login');
    setErrors({});
    setSocialError('');
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setShowPassword(false);
    otpHook.resetOtp();
    profileSetup.resetForm();
    forgotPw.setStep('email');
    forgotPw.setCode('');
    forgotPw.setNewPassword('');
    forgotPw.setConfirmPassword('');
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => { resetAll(); onClose(); }, 300);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await auth.login({ email, password });
    if (!('error' in result)) handleClose();
  };

  const handleGoogleLogin = async () => {
    setSocialError('');
    try {
      const accessToken = await getGoogleAccessToken();
      const result = await dispatch(googleLoginUser({ accessToken }));
      if (!('error' in result)) handleClose();
    } catch (err) {
      setSocialError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const result = await auth.register({ name, email, password });
    if (!('error' in result)) {
      await dispatch(sendOTP({ email }));
      otpHook.resetOtp();
      setStep('otp-verify');
    }
  };

  const handleOtpFocus = (index: (number | null)) => {
    if (index != null && index >= 0) document.getElementById(`otp-${index}`)?.focus();
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    const success = await otpHook.handleVerify(e);
    if (success) setStep('profile-setup');
  };

  const handleProfileSetup = async (e: React.FormEvent) => {
    const success = await profileSetup.handleSubmit(e);
    if (success) handleClose();
  };

  const onResetPassword = async (e: React.FormEvent) => {
    const success = await forgotPw.handleResetPassword(e);
    if (success) setStep('login');
  };

  const strength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score === 0) return { score: 0, label: '', color: '' };
    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-green-500' };
  })();

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
  const showSidebar = step === 'login' || step === 'register' || step === 'forgot-password' || step === 'forgot-code' || step === 'forgot-reset';

  return {
    step, setStep, email, setEmail, name, setName, password, setPassword,
    confirmPassword, setConfirmPassword, showPassword, setShowPassword,
    agreeTerms, setAgreeTerms, errors, socialError, isVisible, setSocialError,
    auth, forgotPw, otpHook, profileSetup, strength, maskedEmail, showSidebar,
    handleClose, handleLogin, handleGoogleLogin, handleRegister,
    handleVerifyOTP, handleOtpFocus, handleProfileSetup, onResetPassword,
    handleOtpChange: (index: number, value: string) => handleOtpFocus(otpHook.handleChange(index, value)?.focusIndex ?? null),
    handleOtpKeyDown: (index: number, e: React.KeyboardEvent) => handleOtpFocus(otpHook.handleKeyDown(index, e)),
    handleOtpPaste: (e: React.ClipboardEvent) => handleOtpFocus(otpHook.handlePaste(e)),
  };
}
