import { useState, useCallback, useEffect } from "react";
import { Minus, Maximize, Square, X } from "lucide-react";
import type { Window } from "@/types/desktop";
import { useDesktopContext } from "@/context/DesktopContext";
import { Button } from "@/components/ui/Button";
import { STATUS_BAR_HEIGHT, DOCK_HEIGHT } from "@/types/desktop";

interface DraggableWindowProps {
  windowItem: Window;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  windowItem,
  children,
}) => {
  const {
    closeWindow,
    toggleMinimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    moveWindow,
  } = useDesktopContext();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isMaximized = windowItem.state === "maximized";

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't allow dragging if the window is maximized
    if (isMaximized) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowItem.position.x,
      y: e.clientY - windowItem.position.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        let nextX = e.clientX - dragStart.x;
        let nextY = e.clientY - dragStart.y;

        // Constrain within viewport
        const desktopWidth = window.innerWidth;
        const desktopHeight = window.innerHeight;
        const { width, height } = windowItem.size;

        nextX = Math.max(0, Math.min(nextX, desktopWidth - width));
        nextY = Math.max(
          STATUS_BAR_HEIGHT,
          Math.min(nextY, desktopHeight - height - DOCK_HEIGHT),
        );

        moveWindow(windowItem.id, {
          x: nextX,
          y: nextY,
        });
      }
    },
    [
      isDragging,
      isMaximized,
      dragStart,
      moveWindow,
      windowItem.id,
      windowItem.size,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Completely hide window if minimized
  if (windowItem.state === "minimized") return null;

  return (
    <div
      onClick={() => focusWindow(windowItem.id, windowItem.title)} // Focus if clicking anywhere on the window body
      className={`absolute backdrop-blur-xl bg-neutral-800/10 shadow-lg overflow-hidden ${
        isDragging ? "" : "transition-all duration-150"
      } ${
        isMaximized ? "top-0 left-0 w-full h-full rounded-none" : "rounded-lg"
      }`}
      style={
        isMaximized
          ? { zIndex: windowItem.zIndex }
          : {
              left: windowItem.position.x,
              top: windowItem.position.y,
              width: windowItem.size.width,
              height: windowItem.size.height,
              zIndex: windowItem.zIndex,
              willChange: isDragging ? "transform" : "auto",
            }
      }
    >
      {/* Header Bar */}
      <div
        className={`p-2 px-4 flex bg-secondary border-b border-sidebar-border justify-between items-center ${
          isMaximized ? "cursor-default" : "cursor-move"
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximizeWindow(windowItem.id)} // Double-click to Maximize/Restore
      >
        <h3 className="text-sm select-none">{windowItem.title}</h3>
        <div className="flex space-x-2">
          {/* Minimize Button */}
          <Button
            onClick={() => toggleMinimizeWindow(windowItem.id)}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Minus className="size-4" />
          </Button>

          {/* Maximize / Restore Button */}
          <Button
            onClick={() => toggleMaximizeWindow(windowItem.id)}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            {isMaximized ? (
              <Square className="size-4" />
            ) : (
              <Maximize className="size-4" />
            )}
          </Button>

          {/* Close Button */}
          <Button
            onClick={() => closeWindow(windowItem.id)}
            variant="destructive"
            size="sm"
            className="p-2"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Window Body */}
      <div
        className="w-full bg-sidebar-primary-foreground dark:bg-card overflow-hidden"
        style={{ height: "calc(100% - 40px)" }}
      >
        {children}
      </div>
    </div>
  );
};
