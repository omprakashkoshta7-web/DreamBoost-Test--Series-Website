import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logoutUser } from '@features/auth/store/auth.thunks';
import { selectAuthUser, selectIsAuthenticated } from '@features/auth/store/auth.selectors';

type AuthStep = 'login' | 'register' | 'otp-verify' | 'profile-setup' | 'forgot-password';

export const useNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('login');

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [dispatch]);

  const openAuth = useCallback((step: AuthStep) => {
    setAuthStep(step);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  }, []);

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const navTo = useCallback((path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [navigate]);

  return {
    mobileMenuOpen, setMobileMenuOpen,
    userMenuOpen, setUserMenuOpen,
    notificationOpen, setNotificationOpen,
    authModalOpen, setAuthModalOpen,
    authStep, setAuthStep,
    handleLogout,
    openAuth,
    userInitials,
    navTo,
    user,
    isAuthenticated,
    navigate,
    dispatch,
  };
};
