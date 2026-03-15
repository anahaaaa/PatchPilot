import { AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "./ui/utils";

export type Severity = "critical" | "high" | "medium" | "low" | "info";

interface SeverityChipProps {
  severity: Severity;
  className?: string;
}

const severityConfig = {
  critical: {
    label: "Critical",
    icon: XCircle,
    bg: "bg-severity-critical-bg dark:bg-severity-critical-bg",
    border: "border-severity-critical-border dark:border-severity-critical-border",
    text: "text-severity-critical dark:text-severity-critical",
  },
  high: {
    label: "High",
    icon: AlertCircle,
    bg: "bg-severity-high-bg dark:bg-severity-high-bg",
    border: "border-severity-high-border dark:border-severity-high-border",
    text: "text-severity-high dark:text-severity-high",
  },
  medium: {
    label: "Medium",
    icon: AlertTriangle,
    bg: "bg-severity-medium-bg dark:bg-severity-medium-bg",
    border: "border-severity-medium-border dark:border-severity-medium-border",
    text: "text-severity-medium dark:text-severity-medium",
  },
  low: {
    label: "Low",
    icon: Info,
    bg: "bg-severity-low-bg dark:bg-severity-low-bg",
    border: "border-severity-low-border dark:border-severity-low-border",
    text: "text-severity-low dark:text-severity-low",
  },
  info: {
    label: "Info",
    icon: Info,
    bg: "bg-severity-info-bg dark:bg-severity-info-bg",
    border: "border-severity-info-border dark:border-severity-info-border",
    text: "text-severity-info dark:text-severity-info",
  },
};

export function SeverityChip({ severity, className }: SeverityChipProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium",
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
