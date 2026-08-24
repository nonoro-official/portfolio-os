import type { Item } from "@/types/desktop";

export const initialItems: Item[] = [
  {
    icon: "📦",
    id: "apps",
    name: "Apps",
    gridCellId: { id: "0-0", mobileId: "5-0" },
  },
  {
    icon: "🌐",
    id: "websites",
    name: "Web",
    gridCellId: { id: "1-0", mobileId: "5-1" },
  },
  {
    icon: "🎮",
    id: "games",
    name: "Games",
    gridCellId: { id: "2-0", mobileId: "5-2" },
  },
  // {
  //   icon: "🖥️",
  //   id: "tools",
  //   name: "CLI_Tools",
  //   gridCellId: { id: "3-0", mobileId: "5-3" },
  // },
  {
    icon: "ℹ️",
    id: "about",
    name: "About",
    gridCellId: { id: "0-1", mobileId: "6-0" },
  },
  {
    icon: "💻",
    id: "profile",
    name: "Profile",
    gridCellId: { id: "1-1" },
  },
  {
    icon: "⚙️",
    id: "skills",
    name: "Skills",
    gridCellId: { mobileId: "6-1" },
  },
  {
    icon: "🕰️",
    id: "history",
    name: "History",
    gridCellId: { mobileId: "6-2" },
  },
  {
    icon: "👤",
    id: "contacts",
    name: "Contacts",
    gridCellId: { mobileId: "6-3" },
  },
  // {
  //   icon: "🖼️",
  //   id: "gallery",
  //   name: "Gallery",
  //   gridCellId: "2-1",
  // },
  {
    icon: "📄",
    id: "resume",
    name: "Resume.pdf",
    link: "/resume.pdf",
    gridCellId: { id: "0-2", mobileId: "5-3" },
  },
];
