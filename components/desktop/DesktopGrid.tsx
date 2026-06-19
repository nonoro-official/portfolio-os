import React from 'react'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { useDesktopContext } from '@/context/DesktopContext';
import {DraggableDesktopItem} from '@/components/desktop/DraggableDesktopItem';
import { GridCell } from '@/components/desktop/GridCell';

const GRID_ROWS = 6;
const GRID_COLS = 10;

const DesktopGrid = () => {
  const { items, moveItem } = useDesktopContext();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { operation } = event;
    const draggedItemId = operation.source?.id;
    const targetCellId = operation.target?.id;

    if (!draggedItemId || !targetCellId) return;

    if (draggedItemId && typeof targetCellId === "string" && targetCellId.includes("-")) {
      moveItem(String(draggedItemId), { id: targetCellId });
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${GRID_ROWS}, 90px)`,
          gridTemplateColumns: `repeat(${GRID_COLS}, 90px)`,
          gap: "15px",
          padding: "20px",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1, // Kept below your floating windows layer
        }}
      >
        {Array.from({ length: GRID_ROWS }).map((_, rowIndex) =>
          Array.from({ length: GRID_COLS }).map((_, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`;
            
            const allocatedItem = items.find(
              (item) => item.gridCellId === cellId
            );

            return (
              <GridCell key={cellId} id={cellId}>
                {allocatedItem && <DraggableDesktopItem item={allocatedItem} />}
              </GridCell>
            );
          })
        )}
      </div>
    </DragDropProvider>
  )
}

export default DesktopGrid
