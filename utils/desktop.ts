import {
  STATUS_BAR_HEIGHT,
  DOCK_HEIGHT,
  WINDOW_MARGIN,
} from "@/constants/desktop";

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

export const getViewportConfig = () => {
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const maxWidth = Math.max(0, viewport.width - WINDOW_MARGIN * 2);
  const maxHeight = Math.max(
    0,
    viewport.height - STATUS_BAR_HEIGHT - DOCK_HEIGHT - WINDOW_MARGIN * 2,
  );
  const isMobile = viewport.width < 640;

  return { viewport, maxWidth, maxHeight, isMobile };
};
