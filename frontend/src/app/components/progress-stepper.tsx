import { Check } from "lucide-react";
import { cn } from "./ui/utils";

interface Step {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface ProgressStepperProps {
  steps: Step[];
  className?: string;
}

export function ProgressStepper({ steps, className }: ProgressStepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn("flex items-center", index !== steps.length - 1 && "flex-1")}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                  step.status === "completed" &&
                    "border-primary bg-primary text-primary-foreground",
                  step.status === "current" &&
                    "border-primary bg-background text-primary",
                  step.status === "upcoming" && "border-border bg-background text-muted-foreground"
                )}
              >
                {step.status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  step.status === "completed" && "text-foreground",
                  step.status === "current" && "text-primary",
                  step.status === "upcoming" && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "ml-3 h-0.5 flex-1 transition-colors",
                  step.status === "completed" ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
