import React, { useState, useEffect } from "react";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import { useDesktopContext } from "@/context/DesktopContext";
import { DraggableDesktopItem } from "@/components/desktop/draggables/DraggableDesktopItem";
import { DesktopGridCell } from "@/components/desktop/grid/DesktopGridCell";
import {
  STATUS_BAR_HEIGHT,
  DOCK_HEIGHT,
  CELL_SIZE,
  CELL_GAP,
  PADDING,
} from "@/constants/desktop";

interface DesktopGridProps {
  topOffset?: number;
  bottomOffset?: number;
}

const DesktopGrid = ({
  topOffset = STATUS_BAR_HEIGHT,
  bottomOffset = DOCK_HEIGHT,
}: DesktopGridProps) => {
  const { items, moveItem, isMobile } = useDesktopContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });

  // Track dynamic sizing so it can shrink on mobile
  const [dynamicSizes, setDynamicSizes] = useState({
    size: CELL_SIZE,
    gap: CELL_GAP,
  });

  useEffect(() => {
    const calculateGrid = () => {
      const availableWidth = window.innerWidth - PADDING * 2;
      const availableHeight =
        window.innerHeight - topOffset - bottomOffset - PADDING;

      let size = CELL_SIZE;
      let gap = CELL_GAP;
      let cols = 0;
      let rows = 0;

      if (isMobile) {
        cols = 4;
        gap = 12;

        // Calculate maximum cell size that allows 4 columns to fit
        size = Math.floor((availableWidth - gap * (cols - 1)) / cols);

        // Calculate rows based on the dynamic size
        rows = Math.floor((availableHeight + gap) / (size + gap));
      } else {
        // Desktop Logic
        cols = Math.floor((availableWidth + gap) / (size + gap));
        rows = Math.floor((availableHeight + gap) / (size + gap));
      }

      setDynamicSizes({ size, gap });
      setGridDimensions({ rows: Math.max(1, rows), cols: Math.max(1, cols) });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [topOffset, bottomOffset, isMobile]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.operation.source?.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

    if (event.canceled) return;

    const { operation } = event;
    const draggedItemId = operation.source?.id;
    const targetCellId = operation.target?.id;

    if (!draggedItemId || !targetCellId) return;

    if (
      draggedItemId &&
      typeof targetCellId === "string" &&
      targetCellId.includes("-")
    ) {
      moveItem(String(draggedItemId), {
        id: targetCellId,
        mobileId: targetCellId,
      });
    }
  };

  // Create a Map for O(1) lookups to avoid O(N*M) nested loops
  const itemsByCell = new Map(
    items.map((item) => [
      isMobile ? item.gridCellId?.mobileId : item.gridCellId?.id,
      item,
    ]),
  );

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        style={{
          marginTop: `${topOffset}px`,
          display: "grid",
          gridTemplateRows: `repeat(${gridDimensions.rows}, ${dynamicSizes.size}px)`,
          gridTemplateColumns: isMobile
            ? "repeat(4, 1fr)"
            : `repeat(${gridDimensions.cols}, ${dynamicSizes.size}px)`,
          gap: `${dynamicSizes.gap}px`,
          padding: `${PADDING}px`,
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          boxSizing: "border-box",
          height: `calc(100vh - ${topOffset}px - ${bottomOffset}px)`,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) =>
          Array.from({ length: gridDimensions.cols }).map((_, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`;

            // Fast O(1) lookup
            const allocatedItem = itemsByCell.get(cellId);

            return (
              <DesktopGridCell
                key={cellId}
                id={cellId}
                isDraggingItem={!!activeId}
                size={dynamicSizes.size}
              >
                {allocatedItem && <DraggableDesktopItem item={allocatedItem} />}
              </DesktopGridCell>
            );
          }),
        )}
      </div>
    </DragDropProvider>
  );
};

export default DesktopGrid;
