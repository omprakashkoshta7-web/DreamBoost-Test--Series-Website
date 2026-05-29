import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../store/auth.selectors';
import { loginUser, registerUser, logoutUser, profileSetup } from '../store/auth.thunks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const login = useCallback(
    (credentials: { email: string; password: string }) => dispatch(loginUser(credentials)),
    [dispatch]
  );

  const register = useCallback(
    (data: { name: string; email: string; password: string }) => dispatch(registerUser(data)),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);

  const updateProfile = useCallback(
    (data: { phone?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string }) => dispatch(profileSetup(data)),
    [dispatch]
  );

  return { user, isAuthenticated, loading, error, login, register, logout, updateProfile };
};
