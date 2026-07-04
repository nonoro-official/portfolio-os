export const software = [
  {
    name: "MedSync",
    url: "https://nonoro-official.github.io/vnd.github.io/",
    softwareTags: {
      stack: ["Web"],
      frontend: ["HTML", "JavaScript", "Sass", "React", "Vite"],
      backend: ["Python", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
      device: ["Desktop", "Mobile"],
      os: ["Android", "iOS", "Windows", "Linux", "MacOS"],
    },
    desc: " Clinic Management System",
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
    name: "ToothHaven",
    url: "https://roll-your-reps.vercel.app",
    softwareTags: {
      stack: ["JavaFX"],
      frontend: ["JSF (XHTML)", "JavaScript", "CSS3"],
      backend: ["Java", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
      device: ["Desktop"],
      os: ["Windows"],
    },
    desc: " Dental Clinic Management System",
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
    url: "https://github.com/nonoro-official/Bakery-Management-System.git",
    softwareTags: {
      stack: ["Web"],
      frontend: ["JSF (XHTML)", "JavaScript", "CSS3"],
      backend: ["Java", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
      device: ["Desktop"],
      os: ["Windows", "Linux", "MacOS"],
    },
    desc: "An enterprise-grade Bakery Management System for tracking inventory, managing orders, and calculating recipe costs.",
    isFeatured: true,
    preview: "🍞",
    featuredImage: "",
    media: [
      {
        type: "image",
        src: "/images/bakery-ss1.jpg",
        thumbSrc: "/images/thumbs/bakery-thumb1.jpg",
      },
    ],
  },
  {
    name: "UniMart",
    url: "https://sbsonk.itch.io/rover-i",
    softwareTags: {
      stack: ["Flutter"],
      frontend: ["JSF (XHTML)", "JavaScript", "CSS3"],
      backend: ["Java", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
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
      frontend: ["JSF (XHTML)", "JavaScript", "CSS3"],
      backend: ["Java", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
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
      frontend: ["JSF (XHTML)", "JavaScript", "CSS3"],
      backend: ["Java", "Jakarta EE"],
      database: ["MySQL", "JDBC"],
      environment: ["Apache Tomcat"],
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
