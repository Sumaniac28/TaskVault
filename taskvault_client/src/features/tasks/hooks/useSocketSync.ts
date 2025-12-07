import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "@/features/tasks/tasksSlice";
import {
  initSocket,
  disconnectSocket,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
} from "@/lib/socket";
import { RootState } from "@/store";
import { Task } from "@/types";

export const useSocketSync = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    initSocket(token);

    const unsubscribeCreated = onTaskCreated((task: Task) => {
      dispatch(addTask(task));
    });

    const unsubscribeUpdated = onTaskUpdated((task: Task) => {
      dispatch(updateTask(task));
    });

    const unsubscribeDeleted = onTaskDeleted(({ id }: { id: string }) => {
      dispatch(deleteTask(id));
    });

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, [token, dispatch]);
};
