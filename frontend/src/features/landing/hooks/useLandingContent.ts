import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';
import { selectIsAuthenticated } from '@features/auth/store/auth.selectors';
import apiClient from '@shared/utils/apiClient';

type AuthStep = 'login' | 'register';

export const useLandingContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [categories, setCategories] = useState<any[]>([]);
  const [popularTests, setPopularTests] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroLoaded(true), 100);
    Promise.all([
      apiClient.get('/exam/categories').then((response) => setCategories(response.data.data)).catch(() => {}),
      apiClient.get('/tests?limit=5').then((response) => setPopularTests(response.data.data?.items || [])).catch(() => {}),
      apiClient.get('/subscription/plans').then((response) => setPlans(response.data.data)).catch(() => {}),
    ]).finally(() => setLoading(false));

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const auth = new URLSearchParams(location.search).get('auth');
    if (auth === 'login' || auth === 'register') {
      setAuthStep(auth);
      setAuthModalOpen(true);
      navigate('/', { replace: true });
    }
  }, [location.search, navigate]);

  const openAuth = useCallback((step: AuthStep) => {
    setAuthStep(step);
    setAuthModalOpen(true);
  }, []);

  const handleStartTest = useCallback((test?: any) => {
    if (!isAuthenticated) {
      openAuth('register');
      return;
    }

    if (test?.isPremium) {
      navigate('/app/payment');
      return;
    }

    navigate(`/app/test-instructions/${test?._id || ''}`);
  }, [isAuthenticated, navigate, openAuth]);

  return {
    authModalOpen,
    authStep,
    categories,
    heroLoaded,
    isAuthenticated,
    loading,
    navigate,
    plans,
    popularTests,
    searchQuery,
    handleStartTest,
    openAuth,
    setAuthModalOpen,
    setSearchQuery,
  };
};
