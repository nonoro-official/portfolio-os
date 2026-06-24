import { useState, useCallback, useRef } from "react";
import type { Item, Window } from "@/types/desktop";
import { initialItems } from "@/config/desktop";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@/types/desktop";

export interface DesktopContextValue {
  items: Item[];
  windows: Window[];
  openWindow: (item: Item) => void;
  closeWindow: (windowId: string) => void;
  toggleMinimizeWindow: (windowId: string) => void;
  toggleMaximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string, title: string) => void;
  moveWindow: (windowId: string, position: { x: number; y: number }) => void;
  moveItem: (itemId: string, gridCell: { id: string }) => void;
  getAllWindows: () => Window[];
  getFocusedWindow: () => Window | null;
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
  const getNextZIndex = useCallback((currentWindows: Window[]) => {
    if (currentWindows.length === 0) return 1;
    return Math.max(...currentWindows.map((w) => w.zIndex)) + 1;
  }, []);

  const openWindow = useCallback(
    (item: Item) => {
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
              id: Date.now().toString(),
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

        // Calculate initial position (centered, but offset for each new window)
        const desktopWidth = window.innerWidth;
        const desktopHeight = window.innerHeight;
        let initialX = (desktopWidth - WINDOW_WIDTH) / 2 + prev.length * 20;
        let initialY = (desktopHeight - WINDOW_HEIGHT) / 2 + prev.length * 20;

        // Constrain within viewport
        initialX = Math.max(0, Math.min(initialX, desktopWidth - WINDOW_WIDTH));
        initialY = Math.max(
          0,
          Math.min(initialY, desktopHeight - WINDOW_HEIGHT),
        );

        return [
          ...prev,
          {
            id: Date.now().toString(),
            itemId: item.id,
            title: item.name,
            position: { x: initialX, y: initialY },
            size: { width: WINDOW_WIDTH, height: WINDOW_HEIGHT },
            zIndex: nextZIndex,
            state: "normal",
            url: item.link,
          },
        ];
      });
    },
    [getNextZIndex],
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const toggleMinimizeWindow = useCallback(
    (windowId: string) => {
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
    },
    [getNextZIndex],
  );

  const toggleMaximizeWindow = useCallback(
    (windowId: string) => {
      setWindows((prev) => {
        const nextZIndex = getNextZIndex(prev);

        return prev.map((w) => {
          if (w.id !== windowId) return w;

          const isCurrentlyMaximized = w.state === "maximized";
          return {
            ...w,
            state: isCurrentlyMaximized ? "normal" : "maximized",
            zIndex: isCurrentlyMaximized ? 0 : nextZIndex,
          };
        });
      });
    },
    [getNextZIndex],
  );

  const focusWindow = useCallback(
    (windowId: string, title: string) => {
      setWindows((prev) => {
        const nextZIndex = getNextZIndex(prev);
        return prev.map((w) =>
          w.id === windowId ? { ...w, zIndex: nextZIndex, title } : w,
        );
      });
    },
    [getNextZIndex],
  );

  const moveWindow = useCallback(
    (windowId: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, position } : w)),
      );
    },
    [],
  );

  const moveItem = useCallback((itemId: string, gridCell: { id: string }) => {
    // This function would update the position of the desktop item in the grid
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, gridCellId: gridCell.id } : item,
      ),
    );
  }, []);

  const getAllWindows = useCallback(() => windows, [windows]);

  const getFocusedWindow = useCallback(() => {
    if (windows.length === 0) return null;
    return windows.reduce(
      (highest, current) => {
        if (current.state === "minimized") return highest; // Skip minimized windows
        if (!highest) return current;
        return (current.zIndex ?? 0) > (highest.zIndex ?? 0)
          ? current
          : highest;
      },
      null as Window | null,
    );
  }, [windows]);

  const contextValue: DesktopContextValue = {
    items,
    windows,
    openWindow,
    closeWindow,
    toggleMinimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    moveWindow,
    moveItem,
    getAllWindows,
    getFocusedWindow,
  };

  return {
    contextValue,
    desktopRef,
  };
};
