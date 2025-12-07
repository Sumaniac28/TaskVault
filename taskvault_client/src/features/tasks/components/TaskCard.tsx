import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
} from "@/features/tasks/tasksSlice";
import { tasksApi } from "@/features/tasks/tasksApi";
import { Task, TaskStatus, TaskPriority } from "@/types";
import { Button, Textarea, ConfirmDialog } from "@/shared/components";
import { formatDate, truncate } from "@/shared/utils/helpers";
import {
  statusOptions,
  priorityOptions,
  statusColors,
  priorityColors,
} from "@/shared/constants/options";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await tasksApi.deleteTask(task.id);
      dispatch(deleteTaskAction(task.id));
      setShowDeleteDialog(false);
    } catch (err) {
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: TaskStatus) => {
    try {
      setLoading(true);
      const updated = await tasksApi.updateTask(task.id, { status });
      dispatch(updateTaskAction(updated));
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = async (priority: TaskPriority) => {
    try {
      setLoading(true);
      const updated = await tasksApi.updateTask(task.id, { priority });
      dispatch(updateTaskAction(updated));
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDescription = async () => {
    try {
      setLoading(true);
      const updated = await tasksApi.updateTask(task.id, {
        description: newDescription,
      });
      dispatch(updateTaskAction(updated));
      setEditDescription(false);
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-surface p-5 rounded-xl shadow border border-border-default hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-themeFont font-semibold text-lg text-primary flex-1 break-words">
            {truncate(task.title, 50)}
          </h3>
          <Button
            variant="error"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            disabled={loading}
            className="ml-2 whitespace-nowrap"
          >
            Delete
          </Button>
        </div>

        {editDescription ? (
          <div className="mb-3 space-y-2">
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter task description"
              rows={2}
              className="text-sm"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={handleSaveDescription}
                disabled={loading}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditDescription(false);
                  setNewDescription(task.description || "");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {task.description ? (
              <p
                onClick={() => setEditDescription(true)}
                className="text-sm text-muted mb-3 font-bodyFont cursor-pointer hover:text-primary transition-colors"
              >
                {truncate(task.description, 100)}
              </p>
            ) : (
              <p
                onClick={() => setEditDescription(true)}
                className="text-xs text-muted/60 mb-3 font-bodyFont cursor-pointer hover:text-primary transition-colors italic"
              >
                Click to add description
              </p>
            )}
          </>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            disabled={loading}
            title="Task status"
            className={`text-xs px-3 py-1 rounded-lg font-bodyFont font-medium transition-colors disabled:opacity-50 cursor-pointer ${
              statusColors[task.status]
            }`}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={task.priority}
            onChange={(e) =>
              handlePriorityChange(e.target.value as TaskPriority)
            }
            disabled={loading}
            title="Task priority"
            className={`text-xs px-3 py-1 rounded-lg font-bodyFont font-medium transition-colors disabled:opacity-50 cursor-pointer ${
              priorityColors[task.priority]
            }`}
          >
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {task.dueDate && (
          <p className="text-xs text-muted font-bodyFont">
            Due: {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={loading}
      />
    </>
  );
}
