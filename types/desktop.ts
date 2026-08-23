export interface Item {
  id: string;
  name: string;
  type: "file" | "folder" | "app";
  parentId: string | null;
  content?: Item[];
  icon?: string;
  link?: string;
  path: string;
  position?: Position;
  gridCellId?: { id: string; mobileId: string };
}

export interface Window {
  id: string;
  itemId: string;
  title: string;
  position: Position;
  size: { width: number; height: number };
  zIndex: number;
  state: "normal" | "minimized" | "maximized";
  url?: string;
  content?: string;
}

export interface Position {
  x: number;
  y: number;
}
