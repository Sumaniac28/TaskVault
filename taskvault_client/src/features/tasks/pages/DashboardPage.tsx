import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";
import { tasksApi } from "@/features/tasks/tasksApi";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useSocketSync } from "@/features/tasks/hooks/useSocketSync";
import TaskList from "@/features/tasks/components/TaskList";
import TaskFilters from "@/features/tasks/components/TaskFilters";
import CreateTaskModal from "@/features/tasks/components/CreateTaskModal";
import { Button, LoadingSpinner } from "@/shared/components";

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const taskState = useAppSelector((state) => state.tasks);
  const tasks = taskState?.tasks || [];
  const filters = taskState?.filters || {};
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { loading, error, refresh: loadTasks } = useTasks();
  useSocketSync();

  const handleLogout = async () => {
    try {
      await tasksApi.logout();
    } catch {
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-sm border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <h1 className="text-2xl font-themeFont font-bold text-primary">
              TaskVault
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted font-bodyFont">
              {user?.email}
            </span>
            <Button variant="secondary" size="md" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-themeFont font-bold text-primary mb-2">
                My Tasks
              </h2>
              <p className="text-muted text-sm font-bodyFont">
                Manage and track your work
              </p>
            </div>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create Task
            </Button>
          </div>
          <TaskFilters />
        </div>

        {error && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-4 font-bodyFont">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <TaskList tasks={filteredTasks} onRefresh={loadTasks} />
        )}
      </main>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={loadTasks}
        />
      )}
    </div>
  );
}
