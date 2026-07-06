import { Game, Stack, Genre, Competition, WebTech } from "@/types/game";

export const games: Game[] = [
  {
    name: "Through Your Eyes",
    url: "https://nonoro-official.itch.io/through-your-eyes?secret=gNWTtEqltzK0OR92AdSditCBOR8",
    gameTags: {
      stack: [Stack.renpy],
      genre: [Genre.vn, Genre.narrative],
      competition: [],
    },
    desc: "A visual novel demo me and my groupmates made for art appreciation class using Ren'Py.",
    about:
      "A visual novel demo me and my groupmates made for art appreciation class using Ren'Py. Full game is still in development. Stay tuned!",
    isFeatured: true,
    preview: "/images/games/through-your-eyes/preview.png",
    featuredImage: "/images/games/through-your-eyes/preview.png",
    media: [
      {
        type: "video",
        src: "/videos/through-your-eyes/teaser.mp4",
        thumbSrc: "/images/games/through-your-eyes/cover.png",
      },
      {
        type: "image",
        src: "/images/games/through-your-eyes/preview.png",
        thumbSrc: "/images/games/through-your-eyes/preview.png",
      },
    ],
  },
  {
    name: "Talinghaga: Kuwento ng mga Kaluluwa",
    url: "https://nonoro-official.itch.io/talinghaga-kwento-ng-mga-kaluluwa?secret=3tmrwbRaHRJlvjxU933ubbLsb9M",
    gameTags: {
      stack: [Stack.renpy],
      genre: [Genre.vn, Genre.narrative],
      competition: [],
    },
    desc: "A collection of Bible stories.",
    about:
      'This game is a collection of Bible stories presented in a visual novel format. Players can choose which story to experience, such as "The Rich Man and Lazarus," "The Prodigal Son," and others. It aims to bring biblical teachings closer to the modern era through a meaningful and interactive approach. As they play, players gain a deeper understanding of important values such as faith, mercy, humility, and justice.',
    isFeatured: true,
    preview: "/images/games/talinghaga/title.png",
    featuredImage: "/images/games/talinghaga/main_menu.png",
    award: ["HIBLA NG HUSAY: GENERAL EDUCATION WINNER"],
    media: [
      {
        type: "image",
        src: "/images/games/talinghaga/main_menu.png",
        thumbSrc: "/images/games/talinghaga/main_menu.png",
      },
      {
        type: "image",
        src: "/images/games/talinghaga/ss1.png",
        thumbSrc: "/images/games/talinghaga/ss1.png",
      },
      {
        type: "image",
        src: "/images/games/talinghaga/ss2.png",
        thumbSrc: "/images/games/talinghaga/ss2.png",
      },
      {
        type: "image",
        src: "/images/games/talinghaga/ss3.png",
        thumbSrc: "/images/games/talinghaga/ss3.png",
      },
    ],
  },
  {
    name: "CoDecipher: Unmask the Code",
    url: "https://github.com/Jerp010/CoDecipher",
    gameTags: {
      stack: [Stack.web],
      genre: [Genre.multi, Genre.puzzle],
      competition: [Competition.hackathon],
    },
    webTech: [
      WebTech.js,
      WebTech.html,
      WebTech.css,
      WebTech.ws,
      WebTech.ngrok,
      WebTech.node,
      WebTech.express,
    ],
    desc: "Unmask the Code, Reveal Your Skills.",
    about:
      "An interactive multiplayer coding game where players decipher masked code segments, fill in the blanks, and compete to master programming concepts. Built for the Hackathon Jam 2026 by Barney and Friends.",
    isFeatured: true,
    award: ["Best Theme Interpretation", "3rd Place Overall"],
    preview: "/images/games/codecipher/preview.png",
    featuredImage: "/images/games/codecipher/preview.png",
    media: [
      {
        type: "video",
        src: "/videos/codecipher/demo.mp4",
        thumbSrc: "/images/games/codecipher/preview.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss1.png",
        thumbSrc: "/images/games/codecipher/ss1.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss2.png",
        thumbSrc: "/images/games/codecipher/ss2.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss3.png",
        thumbSrc: "/images/games/codecipher/ss3.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss4.png",
        thumbSrc: "/images/games/codecipher/ss4.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss5.png",
        thumbSrc: "/images/games/codecipher/ss5.png",
      },
      {
        type: "image",
        src: "/images/games/codecipher/ss6.png",
        thumbSrc: "/images/games/codecipher/ss6.png",
      },
    ],
  },
  {
    name: "Rover I",
    url: "https://sbsonk.itch.io/rover-i",
    gameTags: {
      stack: [Stack.web],
      genre: [Genre.adventure, Genre.puzzle],
      competition: [Competition.gamejam],
    },
    desc: "A bubble themed 3D parkour/puzzle game made using Unity for the Global Game Jam 2025 @ CIIT.",
    about:
      "Made in 48 hours for GGJ 2025 @ CIIT: Bubbles. \n\n“Rover I” is a 3D Puzzle/Parkour Game that revolves around using a combination of your parkour skills and certain types of bubbles that augment your ability to traverse the environment.",
    isFeatured: true,
    award: ["3rd Place in Most Innovative Game"],
    preview: "/images/games/rover-i/preview.png",
    featuredImage: "/images/games/rover-i/preview.png",
    media: [
      {
        type: "image",
        src: "/images/games/rover-i/preview.png",
        thumbSrc: "/images/games/rover-i/preview.png",
      },
      {
        type: "image",
        src: "/images/games/rover-i/ss1.png",
        thumbSrc: "/images/games/rover-i/ss1.png",
      },
      {
        type: "image",
        src: "/images/games/rover-i/ss2.png",
        thumbSrc: "/images/games/rover-i/ss2.png",
      },
      {
        type: "image",
        src: "/images/games/rover-i/ss3.png",
        thumbSrc: "/images/games/rover-i/ss3.png",
      },
    ],
  },
  {
    name: "Day Trading Simulator",
    url: "https://sbsonk.itch.io/daytrading-simulator",
    gameTags: {
      stack: [Stack.raylib],
      genre: [Genre.sim],
      competition: [],
    },
    desc: "Maximize your profits and survive the chaos of day trading.",
    about:
      "Made for Data Structures & Algorithms. \n\nNavigate complex market trends powered by refined noise algorithms, manage your portfolio in real-time, and reinvest your profits into cutting-edge trading upgrades.",
    isFeatured: true,
    preview: "/images/games/day-trading-sim/preview.png",
    featuredImage: "/images/games/day-trading-sim/preview.png",
    media: [
      {
        type: "image",
        src: "/images/games/day-trading-sim/preview.png",
        thumbSrc: "/images/games/day-trading-sim/preview.png",
      },
      {
        type: "image",
        src: "/images/games/day-trading-sim/ss1.png",
        thumbSrc: "/images/games/day-trading-sim/ss1.png",
      },
      {
        type: "image",
        src: "/images/games/day-trading-sim/ss2.png",
        thumbSrc: "/images/games/day-trading-sim/ss2.png",
      },
      {
        type: "image",
        src: "/images/games/day-trading-sim/ss3.png",
        thumbSrc: "/images/games/day-trading-sim/ss3.png",
      },
      {
        type: "image",
        src: "/images/games/day-trading-sim/ss4.png",
        thumbSrc: "/images/games/day-trading-sim/ss4.png",
      },
    ],
  },
  {
    name: "Rizz Riot: The Unwanted Magnet",
    url: "https://nonoro-official.itch.io/rizz-riot-the-unwanted-magnet?secret=L2vJ4c9nQPFz23yR1lBQuUDSSMU",
    gameTags: {
      stack: [Stack.unity],
      genre: [Genre.vn, Genre.narrative],
      competition: [],
    },
    desc: "Experience the pain of being irresistibly charming.",
    about:
      "Made for Game Design class. \n\nNavigate the challenges of being irresistibly charming in a new school while desperately trying to avoid unwanted romantic attention. Can you maintain your sanity and find a semblance of normalcy amidst the chaos of your charismatic aura?",
    isFeatured: true,
    preview: "/images/games/rizz-riot/preview.png",
    featuredImage: "/images/games/rizz-riot/preview.png",
    media: [
      {
        type: "image",
        src: "/images/games/rizz-riot/preview.png",
        thumbSrc: "/images/games/rizz-riot/preview.png",
      },
    ],
  },
  {
    name: "Eden Academy",
    url: "https://nonoro-official.itch.io/eden-academy?secret=iJ4HNGWyZynN5QDdCkrhCWbaKBw",
    gameTags: {
      stack: [Stack.renpy],
      genre: [Genre.vn, Genre.narrative, Genre.sim],
      competition: [],
    },
    desc: "A visual novel dating simulator demo about supernatural characters in a magic school. I made in the VND (Visual Novel Development) club using Ren'Py.",
    about:
      "Made for Art Appreciation class. \n\nA visual novel demo me and my groupmates made for art appreciation class using Ren'Py. Full game is still in development. Stay tuned!",
    isFeatured: false,
    preview: "/images/games/eden-academy/preview.png",
    media: [
      {
        type: "image",
        src: "/images/games/eden-academy/preview.png",
        thumbSrc: "/images/games/eden-academy/preview.png",
      },
      {
        type: "image",
        src: "/images/games/eden-academy/ss1.png",
        thumbSrc: "/images/games/eden-academy/ss1.png",
      },
    ],
  },
  {
    name: "MIRO",
    url: "https://nonoro-official.itch.io/miro?secret=jCizl1APguprzIYqGpKFsxdGyo",
    gameTags: {
      stack: [Stack.renpy],
      genre: [Genre.vn, Genre.narrative, Genre.adventure],
      competition: [],
    },
    desc: "An apocalyptic adventure visual novel demo I made in the VND club using Ren'Py.",
    about:
      "A visual novel demo me and my groupmates made for art appreciation class using Ren'Py. Full game is still in development. Stay tuned!",
    isFeatured: false,
    preview: "/images/games/miro/preview.png",
    media: [
      {
        type: "image",
        src: "/images/games/miro/preview.png",
        thumbSrc: "/images/games/miro/preview.png",
      },
    ],
  },
];

export const genres = Array.from(
  new Set(games.flatMap((game) => game.gameTags.genre)),
) as Genre[];

export const stacks = Array.from(
  new Set(games.flatMap((game) => game.gameTags.stack)),
) as Stack[];

export const competitions = Array.from(
  new Set(games.flatMap((game) => game.gameTags.competition)),
) as Competition[];
