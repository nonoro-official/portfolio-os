import React from 'react'
import { DragDropProvider, type DragEndEvent, type DragStartEvent } from '@dnd-kit/react'
import { useDesktopContext } from '@/context/DesktopContext';
import {DraggableDesktopItem} from '@/components/desktop/DraggableDesktopItem';
import { DesktopGridCell } from '@/components/desktop/DesktopGridCell';

const GRID_ROWS = 8;
const GRID_COLS = 18;

const DesktopGrid = () => {
  const { items, moveItem } = useDesktopContext();

  const [activeId, setActiveId] = React.useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.operation.source?.id));
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

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
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        style={{
          marginTop: "40px",
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
              <DesktopGridCell key={cellId} id={cellId} isDraggingItem={!!activeId}>
                {allocatedItem && <DraggableDesktopItem item={allocatedItem} />}
              </DesktopGridCell>
            );
          })
        )}
      </div>
    </DragDropProvider>
  )
}

export default DesktopGrid
