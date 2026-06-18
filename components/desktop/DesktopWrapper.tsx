"use client";
import React from "react";
import { DesktopContext } from "@/context/DesktopContext";
import { DraggableWindow } from "@/components/desktop/DraggableWindow";
import { useDesktop } from "@/hooks/useDesktop";
import { DesktopItem } from "@/components/desktop/DesktopItem";

const DesktopWrapper: React.FC = () => {
  const { contextValue, desktopRef } = useDesktop();

  return (
    <DesktopContext.Provider value={contextValue}>
      <div ref={desktopRef} className="flex h-screen w-screen overflow-hidden select-none">
        <div className="relative p-2 w-full h-full bg-background md:shadow-xl">
          {/* Desktop Items Grid */}
          <div className="grid grid-cols-6 gap-4 p-4 pointer-events-auto">
            {contextValue.items
              .filter((item) => !item.parentId) // Only show top-level items
              .map((item) => (
                <DesktopItem key={item.id} item={item} />
              ))}
          </div>

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