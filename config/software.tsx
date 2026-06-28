export const software = [
  {
    name: "MedSync Clinic Management System",
    url: "https://nonoro-official.github.io/vnd.github.io/",
    softwareTags: {
      stack: ["Web"],
      device: ["Desktop", "Mobile"],
      os: ["Android", "iOS", "Windows", "Linux", "MacOS"],
    },
    desc: "Green Light Records is a records shop.",
    isFeatured: true,
    preview: "💬",
    featuredImage: "",
    media: [
      {
        type: "video",
        src: "/videos/codecipher-trailer.mp4",
        thumbSrc: "/images/thumbs/clip1.jpg",
      },
      {
        type: "image",
        src: "/images/codecipher-ss1.jpg",
        thumbSrc: "/images/thumbs/ss1.jpg",
      },
    ],
  },
  {
    name: "Dental Clinic Management System",
    url: "https://roll-your-reps.vercel.app",
    softwareTags: {
      stack: ["JavaFX"],
      device: ["Desktop"],
      os: ["Windows"],
    },
    desc: "PATHFIT 4 Final - Sports Advocacy Campaign",
    isFeatured: true,
    preview: "🛍️",
    featuredImage: "",
    media: [
      {
        type: "image",
        src: "/images/rover-i/r1.png",
        thumbSrc: "/images/rover-i/r1.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r2.png",
        thumbSrc: "/images/rover-i/r2.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r3.png",
        thumbSrc: "/images/rover-i/r3.png",
      },
    ],
  },
  {
    name: "Bakery Management System",
    url: "https://github.com/Jerp010/CoDecipher",
    softwareTags: {
      stack: ["Java Swing"],
      device: ["Desktop"],
      os: ["Windows"],
    },
    desc: "CoDecipher is an interactive multiplayer coding software where players decipher masked code segments, fill in the blanks, and compete to master programming concepts. Built for the Hackathon Jam 2026 by Barney and Friends.",
    isFeatured: true,
    preview: "💬",
    featuredImage: "",
    media: [
      {
        type: "image",
        src: "/images/rover-i/r1.png",
        thumbSrc: "/images/rover-i/r1.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r2.png",
        thumbSrc: "/images/rover-i/r2.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r3.png",
        thumbSrc: "/images/rover-i/r3.png",
      },
    ],
  },
  {
    name: "UniMart",
    url: "https://sbsonk.itch.io/rover-i",
    softwareTags: {
      stack: ["Flutter"],
      device: ["Mobile"],
      os: ["Android"],
    },
    desc: "A mega menu me and my partner made for our internship using WordPress.",
    isFeatured: true,
    preview: "💬",
    featuredImage: "/images/rover-i/r1.png",
    media: [
      {
        type: "image",
        src: "/images/rover-i/r1.png",
        thumbSrc: "/images/rover-i/r1.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r2.png",
        thumbSrc: "/images/rover-i/r2.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r3.png",
        thumbSrc: "/images/rover-i/r3.png",
      },
    ],
  },
  {
    name: "On The Move",
    url: "https://sbsonk.itch.io/daytrading-simulator",
    softwareTags: {
      stack: ["Flutter"],
      device: ["Mobile"],
      os: ["Android"],
    },
    desc: "PATHFIT 4 Final - Sports Advocacy Campaign",
    isFeatured: true,
    preview: "🛍️",
    featuredImage: "",
    media: [
      {
        type: "image",
        src: "/images/rover-i/r1.png",
        thumbSrc: "/images/rover-i/r1.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r2.png",
        thumbSrc: "/images/rover-i/r2.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r3.png",
        thumbSrc: "/images/rover-i/r3.png",
      },
    ],
  },
  {
    name: "Unified Flow",
    url: "https://nonoro-official.github.io/vnd.github.io/",
    softwareTags: {
      stack: ["Kotlin"],
      device: ["Mobile"],
      os: ["Android"],
    },
    desc: "Green Light Records is a records shop.",
    isFeatured: false,
    preview: "💬",
    media: [
      {
        type: "image",
        src: "/images/rover-i/r1.png",
        thumbSrc: "/images/rover-i/r1.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r2.png",
        thumbSrc: "/images/rover-i/r2.png",
      },
      {
        type: "image",
        src: "/images/rover-i/r3.png",
        thumbSrc: "/images/rover-i/r3.png",
      },
    ],
  },
];

export const devices = [
  ...new Set(software.flatMap((software) => software.softwareTags.device)),
];

export const stacks = [
  ...new Set(software.flatMap((software) => software.softwareTags.stack)),
];

export const os = [
  ...new Set(software.flatMap((software) => software.softwareTags.os || [])),
];
