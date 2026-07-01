"use client";
import React from "react";
import { DesktopContext } from "@/context/DesktopContext";
import { DraggableWindow } from "@/components/desktop/draggables/DraggableWindow";
import { useDesktop } from "@/hooks/useDesktop";
import { Window } from "@/types/desktop";
import DesktopGrid from "@/components/desktop/grid/DesktopGrid";
import StatusBar from "@/components/statusbar/StatusBar";
import Dock from "@/components/dock/Dock";
import Browser from "@/components/desktop/apps/Browser";
import GameStore from "@/components/desktop/apps/GameStore";
import SoftwareCenter from "@/components/desktop/apps/SoftwareCenter";
import About from "./apps/About";

const DesktopWrapper: React.FC = () => {
  const { contextValue, desktopRef } = useDesktop();

  const renderItemContent = (windowItem: Window) => {
    switch (windowItem.itemId) {
      case "browser":
        return <Browser />;
      case "game-store":
        return <GameStore />;
      case "software-center":
        return <SoftwareCenter />;
      case "about-me":
        return <About windowItem={windowItem} />;
      default:
        return (
          <div className="p-4 font-mono text-xs text-zinc-500">
            {windowItem.itemId}
          </div>
        );
    }
  };

  return (
    <DesktopContext.Provider value={contextValue}>
      <div
        ref={desktopRef}
        className="flex h-screen w-screen overflow-hidden select-none"
      >
        <div className="flex-col relative w-full h-full bg-background md:shadow-xl">
          <StatusBar />
          {/* Desktop Items Grid with Drag Support */}
          <DesktopGrid />

          {/* Windows */}
          {contextValue.windows.map((windowItem) => (
            <DraggableWindow key={windowItem.id} windowItem={windowItem}>
              {renderItemContent(windowItem)}
            </DraggableWindow>
          ))}

          <Dock />
          <p className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center">
            © 2026 Noah Peñaranda
          </p>
        </div>
      </div>
    </DesktopContext.Provider>
  );
};

export default DesktopWrapper;
