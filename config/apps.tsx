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
      device: [Device.desktop],
      os: [OS.windows],
    },
    fullStack: {
      frontend: [Frontend.javafx],
      backend: [Backend.jee],
      database: [Database.mysql],
      language: [Language.java],
    },
    desc: "A Dental Clinic Management System for managing patient records, appointments, and billing.",
    about:
      "A Dental Clinic Management System for managing patient records, appointments, and billing. I developed the CRUD of this system using Java as freelance work.",
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
      device: [Device.mobile],
      os: [OS.android],
    },
    fullStack: {
      frontend: [Frontend.flutter],
      backend: [],
      database: [Database.firebase, Database.firestore],
      language: [Language.dart],
    },
    desc: "Campus e-commerce platform connecting student entrepreneurs and buyers.",
    about:
      "A centralized campus e-commerce platform that brings student-led businesses into one accessible space, making it easier for the campus community to discover, support, and engage with local entrepreneurs. \n\nBuilt to support campus entrepreneurship and simplify its community's commerce. \n\nAcademic Project: Developed as a prototype for Mobile Application Development 2 and Science, Technology, and Society (STS) at CIIT Philippines.",
    isFeatured: true,
    logo: { type: "image", value: "/images/apps/unimart/logo.png" },
    featuredImage: "/images/apps/unimart/ss1.png",
    media: [
      {
        type: "image",
        src: "/images/apps/unimart/ss1.png",
        thumbSrc: "/images/apps/unimart/ss1.png",
        imgDesc: "User Dashboard",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss2.png",
        thumbSrc: "/images/apps/unimart/ss2.png",
        imgDesc: "Business Dashboard",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss3.png",
        thumbSrc: "/images/apps/unimart/ss3.png",
        imgDesc: "Shop Categories ",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss4.png",
        thumbSrc: "/images/apps/unimart/ss4.png",
        imgDesc: "Messaging",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss5.png",
        thumbSrc: "/images/apps/unimart/ss5.png",
        imgDesc: "Cart",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss6.png",
        thumbSrc: "/images/apps/unimart/ss6.png",
        imgDesc: "Business Profile",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss7.png",
        thumbSrc: "/images/apps/unimart/ss7.png",
        imgDesc: "Inventory",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss8.png",
        thumbSrc: "/images/apps/unimart/ss8.png",
        imgDesc: "Incoming Orders",
      },
      {
        type: "image",
        src: "/images/apps/unimart/ss9.png",
        thumbSrc: "/images/apps/unimart/ss9.png",
        imgDesc: "Product Listings",
      },
    ],
  },
  {
    name: "On The Move",
    url: "https://github.com/nonoro-official/On-The-Move.git",
    appTags: {
      stack: [Stack.native],
      device: [Device.mobile],
      os: [OS.android],
    },
    fullStack: {
      frontend: [Frontend.flutter],
      backend: [],
      database: [Database.firebase, Database.firestore],
      language: [Language.dart],
    },
    desc: "Your personal guide to street-vendors, pop-up shops, and more!",
    about:
      "A location-based discovery platform that connects communities with mobile services and pop-up businesses in real-time.\n\nAs a user: \n- Discover nearby pop-up shops and local vendors. \n- Connect you with vendors for easy inquiry. \n- Locate the live-location of a vendor and the directions to get there. \n\nGets you on the move. \n\nAs a vendor: \n- Improve visibility of your on the move business. \n- Connect you with your authentic market. \n- Reduce confusion by having your listings and commonly asked questions available online. \n\nStay rooted.",
    isFeatured: true,
    logo: { type: "image", value: "/images/apps/on-the-move/logo.svg" },
    featuredImage: "/images/apps/on-the-move/ss5.png",
    media: [
      {
        type: "image",
        src: "/images/apps/on-the-move/ss1.png",
        thumbSrc: "/images/apps/on-the-move/ss1.png",
        imgDesc: "User Dashboard",
      },
      {
        type: "image",
        src: "/images/apps/on-the-move/ss2.png",
        thumbSrc: "/images/apps/on-the-move/ss2.png",
        imgDesc: "Business Profile",
      },
      {
        type: "image",
        src: "/images/apps/on-the-move/ss3.png",
        thumbSrc: "/images/apps/on-the-move/ss3.png",
        imgDesc: "Processing Cart",
      },
      {
        type: "image",
        src: "/images/apps/on-the-move/ss4.png",
        thumbSrc: "/images/apps/on-the-move/ss4.png",
        imgDesc: "Messages",
      },
      {
        type: "image",
        src: "/images/apps/on-the-move/ss5.png",
        thumbSrc: "/images/apps/on-the-move/ss5.png",
        imgDesc: "Map",
      },
      {
        type: "image",
        src: "/images/apps/on-the-move/ss6.png",
        thumbSrc: "/images/apps/on-the-move/ss6.png",
        imgDesc: "Business Dashboard",
      },
    ],
  },
  // {
  //   name: "UniFlow",
  //   url: "https://github.com/danie-to/Group5_MobileAppDev_UnifiedFlow.git",
  //   appTags: {
  //     stack: [Stack.native],
  //     device: [Device.mobile],
  //     os: [OS.android],
  //   },
  //   fullStack: {
  //     frontend: [Frontend.javafx],
  //     backend: [],
  //     database: [Database.room],
  //     language: [Language.kt],
  //   },
  //   desc: "UniFlow. Manufacturing, Made Unified.",
  //   about:
  //     "Unified Manufacturing Communication, Maintenance, and Quality Reporting System.",
  //   isFeatured: false,
  //   logo: { type: "image", value: "/images/apps/unimart/logo.png" },
  //   media: [
  //     {
  //       type: "image",
  //       src: "/images/default.png",
  //       thumbSrc: "/images/default.png",
  //       imgDesc: "Unified Flow App Preview",
  //     },
  //     {
  //       type: "image",
  //       src: "/images/default.png",
  //       thumbSrc: "/images/default.png",
  //       imgDesc: "Unified Flow App Preview",
  //     },
  //     {
  //       type: "image",
  //       src: "/images/default.png",
  //       thumbSrc: "/images/default.png",
  //       imgDesc: "Unified Flow App Preview",
  //     },
  //   ],
  // },
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
