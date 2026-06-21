import React from 'react'
import { useDraggable } from '@dnd-kit/react'
import { useDesktopContext } from '@/context/DesktopContext';
import { Item } from '@/types/desktop';

interface DraggableDesktopItemProps {
  item: Item;
}

export const DraggableDesktopItem: React.FC<DraggableDesktopItemProps> = ({ item }) => {
  const { openWindow } = useDesktopContext();
  const { ref } = useDraggable({
    id: item.id,
  });

  return (
    <div
      ref={ref}
      onDoubleClick={() => openWindow(item)}
      className="flex flex-col items-center justify-center w-20 text-center cursor-grab select-none active:cursor-grabbing"
    >
      {/* Icon Display */}
      <div className="text-[36px] mb-1 drop-shadow-md">
        {item.icon || (item.type === "folder" ? "📁" : "📄")}
      </div>

      {/* Label Text */}
      <span className="text-white text-xs text-shadow-sm font-medium break-all line-clamp-2 px-1">
        {item.name}
      </span>
    </div>
  )
}

