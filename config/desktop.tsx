import type { Item } from "@/types/desktop";

export const initialItems: Item[] = [
  {
    id: "games",
    name: "Games",
    type: "app",
    parentId: null,
    path: "/desktop/Games",
    link: "",
    gridCellId: "0-0"
  },
  {
    id: "browser",
    name: "Browser",
    type: "app",
    parentId: null,
    path: "/desktop/Browser",
    link: "",
    gridCellId: "1-0"
  },
  {
    id: "tools",
    name: "CLI_Tools",
    type: "app",
    parentId: null,
    path: "/desktop/CLI_Tools.sh",
    link: "",
    gridCellId: "2-0"
  },
  {
    id: "mobile",
    name: "Apps",
    type: "app",
    parentId: null,
    path: "/desktop/Mobile_Apps",
    link: "",
    gridCellId: "3-0"
  },
  {
    id: "systems",
    name: "Systems",
    type: "folder",
    parentId: null,
    path: "/desktop/Systems",
    link: "",
    gridCellId: "4-0"
  },
  {
    id: "work-experience",
    name: "Work.md",
    type: "file",
    parentId: null,
    path: "/desktop/Work.md",
    gridCellId: "0-1"
  },
  {
    id: "resume-download",
    name: "Resume.pdf",
    type: "file",
    parentId: null,
    path: "/desktop/Download_Resume.pdf",
    link: "/resume.pdf", // Triggers your local public asset resume download
    gridCellId: "1-1"
  },
  {
    id: "gallery",
    name: "Gallery",
    type: "folder",
    parentId: null,
    path: "/desktop/Gallery",
    gridCellId: "2-1"
  },
  {
    id: "skills",
    name: "Settings",
    type: "app",
    parentId: null,
    path: "/desktop/Settings",
    gridCellId: "0-2"
  },
  {
    id: "readme",
    name: "README.md",
    type: "file",
    parentId: null,
    path: "/desktop/README.md",
    gridCellId: "1-2"
  },
];
