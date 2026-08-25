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
import AppCenter from "@/components/desktop/apps/AppCenter";
import About from "@/components/desktop/apps/About";
import TaskManager from "@/components/desktop/apps/TaskManager";
import Reader from "@/components/desktop/apps/Reader";
import Settings from "@/components/mobile/apps/Settings";
import Clock from "@/components/mobile/apps/Clock";
import Contacts from "@/components/mobile/apps/Contacts";
import TypewriterEffect from "@/components/effects/TypewriterEffect";
import MobileWrapper from "@/components/mobile/MobileWrapper";

const DesktopWrapper: React.FC = () => {
  const { contextValue, desktopRef } = useDesktop();
  const bgText =
    "Hello!\nI'm Noah.\nAlways learning \nand creating.\nI hope you enjoy \nyour stay!";

  const renderItemContent = (windowItem: Window) => {
    switch (windowItem.itemId) {
      case "websites":
        return <Browser />;
      case "games":
        return <GameStore />;
      case "apps":
        return <AppCenter />;
      case "about":
        return <About windowItem={windowItem} />;
      case "profile":
        return <TaskManager />;
      case "resume":
        return <Reader />;
      case "skills":
        return <Settings />;
      case "history":
        return <Clock />;
      case "contacts":
        return <Contacts />;
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
        {contextValue.isMobile ? (
          <MobileWrapper renderWindowContent={renderItemContent} />
        ) : (
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

            <TypewriterEffect
              text={bgText}
              delay={50}
              showCursor={false}
              enableLoop={true}
              className="absolute right-12 top-1/2 -translate-y-1/2 max-w-xl text-right font-bold font-mono text-7xl text-primary/50 pointer-events-none select-none z-0 tracking-tight whitespace-pre-line"
            />

            <Dock />
            <p className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center">
              © 2026 Noah Peñaranda
            </p>
          </div>
        )}
      </div>
    </DesktopContext.Provider>
  );
};

export default DesktopWrapper;
