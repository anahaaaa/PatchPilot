import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  startLine?: number;
  highlightLines?: number[];
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "plaintext",
  startLine = 1,
  highlightLines = [],
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-muted overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {lines.map((line, index) => {
              const lineNumber = startLine + index;
              const isHighlighted = highlightLines.includes(lineNumber);
              return (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    isHighlighted && "bg-severity-medium-bg dark:bg-severity-medium-bg"
                  )}
                >
                  {showLineNumbers && (
                    <span className="inline-block w-12 text-right mr-4 text-muted-foreground select-none">
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1">{line || " "}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
