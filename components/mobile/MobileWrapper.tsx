"use client";

import React from "react";
import { useDesktopContext } from "@/context/DesktopContext";
import DesktopGrid from "@/components/desktop/grid/DesktopGrid";
import { DraggableWindow } from "@/components/desktop/draggables/DraggableWindow";
import type { Window } from "@/types/desktop";
import MobileNav from "@/components/mobile/MobileNav";
import StatusBar from "@/components/statusbar/StatusBar";

interface MobileWrapperProps {
  renderWindowContent: (windowItem: Window) => React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({
  renderWindowContent,
}) => {
  const {
    windows,
    focusedWindow,
    closeWindow,
    toggleMinimizeWindow,
    focusWindow,
  } = useDesktopContext();

  const activeWindow = focusedWindow;

  const handleBack = () => {
    if (!activeWindow) return;

    const visibleWindows = windows
      .filter((window) => window.state !== "minimized")
      .sort((left, right) => (left.zIndex ?? 0) - (right.zIndex ?? 0));
    const currentIndex = visibleWindows.findIndex(
      (window) => window.id === activeWindow.id,
    );
    const previousWindow =
      currentIndex > 0 ? visibleWindows[currentIndex - 1] : null;

    if (previousWindow) {
      focusWindow(previousWindow.id, previousWindow.title);
      return;
    }

    toggleMinimizeWindow(activeWindow.id);
  };

  const handleWindow = () => {
    if (!activeWindow) return;
    toggleMinimizeWindow(activeWindow.id);
  };

  const handleHome = () => {
    if (!activeWindow) return;
    closeWindow(activeWindow.id);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <StatusBar />
      <DesktopGrid topOffset={0} bottomOffset={0} />

      {windows.map((windowItem) => (
        <DraggableWindow key={windowItem.id} windowItem={windowItem}>
          {renderWindowContent(windowItem)}
        </DraggableWindow>
      ))}

      {activeWindow && activeWindow.state !== "minimized" && (
        <MobileNav
          onBack={handleBack}
          onWindow={handleWindow}
          onHome={handleHome}
        />
      )}
    </div>
  );
};

export default MobileWrapper;
