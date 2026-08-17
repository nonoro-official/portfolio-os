import { useState, useEffect, useRef } from "react";
import { Minus, Maximize, Square, X } from "lucide-react";
import type { Window } from "@/types/desktop";
import { useDesktopContext } from "@/context/DesktopContext";
import { Button } from "@/components/ui/Button";
import { clampWindowPosition } from "@/utils/desktop";

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

  // Local state to drive the UI independently from global context during drag
  const [localPos, setLocalPos] = useState(windowItem.position);
  // Ref to hold the latest position so mouseup can read it without re-binding the effect
  const localPosRef = useRef(windowItem.position);

  const isMaximized = windowItem.state === "maximized";

  // Sync local pos with global pos when NOT dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalPos(windowItem.position);
      localPosRef.current = windowItem.position;
    }
  }, [windowItem.position, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't allow dragging if the window is maximized
    if (isMaximized) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - localPos.x,
      y: e.clientY - localPos.y,
    });
  };

  useEffect(() => {
    // If not dragging, no need to attach listeners
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMaximized) return;

      const rawPos = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };

      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Apply the unified clamp
      const newPos = clampWindowPosition(rawPos, windowItem.size, viewport);

      // Update local state ONLY (isolates renders to this component)
      localPosRef.current = newPos;
      setLocalPos(newPos);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      moveWindow(windowItem.id, localPosRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isMaximized,
    dragStart.x,
    dragStart.y,
    moveWindow,
    windowItem.id,
    windowItem.size,
  ]);

  // Avoid calling context if window is already focused
  const handleWindowClick = () => {
    if ("isFocused" in windowItem && windowItem.isFocused) return;
    focusWindow(windowItem.id, windowItem.title);
  };

  // Completely hide window if minimized
  if (windowItem.state === "minimized") return null;

  return (
    <div
      onClick={handleWindowClick}
      className={`absolute backdrop-blur-xl bg-neutral-800/10 shadow-lg overflow-hidden ${
        isDragging ? "" : "transition-all duration-150"
      } ${
        isMaximized ? "top-0 left-0 w-full h-full rounded-none" : "rounded-lg"
      }`}
      style={
        isMaximized
          ? { zIndex: windowItem.zIndex }
          : {
              // Read from the local state instead of context
              left: localPos.x,
              top: localPos.y,
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
        onDoubleClick={() => toggleMaximizeWindow(windowItem.id)} // Double-click to maximize/restore
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
