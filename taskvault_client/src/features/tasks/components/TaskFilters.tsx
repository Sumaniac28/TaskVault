import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/features/tasks/tasksSlice";
import { TaskStatus, TaskPriority } from "@/types";
import { Input, Select, Card } from "@/shared/components";
import { statusOptions, priorityOptions } from "@/shared/constants/options";

export default function TaskFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tasks.filters);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(
      setFilters({
        ...filters,
        status: value ? (value as TaskStatus) : undefined,
      })
    );
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(
      setFilters({
        ...filters,
        priority: value ? (value as TaskPriority) : undefined,
      })
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ ...filters, search: e.target.value || undefined }));
  };

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Input
          label="Search"
          type="text"
          value={filters.search || ""}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
        />

        <Select
          label="Status"
          value={filters.status || ""}
          onChange={handleStatusChange}
          options={[{ value: "", label: "All" }, ...statusOptions]}
        />

        <Select
          label="Priority"
          value={filters.priority || ""}
          onChange={handlePriorityChange}
          options={[{ value: "", label: "All" }, ...priorityOptions]}
        />
      </div>
    </Card>
  );
}
