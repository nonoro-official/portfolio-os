export enum Stack {
  web = "Web",
  native = "Native",
}

export enum Frontend {
  flutter = "Flutter",
  javafx = "JavaFX",
  swing = "Java Swing",
  xml = "XML",
}

export enum Backend {
  jee = "Jakarta EE",
}

export enum Language {
  dart = "Dart",
  java = "Java",
  kt = "Kotlin",
}

export enum Database {
  room = "Room",
  sqlite = "SQLite",
  firebase = "Firebase",
  firestore = "Firestore",
  mongodb = "MongoDB",
  mysql = "MySQL",
}

export enum Device {
  desktop = "Desktop",
  mobile = "Mobile",
}

export enum OS {
  windows = "Windows",
  macos = "MacOS",
  linux = "Linux",
  android = "Android",
  ios = "iOS",
}

export interface App {
  name: string;
  url: string;
  appTags: {
    stack: Stack[];
    device: Device[];
    os: OS[];
  };
  fullStack: {
    frontend: Frontend[];
    backend: Backend[];
    database: Database[];
    language: Language[];
  };
  desc: string;
  about: string;
  isFeatured: boolean;
  logo: { type: "emoji"; value: string } | { type: "image"; value: string };
  featuredImage?: string;
  media: (
    | { type: "image"; src: string; thumbSrc: string; imgDesc?: string }
    | { type: "video"; src: string; thumbSrc: string; imgDesc?: string }
  )[];
}
