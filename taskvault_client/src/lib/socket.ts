import { io, Socket } from "socket.io-client";
import { Task } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

let socket: Socket | null = null;

export const getSocket = (): Socket | null => socket;

export const initSocket = (token: string): Socket => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(API_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {});

  socket.on("disconnect", () => {});

  socket.on("connect_error", () => {});

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onTaskCreated = (callback: (task: Task) => void): (() => void) => {
  if (!socket) return () => {};
  socket.on("task:created", callback);
  return () => socket?.off("task:created", callback);
};

export const onTaskUpdated = (callback: (task: Task) => void): (() => void) => {
  if (!socket) return () => {};
  socket.on("task:updated", callback);
  return () => socket?.off("task:updated", callback);
};

export const onTaskDeleted = (
  callback: (data: { id: string }) => void
): (() => void) => {
  if (!socket) return () => {};
  socket.on("task:deleted", callback);
  return () => socket?.off("task:deleted", callback);
};
