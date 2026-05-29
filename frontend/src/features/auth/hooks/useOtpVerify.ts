import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { verifyOTP, resendOTP } from '../store/auth.thunks';
import { selectOTPLoading, selectOTPError } from '../store/auth.selectors';

export const useOtpVerify = (email: string) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectOTPLoading);
  const error = useAppSelector(selectOTPError);

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    return { focusIndex: value && index < 5 ? index + 1 : -1 };
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      return index - 1;
    }
    return -1;
  }, [otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pasted.every(d => /^\d$/.test(d))) {
      const newOtp = [...otp];
      pasted.forEach((d, i) => { if (i < 6) newOtp[i] = d; });
      setOtp(newOtp);
      return Math.min(pasted.length, 5);
    }
    return -1;
  }, [otp]);

  const handleVerify = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return false;
    const result = await dispatch(verifyOTP({ email, otp: otpCode }));
    return verifyOTP.fulfilled.match(result);
  }, [dispatch, email, otp]);

  const handleResend = useCallback(async () => {
    const result = await dispatch(resendOTP({ email }));
    if (resendOTP.fulfilled.match(result)) {
      setResendTimer(30);
      setCanResend(false);
    }
  }, [dispatch, email]);

  const resetOtp = useCallback(() => {
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setCanResend(false);
  }, []);

  return {
    otp, loading, error, resendTimer, canResend,
    handleChange, handleKeyDown, handlePaste, handleVerify, handleResend, resetOtp,
  };
};
