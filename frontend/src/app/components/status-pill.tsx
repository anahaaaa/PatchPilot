import { CheckCircle2, XCircle, Clock, Loader2, Circle } from "lucide-react";
import { cn } from "./ui/utils";

export type Status = "completed" | "running" | "failed" | "pending" | "queued";

interface StatusPillProps {
  status: Status;
  label?: string;
  className?: string;
}

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    bg: "bg-status-success-bg dark:bg-status-success-bg",
    text: "text-status-success dark:text-status-success",
  },
  running: {
    label: "Running",
    icon: Loader2,
    bg: "bg-status-pending-bg dark:bg-status-pending-bg",
    text: "text-status-pending dark:text-status-pending",
    animate: true,
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    bg: "bg-status-error-bg dark:bg-status-error-bg",
    text: "text-status-error dark:text-status-error",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-status-pending-bg dark:bg-status-pending-bg",
    text: "text-status-pending dark:text-status-pending",
  },
  queued: {
    label: "Queued",
    icon: Circle,
    bg: "bg-status-pending-bg dark:bg-status-pending-bg",
    text: "text-status-pending dark:text-status-pending",
  },
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className={cn("h-3 w-3", config.animate && "animate-spin")} />
      {label || config.label}
    </span>
  );
}
