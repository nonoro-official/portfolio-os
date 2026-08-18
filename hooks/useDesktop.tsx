import { useState, useEffect, useRef } from "react";
import type { Item, Window } from "@/types/desktop";
import { initialItems } from "@/config/desktop";
import { clampWindowPosition, getViewportConfig } from "@/utils/desktop";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@/constants/desktop";

export interface DesktopContextValue {
  items: Item[];
  windows: Window[];
  focusedWindow: Window | null;
  openWindow: (item: Item) => void;
  closeWindow: (windowId: string) => void;
  toggleMinimizeWindow: (windowId: string) => void;
  toggleMaximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string, title: string) => void;
  moveWindow: (windowId: string, position: { x: number; y: number }) => void;
  moveItem: (itemId: string, gridCell: { id: string }) => void;
}

const MAX_ROWS_PER_COLUMN = 8;

export const useDesktop = () => {
  // Assign grid cells to items that don't have one
  const initializeItems = (items: Item[]) => {
    return items.map((item, index) => {
      // Keep row-col assignment if gridCellId already exists
      if (item.gridCellId) return item;

      // Standard column-major fallback layout calculation:
      const rowIndex = index % MAX_ROWS_PER_COLUMN;
      const colIndex = Math.floor(index / MAX_ROWS_PER_COLUMN);

      return {
        ...item,
        gridCellId: `${rowIndex}-${colIndex}`,
      };
    });
  };

  const [items, setItems] = useState<Item[]>(() =>
    initializeItems(initialItems),
  );
  const [windows, setWindows] = useState<Window[]>([]);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Helper to get the next highest zIndex
  const getNextZIndex = (currentWindows: Window[]) => {
    if (currentWindows.length === 0) return 1;
    return Math.max(...currentWindows.map((w) => w.zIndex)) + 1;
  };

  const openWindow = (item: Item) => {
    setWindows((prev) => {
      // Check if a window for this item is already open
      const existingWindow = prev.find((w) => w.itemId === item.id);

      if (existingWindow) {
        // If it exists, bring it to the front and make sure it's visible
        const nextZIndex = getNextZIndex(prev);
        return prev.map((w) =>
          w.itemId === item.id
            ? {
                ...w,
                zIndex: nextZIndex,
                state: w.state === "minimized" ? "normal" : w.state,
              }
            : w,
        );
      }

      // Otherwise, create a new window
      const nextZIndex = getNextZIndex(prev);

      if (typeof window === "undefined") {
        // If window is not defined (e.g., during SSR), return a default position
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            itemId: item.id,
            title: item.name,
            position: { x: 50 + prev.length * 20, y: 50 + prev.length * 20 },
            size: { width: WINDOW_WIDTH, height: WINDOW_HEIGHT },
            zIndex: nextZIndex,
            state: "normal",
            url: item.link,
          },
        ];
      }

      const { viewport, maxWidth, maxHeight, isMobile } = getViewportConfig();

      const size = {
        width: Math.min(WINDOW_WIDTH, maxWidth),
        height: Math.min(WINDOW_HEIGHT, maxHeight),
      };

      // Calculate initial raw position
      const rawPosition = {
        x: (viewport.width - size.width) / 2 + prev.length * 20,
        y: (viewport.height - size.height) / 2 + prev.length * 20,
      };

      // Apply the unified clamp
      const clampedPosition = clampWindowPosition(rawPosition, size, viewport);

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          itemId: item.id,
          title: item.name,
          position: clampedPosition,
          size,
          zIndex: nextZIndex,
          state: isMobile ? "maximized" : "normal",
          url: item.link,
        },
      ];
    });
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const toggleMinimizeWindow = (windowId: string) => {
    setWindows((prev) => {
      const nextZIndex = getNextZIndex(prev);
      return prev.map((w) => {
        if (w.id !== windowId) return w;

        // Toggle between minimized and normal
        const isCurrentlyMinimized = w.state === "minimized";
        return {
          ...w,
          state: isCurrentlyMinimized ? "normal" : "minimized",
          // Focus the window when restoring it
          zIndex: isCurrentlyMinimized ? nextZIndex : 0,
        };
      });
    });
  };

  const toggleMaximizeWindow = (windowId: string) => {
    setWindows((prev) => {
      const nextZIndex = getNextZIndex(prev);

      return prev.map((w) => {
        if (w.id !== windowId) return w;

        const isCurrentlyMaximized = w.state === "maximized";
        return {
          ...w,
          state: isCurrentlyMaximized ? "normal" : "maximized",
          zIndex: nextZIndex,
        };
      });
    });
  };

  const focusWindow = (windowId: string, title: string) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === windowId);
      if (!target) return prev;

      // Find the current highest zIndex across all windows
      const maxZIndex = Math.max(...prev.map((w) => w.zIndex), 0);

      // Do nothing if window is already at top
      if (target.zIndex === maxZIndex && target.state !== "minimized") {
        return prev;
      }

      const nextZIndex = maxZIndex + 1;
      return prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              zIndex: nextZIndex,
              state: w.state === "minimized" ? "normal" : w.state,
              title,
            }
          : w,
      );
    });
  };

  const moveWindow = (windowId: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, position } : w)),
    );
  };

  const moveItem = (itemId: string, gridCell: { id: string }) => {
    // This function would update the position of the desktop item in the grid
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, gridCellId: gridCell.id } : item,
      ),
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateWindowBounds = () => {
      setWindows((prev) => {
        if (prev.length === 0) return prev;

        const { viewport, maxWidth, maxHeight, isMobile } = getViewportConfig();
        let hasChanges = false;

        const updatedWindows = prev.map((w): Window => {
          if (w.state === "minimized") return w;

          // Ideal size based on default constants & available screen space
          const targetSize = {
            width: Math.min(WINDOW_WIDTH, maxWidth),
            height: Math.min(WINDOW_HEIGHT, maxHeight),
          };

          // Mobile auto-maximize
          if (isMobile) {
            if (
              w.state !== "maximized" ||
              w.size.width !== targetSize.width ||
              w.size.height !== targetSize.height
            ) {
              hasChanges = true;
              return { ...w, state: "maximized", size: targetSize };
            }
            return w;
          }

          const newPos = clampWindowPosition(w.position, targetSize, viewport);

          // If window is maximized on desktop, update stored restored size in background
          if (w.state === "maximized") {
            if (
              targetSize.width !== w.size.width ||
              targetSize.height !== w.size.height
            ) {
              hasChanges = true;
              return { ...w, size: targetSize, position: newPos };
            }
            return w;
          }

          // Normal state window size & position update
          if (
            targetSize.width !== w.size.width ||
            targetSize.height !== w.size.height ||
            newPos.x !== w.position.x ||
            newPos.y !== w.position.y
          ) {
            hasChanges = true;
            return { ...w, size: targetSize, position: newPos };
          }

          return w;
        });

        return hasChanges ? updatedWindows : prev;
      });
    };

    window.addEventListener("resize", calculateWindowBounds);
    return () => window.removeEventListener("resize", calculateWindowBounds);
  }, []);

  // Derive focusedWindow directly from the windows state
  const focusedWindow = windows.reduce<Window | null>((highest, current) => {
    if (current.state === "minimized") return highest; // Skip minimized windows
    if (!highest) return current;
    return (current.zIndex ?? 0) > (highest.zIndex ?? 0) ? current : highest;
  }, null);

  const contextValue: DesktopContextValue = {
    items,
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    toggleMinimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    moveWindow,
    moveItem,
  };

  return {
    contextValue,
    desktopRef,
  };
};
