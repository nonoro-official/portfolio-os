import type { ReactNode } from "react";

interface AppShellProps {
  toolbar?: ReactNode;
  subBar?: ReactNode;
  children: ReactNode;
}

export function AppShell({ toolbar, subBar, children }: AppShellProps) {
  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {toolbar && (
        <div className="flex items-center gap-3 px-4 py-1 bg-[#FDFBF7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
          {toolbar}
        </div>
      )}
      {subBar && (
        <div className="flex items-center gap-3 px-4 py-2 bg-[#ecebe7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
          {subBar}
        </div>
      )}
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
