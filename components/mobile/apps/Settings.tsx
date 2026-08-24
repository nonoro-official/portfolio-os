import React from "react";
import { useWindow } from "@/hooks/useWindow";
import { skills } from "@/config/nonoro";

const Settings = () => {
  const { viewMode, navigateTo, goHome } = useWindow();
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
