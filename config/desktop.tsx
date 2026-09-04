import type { Item } from "@/types/desktop";

export const initialItems: Item[] = [
  {
    icon: "📦",
    id: "apps",
    name: "Apps",
    gridCellId: { id: "0-0", mobileId: "0-0" },
  },
  {
    icon: "🌐",
    id: "websites",
    name: "Web",
    gridCellId: { id: "1-0", mobileId: "0-1" },
  },
  {
    icon: "🎮",
    id: "games",
    name: "Games",
    gridCellId: { id: "2-0", mobileId: "0-2" },
  },
  {
    icon: "ℹ️",
    id: "about",
    name: "About",
    gridCellId: { id: "0-1", mobileId: "1-0" },
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
    gridCellId: { mobileId: "1-1" },
  },
  {
    icon: "🕰️",
    id: "history",
    name: "History",
    gridCellId: { mobileId: "1-2" },
  },
  {
    icon: "👤",
    id: "contacts",
    name: "Contacts",
    gridCellId: { mobileId: "1-3" },
  },
  {
    icon: "📄",
    id: "resume",
    name: "Resume",
    link: "/resume.pdf",
    gridCellId: { id: "0-2", mobileId: "0-3" },
  },
];
