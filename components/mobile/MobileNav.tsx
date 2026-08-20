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
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-4 px-4 pb-4 pt-3 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl shadow-lg">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full text-white hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onWindow}
          className="rounded-full text-white hover:bg-white/10"
          aria-label="Window"
        >
          <Square className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onHome}
          className="rounded-full text-white hover:bg-white/10"
          aria-label="Home"
        >
          <Menu className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
