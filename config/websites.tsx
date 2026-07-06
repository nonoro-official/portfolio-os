import {
  Website,
  Frontend,
  Backend,
  Language,
  Database,
  Tech,
} from "@/types/website";

export const websites: Website[] = [
  {
    icon: {
      type: "emoji",
      value: "💿",
    },
    name: "Green Light Records",
    url: "https://github.com/nonoro-official/WDD2",
    stack: [Database.mongo, Backend.node, Backend.express, Frontend.react],
    desc: "A full-stack records shop to buy vinyl records, CDs & cassettes, artist merchandise, and audio gear.",
    hasReadMore: false,
    preview: "/images/websites/green-light-records/preview.png",
    isIFrameBlocked: true,
  },
  {
    icon: {
      type: "image",
      value: "/images/websites/roll-your-reps/logo.svg",
    },
    name: "Roll Your Reps",
    url: "https://roll-your-reps.vercel.app",
    stack: [Frontend.react, Language.ts, Backend.node],
    desc: "An edutainment-style website that blends educational content and exercise with interactive elements, visuals, and mascots!",
    hasReadMore: false,
    preview: "/images/websites/roll-your-reps/preview.png",
    isIFrameBlocked: false,
  },
  {
    icon: {
      type: "image",
      value: "/images/websites/medsync/logo.svg",
    },
    name: "MedSync",
    url: "https://github.com/SBSonk/Medsync---Clinic-Managment-System.git",
    stack: [Frontend.react, Backend.flask, Database.sqlite, Language.sass],
    desc: "A database management system designed to efficiently handle the operations of a small clinic. This system ensures seamless...",
    fullDesc:
      "A database management system designed to efficiently handle the operations of a small clinic. This system ensures seamless organization and accessibility of essential records, improving overall clinic management.",
    hasReadMore: true,
    preview: "/images/websites/medsync/preview.png",
    isIFrameBlocked: true,
  },
  {
    icon: {
      type: "image",
      value: "/images/websites/hooman/logo.png",
    },
    name: "Hooman Design Corporation Mega Menu",
    url: "https://hooman.design/",
    stack: [Tech.wp],
    desc: "Made for my internship at Hooman Design Corporation. A mega menu me and my partner made using WordPress.",
    hasReadMore: false,
    preview: "/images/websites/hooman/preview.png",
    isIFrameBlocked: true,
  },
  {
    icon: {
      type: "image",
      value: "/images/websites/vnd/logo.png",
    },
    name: "VND School Dating Sim",
    url: "https://nonoro-official.github.io/vnd.github.io/",
    stack: [Language.html, Language.css],
    desc: "This is a website about a video game that was developed in my school club Visual Novel Development Club! The video game is a visual...",
    fullDesc:
      "This is a website about a video game that was developed in my school club Visual Novel Development Club! The video game is a visual novel dating simulator about supernatural characters in a magic school. The website contains information about the game and the characters.",
    hasReadMore: true,
    preview: "/images/websites/vnd/preview.png",
    isIFrameBlocked: false,
  },
  {
    icon: {
      type: "emoji",
      value: "🍞",
    },
    name: "Bakery Management System",
    url: "https://github.com/nonoro-official/WDD2",
    stack: [Frontend.jsf, Backend.jee, Database.mysql],
    desc: "Bakery Management System is a web application for managing bakery operations.",
    fullDesc:
      "A full stack bakery management system for programming languages class using Java, XHTML, and MySQL.",
    hasReadMore: false,
    preview: "/images/websites/bakery/preview.png",
    isIFrameBlocked: true,
  },
  {
    icon: {
      type: "emoji",
      value: "🍋",
    },
    name: "Personal Website",
    url: "https://nonoro-official.github.io/noahpenaranda-personalwebsite.github.io/",
    stack: [Language.html, Language.css],
    desc: "A website I made about myself. I made this in college for my intro to computing class. It contains information about me, my projects, and...",
    fullDesc:
      "A website I made about myself. I made this in college for my intro to computing class. It contains information about me, my projects, and my skills. It also has a contact form and a link to my resume.",
    hasReadMore: true,
    preview: "/images/websites/personal/preview.png",
    isIFrameBlocked: false,
  },
  {
    icon: {
      type: "emoji",
      value: "🍋",
    },
    name: "Portfolio",
    url: "https://nonoro-official.github.io/portfolio/",
    stack: [Language.html, Language.css],
    desc: "My current portfolio website designed as a desktop OS. When you run this here, you can try something like Inception.",
    hasReadMore: false,
    preview: "/images/websites/portfolio/preview.png",
    isIFrameBlocked: false,
  },
];
