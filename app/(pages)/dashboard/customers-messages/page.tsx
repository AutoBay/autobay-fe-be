import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, Circle, CircleOff, HelpCircle, Timer } from "lucide-react";
import { DataTable } from "@/components/data-table";
import tasks from "./tasks.json" with { type: "json" };

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];

export default async function CustomersPage() {
  return (
    <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month.</p>
        </div>
        <div className="flex items-center gap-2" />
      </div>
      <DataTable data={tasks} />
    </div>
  );
}
