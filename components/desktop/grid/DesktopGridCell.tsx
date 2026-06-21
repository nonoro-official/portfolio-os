import React from 'react'
import { useDroppable } from '@dnd-kit/react'

interface DesktopGridCellProps {
  id: string;
  children?: React.ReactNode;
  isDraggingItem?: boolean;
}

export const DesktopGridCell: React.FC<DesktopGridCellProps> = ({ id, children, isDraggingItem }) => {
  const { ref, isDropTarget } = useDroppable({ id });

  // Determine if the cell is active or needs to be interacted with
  const hasItem = Boolean(children);
  
  // The cell is only interactive if it contains an item, OR if a drag operation is active
  const isInteractive = hasItem || isDraggingItem;

  return (
    <div 
      ref={ref}
      className={`w-22.5 h-22.5 rounded-lg flex items-center justify-center transition-all duration-150 ${
        !isInteractive 
          ? "pointer-events-none bg-transparent"
          : isDropTarget 
            ? "bg-white/15 shadow-inner scale-95 border border-white/10"
            : "bg-transparent hover:bg-white/5"
      }`}
    >
      {children}
    </div>
  )
}