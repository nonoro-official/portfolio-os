"use client";

import React from "react";
import { useDesktopContext } from "@/context/DesktopContext";
import DesktopGrid from "@/components/desktop/grid/DesktopGrid";
import { DraggableWindow } from "@/components/desktop/draggables/DraggableWindow";
import type { Window } from "@/types/desktop";
import MobileNav from "@/components/mobile/MobileNav";
import StatusBar from "@/components/statusbar/StatusBar";
import { DateTime } from "../statusbar/DateTime";
import { ModeToggle } from "../statusbar/ModeToggle";
import TypewriterEffect from "../effects/TypewriterEffect";
import Dock from "@/components/dock/Dock";
import { DOCK_HEIGHT } from "@/constants/desktop";

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
    popWindowHistory,
  } = useDesktopContext();

  const bgText =
    "Hello! I'm Noah. Always learning and creating. I hope you enjoy your stay!";

  const activeWindow = focusedWindow;
  const showHome = !activeWindow || activeWindow.state === "minimized";

  const handleBack = () => {
    if (!activeWindow) return;

    console.log("Current history stack:", activeWindow.history);

    if (activeWindow.history && activeWindow.history.length > 1) {
      // Go back one page inside the window
      popWindowHistory(activeWindow.id);
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
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      {/* Status Bar */}
      {activeWindow && activeWindow.state !== "minimized" && (
        <div className="relative z-10 shrink-0">
          <StatusBar />
        </div>
      )}

      {/* Desktop & Windows Container */}
      <div className="relative z-0 flex flex-col flex-1 w-full overflow-hidden">
        <DesktopGrid topOffset={0} bottomOffset={showHome ? DOCK_HEIGHT : 0} />

        {showHome && (
          <div className="absolute inset-0 z-10 items-center justify-center mt-5 pointer-events-none">
            <div className="grid grid-cols-2 gap-4 items-center justify-items-center pointer-events-auto">
              <DateTime />
              <ModeToggle />
            </div>

            <TypewriterEffect
              text={bgText}
              delay={50}
              showCursor={false}
              enableLoop={true}
              className="top-1/2 max-w-xl text-left p-5 font-bold font-mono text-4xl text-primary/50 pointer-events-none select-none z-0 tracking-tight whitespace-pre-line"
            />
          </div>
        )}

        {windows.map((windowItem) => (
          <DraggableWindow key={windowItem.id} windowItem={windowItem}>
            {renderWindowContent(windowItem)}
          </DraggableWindow>
        ))}
      </div>

      {/* Dock */}
      {showHome && <Dock />}

      {/* Mobile Nav */}
      {activeWindow && activeWindow.state !== "minimized" && (
        <div className="relative z-10 shrink-0">
          <MobileNav
            onBack={handleBack}
            onWindow={handleWindow}
            onHome={handleHome}
          />
        </div>
      )}
    </div>
  );
};

export default MobileWrapper;
