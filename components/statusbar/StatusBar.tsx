import React from "react";
import Taskbar from "./Taskbar";
import Menu from "../menu/Menu";
import { DateTime } from "@/components/statusbar/DateTime";
import { ModeToggle } from "./ModeToggle";
import { STATUS_BAR_HEIGHT } from "@/constants/desktop";
import { useDesktopContext } from "@/context/DesktopContext";

const StatusBar = () => {
  const { isMobile } = useDesktopContext();

  return (
    <>
      {isMobile ? (
        <div className="w-full bg-sidebar text-sidebar-foreground grid grid-cols-2 items-center border-b border-sidebar-border">
          <div className="flex ml-2 h-full items-center space-x-4 justify-self-start overflow-hidden">
            <DateTime />
          </div>
          <div className="flex items-center mr-2 justify-self-end">
            <ModeToggle />
          </div>
        </div>
      ) : (
        <div
          style={{ height: `${STATUS_BAR_HEIGHT}px` }}
          className="w-full bg-sidebar text-sidebar-foreground grid grid-cols-3 items-center px-2 border-b border-sidebar-border"
        >
          <div className="flex ml-2 h-full items-center space-x-4 justify-self-start overflow-hidden">
            <Menu />
            <Taskbar />
          </div>
          <div className="justify-self-center">
            <DateTime />
          </div>
          <div className="flex items-center mr-2 justify-self-end">
            <ModeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default StatusBar;
