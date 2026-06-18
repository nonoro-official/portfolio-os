import type { Item } from "@/types/desktop";

// Seeded random number generator for deterministic results across server/client
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

const rng = new SeededRandom(876532); // Fixed seed for consistent results

// Helper function to generate a random ID
const generateId = (): string => {
  return Math.floor(rng.next() * 1000000000).toString(36);
};

// Helper function to generate a random name
const generateName = (type: "folder" | "file"): string => {
  const prefixes = {
    folder: ["Folder", "Directory", "Project", "Archive"],
    file: ["Document", "Image", "Note", "Report"],
  };
  const prefix =
    prefixes[type][Math.floor(rng.next() * prefixes[type].length)];
  return `${prefix}_${Math.floor(rng.next() * 1000)}`;
};

// Helper function to generate a random link (for files)
const generateLink = (): string => {
  return `https://example.com/${Math.floor(rng.next() * 1000000000).toString(36)}`;
};

// Recursive function to generate a random file system structure
const generateFileSystem = (
  depth: number,
  maxDepth: number,
  minItemsPerFolder: number,
  maxItemsPerFolder: number,
  parentId: string | null = null,
  parentPath: string = "/desktop"
): Item[] => {
  if (depth > maxDepth) return [];

  const items: Item[] = [];
  const numItems =
    Math.floor(rng.next() * (maxItemsPerFolder - minItemsPerFolder)) + minItemsPerFolder;

  for (let i = 0; i < numItems; i++) {
    const isFolder = rng.next() > 0.5; // 50% chance to be a folder
    const id = generateId();
    const name = generateName(isFolder ? "folder" : "file");
    const path = `${parentPath}/${name}`;

    const item: Item = {
      id,
      name,
      type: isFolder ? "folder" : "file",
      parentId,
      path,
    };

    if (isFolder) {
      item.content = generateFileSystem(
        depth + 1,
        maxDepth,
        minItemsPerFolder,
        maxItemsPerFolder,
        id,
        path
      );
    } else {
      item.link = generateLink();
    }

    items.push(item);
  }

  return items;
};

// Function to generate the initial file system with random data
export const generateInitialItems = (): Item[] => {
  return generateFileSystem(2, 6, 4, 8); // Adjust depth and maxItemsPerFolder as needed
};

// Example usage
export const initialItems: Item[] = generateInitialItems();