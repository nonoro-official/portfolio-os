"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useDesktopContext } from "@/context/DesktopContext";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const { isMobile, focusedWindow } = useDesktopContext();

  const isWindowFocused = Boolean(
    focusedWindow && focusedWindow.state !== "minimized",
  );

  const isUnfocusedMobile = isMobile && !isWindowFocused;

  // Dynamic icon sizing based on mobile desktop state
  const iconSizeClass = isUnfocusedMobile ? "size-15" : "size-6";

  return (
    <Button
      variant="ghost-bar"
      size={isUnfocusedMobile ? "default" : "icon"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex items-center justify-end cursor-pointer ${
        isUnfocusedMobile ? "h-auto p-3" : ""
      }`}
    >
      <Sun
        className={`${iconSizeClass} rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
      />
      <Moon
        className={`absolute ${iconSizeClass} rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
      />
    </Button>
  );
}
