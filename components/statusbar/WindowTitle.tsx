import React from 'react'
import { useDesktopContext } from '@/context/DesktopContext';

const WindowTitle = () => {
  const { getFocusedWindow, focusWindow } = useDesktopContext();
  
  if (!getFocusedWindow()) {
    return null; // No windows open, so no title to display
  }

  const focusedWindow = getFocusedWindow()!; // We know this is not null due to the check above

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`p-2 rounded-md ${
          focusedWindow.state === "normal" ? 'text-white' : 'text-white/70'
        }`}
        onClick={() => focusWindow(focusedWindow.id, focusedWindow.title)}
        onMouseUp={() => focusWindow(focusedWindow.id, focusedWindow.title)}
      >
        {focusedWindow.title}
      </div>
    </div>
  );
};

export default WindowTitle;