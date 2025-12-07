import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { logout } from '@/features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token && isAuthenticated) {
      dispatch(logout());
    }
  }, [token, isAuthenticated, dispatch]);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
