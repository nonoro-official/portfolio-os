import React from "react";
import { useDesktopContext } from "@/context/DesktopContext";
import { Button } from "@/components/ui/Button";

const Taskbar = () => {
  // Directly destructure the derived values instead of the getter functions
  const { windows, focusedWindow, focusWindow, toggleMinimizeWindow } =
    useDesktopContext();

  const handleTabClick = (windowId: string, title: string, state: string) => {
    const isFocused = focusedWindow?.id === windowId;

    if (state === "minimized" || !isFocused) {
      if (state === "minimized") {
        toggleMinimizeWindow(windowId);
      } else {
        focusWindow(windowId, title);
      }
    } else {
      toggleMinimizeWindow(windowId);
    }
  };

  return (
    <div className="flex items-center space-x-2 h-full whitespace-nowrap overflow-x-auto overflow-y-hidden">
      {/* Map directly over the windows array */}
      {windows.map((window) => (
        <Button
          key={window.id}
          className={`h-8 px-3 rounded-md flex items-center justify-center shrink-0 text-sm text-foreground ${
            focusedWindow?.id === window.id
              ? "bg-primary aria-pressed:true"
              : "bg-secondary"
          }`}
          onClick={() => handleTabClick(window.id, window.title, window.state)}
        >
          {window.title}
        </Button>
      ))}
    </div>
  );
};

export default Taskbar;
