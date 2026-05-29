import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { useAuth } from './useAuth';
import { googleLoginUser } from '../store/auth.thunks';
import { getGoogleAccessToken } from '../utils/googleAuth';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login({ email, password });
    if ((result as any)?.meta?.requestStatus === 'fulfilled') {
      navigate('/app/dashboard');
    }
  }, [validateForm, login, email, password, navigate]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const accessToken = await getGoogleAccessToken();
      const result = await dispatch(googleLoginUser({ accessToken }));
      if (googleLoginUser.fulfilled.match(result)) {
        navigate('/app/dashboard');
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Google sign-in failed' });
    }
  }, [dispatch, navigate]);

  return { email, password, showPassword, errors, loading, error,
    setEmail, setPassword, setShowPassword, setErrors,
    handleSubmit, handleGoogleLogin };
};
