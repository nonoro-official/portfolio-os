export enum Stack {
  web = "Web",
  unity = "Unity",
  raylib = "Raylib",
  renpy = "Ren'Py",
  yahaha = "Yahaha",
}

export enum WebTech {
  js = "JavaScript",
  html = "HTML",
  css = "CSS",
  ws = "WebSocket",
  ngrok = "Ngrok",
  node = "Node.js",
  express = "Express.js",
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
  webTech?: WebTech[];
  desc: string;
  about: string;
  isFeatured: boolean;
  award?: string[];
  preview: string;
  featuredImage?: string;
  media: (
    | { type: "image"; src: string; thumbSrc: string }
    | { type: "video"; src: string; thumbSrc: string }
  )[];
}
