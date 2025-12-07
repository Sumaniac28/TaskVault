import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { addTask } from "@/features/tasks/tasksSlice";
import { tasksApi } from "@/features/tasks/tasksApi";
import { CreateTaskPayload } from "@/types";
import { Alert, Input, Textarea, Select, Button } from "@/shared/components";
import { statusOptions, priorityOptions } from "@/shared/constants/options";

interface CreateTaskModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTaskModal({
  onClose,
  onSuccess,
}: CreateTaskModalProps) {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskPayload>();

  const onSubmit = async (data: CreateTaskPayload) => {
    try {
      setLoading(true);
      setError("");
      const task = await tasksApi.createTask(data);
      dispatch(addTask(task));
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-border-default w-full max-w-md">
        <div className="px-6 pt-6 pb-4 border-b border-border-default">
          <h2 className="text-xl font-themeFont font-bold text-primary">
            Create Task
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {error && (
            <Alert type="error" message={error} onClose={() => setError("")} />
          )}

          <Input
            label="Title *"
            placeholder="Enter task title"
            {...register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <Textarea
            label="Description"
            placeholder="Enter task description"
            {...register("description")}
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              {...register("status")}
            />
            <Select
              label="Priority"
              options={priorityOptions}
              {...register("priority")}
            />
          </div>

          <Input label="Due Date" type="date" {...register("dueDate")} />

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
