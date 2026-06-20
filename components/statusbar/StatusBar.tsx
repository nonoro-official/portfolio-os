import React from 'react'
import Taskbar from './Taskbar';
import Menu from '../menu/Menu';
import WindowTitle from './WindowTitle';

const StatusBar = () => {
  return (
    <div className="w-full h-12 max-h-12 bg-gray-800 grid grid-cols-3 items-center px-2 mb-3">
        <div className="flex ml-2 h-full items-center space-x-4 justify-self-start overflow-hidden">
            <Menu />
            <Taskbar />
        </div>
        <div className="justify-self-center">
            <WindowTitle />
        </div>
        <div className="flex items-center mr-2 justify-self-end">
            {/* Additional status bar items can be added here */}
        </div>
    </div>
  )
}

export default StatusBar