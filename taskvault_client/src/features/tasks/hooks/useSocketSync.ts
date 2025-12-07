import { useEffect, useRef } from "react";
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
  const tasksRef = useRef<Map<string, Task>>(new Map());

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    initSocket(token);

    const unsubscribeCreated = onTaskCreated((task: Task) => {
      if (!tasksRef.current.has(task.id)) {
        tasksRef.current.set(task.id, task);
        dispatch(addTask(task));
      }
    });

    const unsubscribeUpdated = onTaskUpdated((task: Task) => {
      tasksRef.current.set(task.id, task);
      dispatch(updateTask(task));
    });

    const unsubscribeDeleted = onTaskDeleted(({ id }: { id: string }) => {
      tasksRef.current.delete(id);
      dispatch(deleteTask(id));
    });

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, [token, dispatch]);
};
