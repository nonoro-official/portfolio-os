import React from "react";
import Taskbar from "./Taskbar";
import Menu from "../menu/Menu";
import { DateTime } from "@/components/statusbar/DateTime";
import { ModeToggle } from "./ModeToggle";

const StatusBar = () => {
  return (
    <div className="w-full h-12 max-h-12 bg-sidebar text-sidebar-foreground grid grid-cols-3 items-center px-2 border-b border-sidebar-border">
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
  );
};

export default StatusBar;
