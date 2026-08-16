import { STATUS_BAR_HEIGHT, DOCK_HEIGHT } from "@/types/desktop";

interface Position {
  x: number;
  y: number;
}
interface Size {
  width: number;
  height: number;
}
interface Viewport {
  width: number;
  height: number;
}

export function clampWindowPosition(
  position: Position,
  size: Size,
  viewport: Viewport,
): Position {
  const minY = STATUS_BAR_HEIGHT;
  const maxY = Math.max(minY, viewport.height - size.height - DOCK_HEIGHT);

  const minX = 0;
  const maxX = Math.max(minX, viewport.width - size.width);

  return {
    x: Math.min(Math.max(position.x, minX), maxX),
    y: Math.min(Math.max(position.y, minY), maxY),
  };
}
