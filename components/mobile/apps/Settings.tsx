import React from "react";
import { SkillsView } from "@/components/desktop/apps/TaskManager";

const Settings = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background w-full h-full items-center justify-center flex">
      <SkillsView />
    </div>
  );
};

export default Settings;
