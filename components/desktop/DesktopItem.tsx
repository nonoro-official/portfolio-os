import React from "react";
import { Folder, File } from "lucide-react";
import type { Item } from "@/types/desktop";
import { useDesktopContext } from "@/context/DesktopContext";

interface DesktopItemProps {
  item: Item;
}

export const DesktopItem: React.FC<DesktopItemProps> = React.memo(
  ({ item }) => {
    const {
      openWindow,
    } = useDesktopContext();

    const handleClick = () => {
      if (item.type === "file" && item.link) {
        window.open(item.link, "_blank");
      } else if (item.type === "folder") {
        openWindow(item);
      }
    };

    return (
      <div
        className="flex flex-col items-center cursor-pointer relative"
        onClick={handleClick}
      >
        <div className="p-2 flex items-center justify-center rounded-lg shadow-md border bg-neutral-800/30 backdrop-blur-xl border-neutral-800/60">
          {item.type === "folder" ? (
            <Folder className="size-10 text-yellow-500" />
          ) : (
            <File className="size-10 text-blue-500" />
          )}
        </div>
        <span className="mt-2 text-sm text-center">{item.name}</span>
      </div>
    );
  }
);

DesktopItem.displayName = "DesktopItem";