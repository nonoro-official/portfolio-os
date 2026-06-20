import React from 'react'
import { useDesktopContext } from '@/context/DesktopContext';

const Taskbar = () => {
  const { getAllWindows } = useDesktopContext();

  const focusedWindow = useDesktopContext().getFocusedWindow();

  return (
    <div className="flex items-center space-x-2 h-full whitespace-nowrap overflow-x-auto overflow-y-hidden">
        {getAllWindows().map((window) => (
          <div
            key={window.id}
            className={`h-8 px-3 rounded-md flex items-center justify-center shrink-0 text-sm text-white ${
              focusedWindow?.id === window.id ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            {window.title}
          </div>
        ))}
    </div>
  )
}

export default Taskbar