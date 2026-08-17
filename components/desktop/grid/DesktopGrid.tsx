import React, { useState, useEffect } from "react";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import { useDesktopContext } from "@/context/DesktopContext";
import { DraggableDesktopItem } from "@/components/desktop/draggables/DraggableDesktopItem";
import { DesktopGridCell } from "@/components/desktop/grid/DesktopGridCell";
import { STATUS_BAR_HEIGHT, DOCK_HEIGHT } from "@/constants/desktop";

const CELL_SIZE = 90;
const CELL_GAP = 15;
const PADDING = 20;

const DesktopGrid = () => {
  const { items, moveItem } = useDesktopContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      const availableWidth = window.innerWidth - PADDING * 2;
      const availableHeight =
        window.innerHeight - STATUS_BAR_HEIGHT - DOCK_HEIGHT - PADDING;

      const cols = Math.floor(
        (availableWidth + CELL_GAP) / (CELL_SIZE + CELL_GAP),
      );
      const rows = Math.floor(
        (availableHeight + CELL_GAP) / (CELL_SIZE + CELL_GAP),
      );

      setGridDimensions({ rows: Math.max(1, rows), cols: Math.max(1, cols) });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

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
      moveItem(String(draggedItemId), { id: targetCellId });
    }
  };

  // Create a Map for O(1) lookups to avoid O(N*M) nested loops
  const itemsByCell = new Map(items.map((item) => [item.gridCellId, item]));

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        style={{
          marginTop: `${STATUS_BAR_HEIGHT}px`,
          display: "grid",
          gridTemplateRows: `repeat(${gridDimensions.rows}, ${CELL_SIZE}px)`,
          gridTemplateColumns: `repeat(${gridDimensions.cols}, ${CELL_SIZE}px)`,
          gap: `${CELL_GAP}px`,
          padding: `${PADDING}px`,
          height: `calc(100vh - ${STATUS_BAR_HEIGHT}px - ${DOCK_HEIGHT}px)`,
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
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
