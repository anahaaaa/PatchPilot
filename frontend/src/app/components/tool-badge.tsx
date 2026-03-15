import { Shield, Package, Key } from "lucide-react";
import { cn } from "./ui/utils";

export type Tool = "semgrep" | "osv" | "gitleaks";

interface ToolBadgeProps {
  tool: Tool;
  className?: string;
}

const toolConfig = {
  semgrep: {
    label: "Semgrep",
    icon: Shield,
    color: "text-tool-semgrep dark:text-tool-semgrep",
  },
  osv: {
    label: "OSV Scanner",
    icon: Package,
    color: "text-tool-osv dark:text-tool-osv",
  },
  gitleaks: {
    label: "Gitleaks",
    icon: Key,
    color: "text-tool-gitleaks dark:text-tool-gitleaks",
  },
};

export function ToolBadge({ tool, className }: ToolBadgeProps) {
  const config = toolConfig[tool];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        config.color,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
