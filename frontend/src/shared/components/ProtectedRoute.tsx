import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getMe } from '@features/auth/store/auth.thunks';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading } from '@features/auth/store/auth.selectors';
import { Loader } from '@shared/components';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const location = useLocation();
  const fetched = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && (!user || !fetched.current)) {
      fetched.current = true;
      dispatch(getMe());
    }
  }, [dispatch, user]);

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader size="lg" label="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/?auth=login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
