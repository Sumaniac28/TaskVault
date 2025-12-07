import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { setTasks, setLoading, setError } from "../tasksSlice";
import { logout } from "@/features/auth/authSlice";
import { tasksApi } from "../tasksApi";

interface UseTasksOptions {
  skip?: boolean;
}

export const useTasks = (options: UseTasksOptions = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const cacheRef = useRef<{ timestamp: number; tasks: any[] | null }>({
    timestamp: 0,
    tasks: null,
  });

  const CACHE_DURATION = 30000;

  const loadTasks = useCallback(async () => {
    const now = Date.now();
    if (
      cacheRef.current.tasks &&
      now - cacheRef.current.timestamp < CACHE_DURATION
    ) {
      dispatch(setTasks(cacheRef.current.tasks));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await tasksApi.getTasks();
      cacheRef.current = { timestamp: now, tasks: data };
      dispatch(setTasks(data));
    } catch (err: any) {
      if (err.response?.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else {
        const errorMsg = err.response?.data?.error || "Failed to load tasks";
        dispatch(setError(errorMsg));
      }
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!options.skip) {
      loadTasks();
    }
  }, []);

  return { tasks, loading, error, refresh: loadTasks };
};
