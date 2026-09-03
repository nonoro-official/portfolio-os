import React from "react";
import { useDraggable } from "@dnd-kit/react";
import { useDesktopContext } from "@/context/DesktopContext";
import { Item } from "@/types/desktop";

interface DraggableDesktopItemProps {
  item: Item;
}

export const DraggableDesktopItem: React.FC<DraggableDesktopItemProps> = ({
  item,
}) => {
  const { openWindow, isMobile } = useDesktopContext();
  const { ref } = useDraggable({ id: item.id });

  const handleOpenItem = () => openWindow(item);

  const eventHandlers = isMobile
    ? { onClick: handleOpenItem }
    : { onDoubleClick: handleOpenItem };

  return (
    <div
      ref={ref}
      {...eventHandlers}
      className="flex flex-col items-center justify-center w-full max-w-full text-center cursor-grab select-none active:cursor-grabbing p-1"
    >
      {/* Icon Display */}
      <div className="text-[36px] mb-1 drop-shadow-md">{item.icon}</div>

      {/* Label Text */}
      <span className="text-foreground text-xs text-shadow-sm font-medium wrap-break-words line-clamp-2 px-1">
        {item.name}
      </span>
    </div>
  );
};
