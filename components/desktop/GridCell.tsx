import React from 'react'
import { useDroppable } from '@dnd-kit/react'

interface GridCellProps {
  id: string;
  children?: React.ReactNode;
}

export const GridCell: React.FC<GridCellProps> = ({ id, children }) => {
  const {ref, isDropTarget} = useDroppable({id});

  return (
    <div ref={ref}
      className={`w-22.5 h-22.5 rounded-lg flex items-center justify-center transition-all duration-150 ${
        isDropTarget 
          ? "bg-white/15 shadow-inner scale-95 border border-white/10" 
          : "bg-transparent hover:bg-white/5"
      }`}>
      {children}
    </div>
  )
}
