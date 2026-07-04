export enum Frontend {
  react = "React",
  vite = "Vite",
  jsf = "JSF (XHTML)",
  next = "Next.js",
  tailwind = "Tailwind CSS",
  javafx = "JavaFX",
  swing = "Java Swing",
}

export enum Backend {
  jee = "Jakarta EE",
  express = "Express",
  node = "Node.js",
  flask = "Flask",
}

export enum Language {
  py = "Python",
  js = "JavaScript",
  ts = "TypeScript",
  html = "HTML",
  css = "CSS3",
  dart = "Dart",
  java = "Java",
  sass = "Sass",
}

export enum Database {
  sqlite = "SQLite",
  mongo = "MongoDB",
  mysql = "MySQL",
}

export enum Tech {
  wp = "WordPress",
}

export interface Website {
  icon: { type: "emoji"; value: string } | { type: "image"; value: string };

  name: string;
  url: string;
  stack: (Frontend | Backend | Language | Tech | Database)[];
  desc: string;
  fullDesc: string;
  hasReadMore: boolean;
  preview: string;
  isIFrameBlocked: boolean;
}
