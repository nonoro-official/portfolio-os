import React from "react";

interface WindowSidebarProps {
  items: {
    title: string;
    value: string;
    icon: React.ReactNode;
  }[];
  activeItem?: string;
  onValueChange?: (value: string) => void;
  logo?: React.ReactNode;
}

export const WindowSidebar = ({
  items,
  activeItem,
  onValueChange,
  logo,
}: WindowSidebarProps) => {
  return (
    <aside className="flex flex-col h-full w-64 bg-sidebar border-r border-sidebar-border text-sidebar-foreground p-4 shrink-0 select-none">
      {/* Logo Container */}
      {logo && <div className="mb-6 px-2 flex items-center">{logo}</div>}

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1 w-full">
        {items.map((item) => {
          const isActive = activeItem === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onValueChange?.(item.value)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring text-left
                ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                    : "text-sidebar-muted-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground"
                }
              `}
            >
              {/* Icon */}
              {item.icon && (
                <span
                  className={`shrink-0 transition-colors ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-muted-foreground/80"}`}
                >
                  {item.icon}
                </span>
              )}

              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
