import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { useAuth } from './useAuth';
import { googleLoginUser, sendOTP } from '../store/auth.thunks';
import { getGoogleAccessToken } from '../utils/googleAuth';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, loading, error } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, password, confirmPassword, agreeTerms]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await register({ name, email, password });
    if (result.meta.requestStatus === 'fulfilled') {
      await dispatch(sendOTP({ email }));
      navigate('/app/auth/otp-verify', { state: { email } });
    }
  }, [validateForm, register, name, email, password, dispatch, navigate]);

  const handleGoogleSignup = useCallback(async () => {
    try {
      const accessToken = await getGoogleAccessToken();
      const result = await dispatch(googleLoginUser({ accessToken }));
      if (googleLoginUser.fulfilled.match(result)) {
        navigate('/');
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Google sign-in failed' });
    }
  }, [dispatch, navigate]);

  return { name, email, password, confirmPassword, showPassword, agreeTerms,
    errors, loading, error,
    setName, setEmail, setPassword, setConfirmPassword,
    setShowPassword, setAgreeTerms, setErrors,
    handleSubmit, handleGoogleSignup };
};
