import {
  App,
  Stack,
  Frontend,
  Backend,
  Language,
  Database,
  Device,
  OS,
} from "../types/apps";

export const app: App[] = [
  {
    name: "ToothHaven",
    url: "https://github.com/nonoro-official/Dental-Clinic-Management-System.git",
    appTags: {
      stack: [Stack.native],
      frontend: [Frontend.javafx],
      backend: [Backend.jee],
      database: [Database.mysql],
      language: [Language.java],
      device: [Device.desktop],
      os: [OS.windows],
    },
    desc: "A Dental Clinic Management System for managing patient records, appointments, and billing. I developed the CRUD of this system using Java as freelance work.",
    about:
      "A visual novel demo me and my groupmates made for art appreciation class using Ren'Py. Full game is still in development. Stay tuned!",
    isFeatured: true,
    logo: { type: "emoji", value: "🦷" },
    featuredImage: "/images/apps/toothhaven/preview.png",
    media: [
      {
        type: "image",
        src: "/images/apps/toothhaven/preview.png",
        thumbSrc: "/images/apps/toothhaven/preview.png",
      },
    ],
  },
  {
    name: "UniMart",
    url: "https://github.com/nonoro-official/UniMart.git",
    appTags: {
      stack: [Stack.native],
      frontend: [Frontend.flutter],
      backend: [],
      database: [Database.firebase, Database.firestore],
      language: [Language.dart],
      device: [Device.mobile],
      os: [OS.android],
    },
    desc: "A centralized campus e-commerce platform that brings student-led businesses into one accessible space, making it easier for the campus community to discover, support, and engage with local entrepreneurs.",
    about:
      "A visual novel demo me and my groupmates made for art appreciation class using Ren'Py. Full game is still in development. Stay tuned!",
    isFeatured: true,
    logo: { type: "image", value: "/images/apps/unimart/logo.png" },
    featuredImage: "/images/apps/unimart/preview.png",
    media: [
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "UniMart App Preview",
      },
      {
        type: "image",
        src: "/images/games/codecipher/preview.png",
        thumbSrc: "/images/games/codecipher/preview.png",
        imgDesc: "UniMart App Preview 2",
      },
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "UniMart App Preview 3",
      },
    ],
  },
  {
    name: "On The Move",
    url: "https://github.com/nonoro-official/On-The-Move.git",
    appTags: {
      stack: [Stack.native],
      frontend: [Frontend.flutter],
      backend: [],
      database: [Database.firebase, Database.firestore],
      language: [Language.dart],
      device: [Device.mobile],
      os: [OS.android],
    },
    desc: "Your personal guide to street-vendors, pop-up shops, and more!",
    about:
      "A location-based discovery platform that connects communities with mobile services and pop-up businesses in real-time.\n\nAs a user: \n- Discover nearby pop-up shops and local vendors. \n- Connect you with vendors for easy inquiry. \n- Locate the live-location of a vendor and the directions to get there. \n\nGets you on the move. \n\nAs a vendor: \n- Improve visibility of your on the move business. \n- Connect you with your authentic market. \n- Reduce confusion by having your listings and commonly asked questions available online. \n\nStay rooted.",
    isFeatured: true,
    logo: { type: "image", value: "/images/apps/unimart/logo.svg" },
    featuredImage: "/images/apps/on-the-move/preview.png",
    media: [
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "On The Move App Preview",
      },
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "On The Move App Preview 2",
      },
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "On The Move App Preview 3",
      },
    ],
  },
  {
    name: "UniFlow",
    url: "https://github.com/danie-to/Group5_MobileAppDev_UnifiedFlow.git",
    appTags: {
      stack: [Stack.native],
      frontend: [Frontend.javafx],
      backend: [],
      database: [Database.room],
      language: [Language.kt],
      device: [Device.mobile],
      os: [OS.android],
    },
    desc: "UniFlow. Manufacturing, Made Unified.",
    about:
      "Unified Manufacturing Communication, Maintenance, and Quality Reporting System.",
    isFeatured: false,
    logo: { type: "image", value: "/images/apps/unimart/logo.png" },
    media: [
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "Unified Flow App Preview",
      },
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "Unified Flow App Preview",
      },
      {
        type: "image",
        src: "/images/default.png",
        thumbSrc: "/images/default.png",
        imgDesc: "Unified Flow App Preview",
      },
    ],
  },
];

export const devices = Array.from(
  new Set(app.flatMap((app) => app.appTags.device)),
) as Device[];

export const stacks = Array.from(
  new Set(app.flatMap((app) => app.appTags.stack)),
) as Stack[];

export const os = Array.from(
  new Set(app.flatMap((app) => app.appTags.os)),
) as OS[];
