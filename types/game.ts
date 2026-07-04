export enum Stack {
  web = "Web",
  unity = "Unity",
  raylib = "Raylib",
  renpy = "Ren'Py",
  yahaha = "Yahaha",
}

export enum Genre {
  vn = "Visual Novel",
  narrative = "Narrative",
  multi = "Multiplayer",
  puzzle = "Puzzle",
  adventure = "Adventure",
  sim = "Simulator",
}

export enum Competition {
  gamejam = "Game Jam",
  hackathon = "Hackathon",
}

export interface Game {
  name: string;
  url: string;
  gameTags: {
    stack: Stack[];
    genre: Genre[];
    competition: Competition[];
  };
  desc: string;
  about: string;
  isFeatured: boolean;
  preview: string;
  featuredImage?: string;
  media: (
    | { type: "image"; src: string; thumbSrc: string }
    | { type: "video"; src: string; thumbSrc: string }
  )[];
}
