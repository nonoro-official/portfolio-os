import { useState, useCallback, useRef } from "react";
import type { Item, Window } from "@/types/desktop";
import { initialItems } from "@/config/desktop";

export interface DesktopContextValue {
  items: Item[];
  windows: Window[];
  openWindow: (item: Item) => void;
  closeWindow: (windowId: string) => void;
  toggleMinimizeWindow: (windowId: string) => void;
  toggleMaximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, position: { x: number; y: number }) => void;
}

export const useDesktop = () => {
  const [items] = useState<Item[]>(initialItems);
  const [windows, setWindows] = useState<Window[]>([]);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Helper to get the next highest zIndex
  const getNextZIndex = useCallback((currentWindows: Window[]) => {
    if (currentWindows.length === 0) return 1;
    return Math.max(...currentWindows.map((w) => w.zIndex)) + 1;
  }, []);

  const openWindow = useCallback((item: Item) => {
    setWindows((prev) => {
      // Check if a window for this item is already open
      const existingWindow = prev.find((w) => w.itemId === item.id);
      
      if (existingWindow) {
        // If it exists, bring it to the front and make sure it's visible
        const nextZIndex = getNextZIndex(prev);
        return prev.map((w) =>
          w.itemId === item.id
            ? { ...w, zIndex: nextZIndex, state: w.state === "minimized" ? "normal" : w.state }
            : w
        );
      }

      // Otherwise, create a new window
      const nextZIndex = getNextZIndex(prev);
      return [
        ...prev,
        {
          id: Date.now().toString(),
          itemId: item.id,
          position: { x: 50 + prev.length * 20, y: 50 + prev.length * 20 },
          size: { width: 400, height: 300 },
          zIndex: nextZIndex,
          state: "normal",
        },
      ];
    });
  }, [getNextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const toggleMinimizeWindow = useCallback((windowId: string) => {
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
          zIndex: isCurrentlyMinimized ? nextZIndex : w.zIndex,
        };
      });
    });
  }, [getNextZIndex]);

  const toggleMaximizeWindow = useCallback((windowId: string) => {
  setWindows((prev) => {
    const nextZIndex = getNextZIndex(prev); 
    
    return prev.map((w) => {
      if (w.id !== windowId) return w;

      const isCurrentlyMaximized = w.state === "maximized";
      return {
        ...w,
        state: isCurrentlyMaximized ? "normal" : "maximized",
        zIndex: isCurrentlyMaximized ? nextZIndex : w.zIndex,
      };
    });
  });
}, [getNextZIndex]);

  const focusWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const nextZIndex = getNextZIndex(prev);
      return prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: nextZIndex } : w
      );
    });
  }, [getNextZIndex]);

  const moveWindow = useCallback(
    (windowId: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, position } : w))
      );
    },
    []
  );

  const contextValue: DesktopContextValue = {
    items,
    windows,
    openWindow,
    closeWindow,
    toggleMinimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    moveWindow,
  };

  return {
    contextValue,
    desktopRef,
  };
};