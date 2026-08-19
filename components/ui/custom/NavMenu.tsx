"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/button";

interface NavMenuProps {
  buttonName: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavMenu({
  buttonName,
  children,
  className,
  onClick,
}: NavMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          onClick={onClick}
          className="p-1 hover:bg-zinc-200/50 rounded transition"
        >
          <span className={className}>{buttonName}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56">{children}</PopoverContent>
    </Popover>
  );
}
