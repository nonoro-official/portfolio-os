"use client";

import React from "react";
import { ArrowLeft, Menu, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNav = ({
  onBack,
  onWindow,
  onHome,
}: {
  onBack: () => void;
  onWindow: () => void;
  onHome: () => void;
}) => {
  return (
    <div className="relative inset-x-0 bottom-0 z-50 flex items-center justify-center w-full max-w-full pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-20 w-full bg-sidebar text-sidebar-foreground border border-sidebar-border px-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onHome}
          className="rounded-full text-foreground"
          aria-label="Home"
        >
          <Square className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onWindow}
          className="rounded-full text-foreground"
          aria-label="Window"
        >
          <Menu className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
