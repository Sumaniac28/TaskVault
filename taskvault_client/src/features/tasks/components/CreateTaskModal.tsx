import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { addTask } from "@/features/tasks/tasksSlice";
import { tasksApi } from "@/features/tasks/tasksApi";
import { CreateTaskPayload } from "@/types";
import { Alert, Input, Textarea, Select, Button } from "@/shared/components";
import { getErrorMessage } from "@/lib/errorHandler";
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
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-border-default w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-border-default sticky top-0 bg-surface">
          <h2 className="text-lg sm:text-xl font-themeFont font-bold text-primary">
            Create Task
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button variant="ghost" onClick={onClose} className="flex-1 text-sm sm:text-base">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="flex-1 text-sm sm:text-base"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
