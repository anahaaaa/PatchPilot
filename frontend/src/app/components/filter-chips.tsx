import { X } from "lucide-react";
import { cn } from "./ui/utils";

interface FilterChip {
  id: string;
  label: string;
  active: boolean;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onToggle: (id: string) => void;
  className?: string;
}

export function FilterChips({ filters, onToggle, className }: FilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onToggle(filter.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            filter.active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          )}
        >
          {filter.label}
          {filter.active && <X className="h-3 w-3" />}
        </button>
      ))}
    </div>
  );
}
