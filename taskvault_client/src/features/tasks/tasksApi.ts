import { axiosInstance } from "@/lib/axios";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "@/types";

interface TaskResponse {
  success: boolean;
  task: Task;
}

interface TasksListResponse {
  success: boolean;
  tasks: Task[];
  total?: number;
  page?: number;
}

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get<TasksListResponse>("/api/tasks");
    return response.data.tasks;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await axiosInstance.post<TaskResponse>(
      "/api/tasks",
      payload
    );
    return response.data.task;
  },

  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await axiosInstance.put<TaskResponse>(
      `/api/tasks/${id}`,
      payload
    );
    return response.data.task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/tasks/${id}`);
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/api/auth/logout");
  },
};
