import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface StoreListItemProps {
  title: string;
  onTitleClick: () => void;
  description: ReactNode;
  tagLine?: ReactNode;
  media?: ReactNode;
  mediaPosition?: "start" | "end";
  align?: "start" | "center" | "end";
  footer?: ReactNode;
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

export function StoreListItem({
  title,
  onTitleClick,
  description,
  tagLine,
  media,
  mediaPosition = "start",
  align = "start",
  footer,
}: StoreListItemProps) {
  const body = (
    <div className="flex-1 min-w-0 flex flex-col">
      {tagLine && (
        <span className="text-xs font-normal text-foreground truncate mb-1">
          {tagLine}
        </span>
      )}
      <Button variant="title-link" size="none" onClick={onTitleClick}>
        {title}
      </Button>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
        {description}
      </div>
      {footer}
    </div>
  );

  return (
    <div className={`flex ${alignClasses[align]} justify-between gap-4`}>
      {mediaPosition === "start" && media}
      {body}
      {mediaPosition === "end" && media}
    </div>
  );
}
