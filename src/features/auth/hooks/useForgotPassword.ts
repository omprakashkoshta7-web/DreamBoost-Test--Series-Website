import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { forgotPassword, verifyResetCode, resetPassword } from '../store/auth.thunks';
import { selectForgotPasswordLoading, selectForgotPasswordError } from '../store/auth.selectors';

type ForgotStep = 'email' | 'sent' | 'reset';

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectForgotPasswordLoading);
  const error = useAppSelector(selectForgotPasswordError);

  const [step, setStep] = useState<ForgotStep>('email');
  const [email, setEmailState] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const setEmail = useCallback((e: string) => setEmailState(e), []);

  const handleSendCode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    const result = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(result)) {
      setEmailState(result.payload.email);
      setStep('sent');
    }
  }, [dispatch, email]);

  const handleVerifyCode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    const result = await dispatch(verifyResetCode({ email, code }));
    if (verifyResetCode.fulfilled.match(result)) {
      setStep('reset');
    }
  }, [dispatch, email, code]);

  const handleResetPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6 || newPassword !== confirmPassword) return;
    const result = await dispatch(resetPassword({ email, code, newPassword }));
    if (resetPassword.fulfilled.match(result)) {
      return true;
    }
    return false;
  }, [dispatch, email, code, newPassword, confirmPassword]);

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return {
    step, email, code, newPassword, confirmPassword, loading, error, maskedEmail,
    setEmail, setCode, setNewPassword, setConfirmPassword, setStep,
    handleSendCode, handleVerifyCode, handleResetPassword,
  };
};
