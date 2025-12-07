import { Task } from "@/types";
import TaskCard from "@/features/tasks/components/TaskCard";

interface TaskListProps {
  tasks: Task[];
  onRefresh: () => void;
}

export default function TaskList({ tasks, onRefresh }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-surface rounded-lg">
        <p className="text-muted text-lg">No tasks found</p>
        <p className="text-muted text-sm mt-2">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onRefresh} />
      ))}
    </div>
  );
}
