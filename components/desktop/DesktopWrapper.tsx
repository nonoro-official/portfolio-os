"use client";
import React from "react";
import { DesktopContext } from "@/context/DesktopContext";
import { DraggableWindow } from "@/components/desktop/draggables/DraggableWindow";
import { useDesktop } from "@/hooks/useDesktop";
import DesktopGrid from "@/components/desktop/grid/DesktopGrid";
import StatusBar from "@/components/statusbar/StatusBar";
import Dock from "@/components/dock/Dock";

const DesktopWrapper: React.FC = () => {
  const { contextValue, desktopRef } = useDesktop();

  return (
    <DesktopContext.Provider value={contextValue}>
      <div ref={desktopRef} className="flex h-screen w-screen overflow-hidden select-none">
        <div className="flex-col relative w-full h-full bg-background md:shadow-xl">
          <StatusBar />
          {/* Desktop Items Grid with Drag Support */}
          <DesktopGrid />

          {/* Windows */}
          {contextValue.windows.map((windowItem) => (
            <DraggableWindow key={windowItem.id} windowItem={windowItem}>
              <div>
                <p>Window Content for {windowItem.itemId}</p>
              </div>
            </DraggableWindow>
          ))}

          <Dock />
        </div>
      </div>
    </DesktopContext.Provider>
  );
};

export default DesktopWrapper;