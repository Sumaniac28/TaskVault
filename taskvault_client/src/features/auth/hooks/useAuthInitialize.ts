import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/features/auth/authSlice";
import { authApi } from "../authApi";

export const useAuthInitialize = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!token) return;

    const initializeAuth = async () => {
      try {
        const user = await authApi.me();
        dispatch(setUser(user));
      } catch {
        dispatch(logout());
      }
    };

    if (!isAuthenticated) {
      initializeAuth();
    }
  }, [token, isAuthenticated, dispatch]);
};
