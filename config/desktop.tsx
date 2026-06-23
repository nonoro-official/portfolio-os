import type { Item } from "@/types/desktop";

export const initialItems: Item[] = [
  {
    id: "games",
    name: "Games",
    type: "app",
    parentId: null,
    path: "/desktop/Games",
    link: "",
  },
  {
    id: "browser",
    name: "Browser",
    type: "app",
    parentId: null,
    path: "/desktop/Browser",
    link: "",
  },
  {
    id: "tools",
    name: "CLI_Tools",
    type: "app",
    parentId: null,
    path: "/desktop/CLI_Tools.sh",
    link: "",
  },
  {
    id: "mobile",
    name: "Apps",
    type: "app",
    parentId: null,
    path: "/desktop/Mobile_Apps",
    link: "",
  },
  {
    id: "work-experience",
    name: "Work.md",
    type: "file",
    parentId: null,
    path: "/desktop/Work.md",
  },
  {
    id: "resume-download",
    name: "Resume.pdf",
    type: "file",
    parentId: null,
    path: "/desktop/Download_Resume.pdf",
    link: "/resume.pdf", // Triggers your local public asset resume download
  },
  {
    id: "gallery",
    name: "Gallery",
    type: "folder",
    parentId: null,
    path: "/desktop/Gallery",
  },
  {
    id: "skills",
    name: "Settings",
    type: "app",
    parentId: null,
    path: "/desktop/Settings",
  },
  {
    id: "readme",
    name: "README.md",
    type: "file",
    parentId: null,
    path: "/desktop/README.md",
  },
];
