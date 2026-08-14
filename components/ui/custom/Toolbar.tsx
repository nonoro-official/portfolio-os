import { ReactNode } from "react";
import { ArrowLeft, Home, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ToolbarProps {
  canGoBack?: boolean;
  showHome?: boolean;
  showDivider?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  onRefresh?: () => void;
  children?: ReactNode;
}

export function Toolbar({
  canGoBack = true,
  showHome = true,
  showDivider = false,
  onBack,
  onHome,
  onRefresh,
  children,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
        {onBack && (
          <Button
            variant="window"
            onClick={onBack}
            disabled={!canGoBack}
            className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded disabled:opacity-30 transition"
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}

        {showHome && onHome && (
          <Button
            variant="window"
            onClick={onHome}
            className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded transition"
          >
            <Home className="size-4" />
          </Button>
        )}

        {onRefresh && (
          <Button
            variant="window"
            onClick={onRefresh}
            className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded transition"
          >
            <RotateCw className="size-4" />
          </Button>
        )}

        {showDivider && (
          <span className="text-zinc-300 dark:text-zinc-700 select-none mx-0.5">
            |
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
