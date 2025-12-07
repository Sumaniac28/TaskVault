export const statusOptions = [
  { value: "todo", label: "Todo" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const statusColors = {
  todo: "bg-blue-100 text-blue-900",
  inprogress: "bg-amber-100 text-amber-900",
  done: "bg-green-100 text-green-900",
};

export const priorityColors = {
  low: "bg-gray-100 text-gray-900",
  medium: "bg-orange-100 text-orange-900",
  high: "bg-red-100 text-red-900",
};
