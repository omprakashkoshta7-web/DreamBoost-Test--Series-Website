import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getMe } from '@features/auth/store/auth.thunks';
import { selectAuthUser, selectIsAuthenticated } from '@features/auth/store/auth.selectors';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const fetched = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user && !fetched.current) {
      fetched.current = true;
      dispatch(getMe());
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default AuthProvider;
