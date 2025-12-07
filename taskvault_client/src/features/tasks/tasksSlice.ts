import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskFilters } from "@/types";

interface TasksState {
  tasks: Task[];
  filters: TaskFilters;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  filters: {},
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const exists = state.tasks.some((task) => task.id === action.payload.id);
      if (!exists) {
        state.tasks.unshift(action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<TaskFilters>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setFilters,
  setLoading,
  setError,
} = tasksSlice.actions;
export default tasksSlice.reducer;
