"use client";
import React from "react";
import { DesktopContext } from "@/context/DesktopContext";
import { DraggableWindow } from "@/components/desktop/DraggableWindow";
import { useDesktop } from "@/hooks/useDesktop";
import DesktopGrid from "@/components/desktop/DesktopGrid";

const DesktopWrapper: React.FC = () => {
  const { contextValue, desktopRef } = useDesktop();

  return (
    <DesktopContext.Provider value={contextValue}>
      <div ref={desktopRef} className="flex h-screen w-screen overflow-hidden select-none">
        <div className="relative w-full h-full bg-background md:shadow-xl">
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
        </div>
      </div>
    </DesktopContext.Provider>
  );
};

export default DesktopWrapper;