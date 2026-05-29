import { useAppSelector } from '@store/hooks';
import { selectIsAuthenticated } from '@features/auth/store/auth.selectors';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return { isAuthenticated };
};
