import {
  Code,
  Blocks,
  Database,
  MonitorSmartphone,
  PencilRuler,
} from "lucide-react";

import {
  faGithub,
  faLinkedin,
  faItchIo,
  faXTwitter,
  faFacebook,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const about = [
  {
    icon: "🍋",
    name: "Noah Francine Adrianna Mireille C. Peñaranda",
    copyright: "© nonoro-official. All rights reserved.",
    contact: "noah.c.penaranda@gmail.com",
    desc: "A driven computer science student and full-stack developer with a strong focus on game development and web technologies. Proficient across the development lifecycle, database management, and creative tools like video editing. Committed to continuous learning, high-quality execution, and exploring emerging technologies to build impactful digital experiences.",
  },
];

export const contacts = [
  {
    icon: <FontAwesomeIcon icon={faGithub} />,
    name: "GitHub",
    link: "https://github.com/nonoro-official",
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} />,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/noah-peñaranda-7b63ba356",
  },
  {
    icon: <FontAwesomeIcon icon={faItchIo} />,
    name: "itch.io",
    link: "https://nonoro-official.itch.io/",
  },
  {
    icon: <FontAwesomeIcon icon={faXTwitter} />,
    name: "Twitter",
    link: "https://twitter.com/nonoro_official",
  },
  {
    icon: <FontAwesomeIcon icon={faFacebook} />,
    name: "Facebook",
    link: "https://www.facebook.com/noah.penaranda.121?mibextid=ZbWKwL",
  },
  {
    icon: <FontAwesomeIcon icon={faDiscord} />,
    name: "Discord",
    link: "https://discordapp.com/users/408153808691265567",
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    name: "Email",
    link: "mailto:noah.c.penaranda@gmail.com",
  },
];

export const skills = [
  {
    icon: <Code />,
    name: "Languages",
    stack:
      "Java, Kotlin, C++, C#, Bash, Python, JavaScript, TypeScript, Dart, SQL, HTML, CSS, Sass",
  },
  {
    icon: <Blocks />,
    name: "Frameworks",
    stack: "React, Next.js, Node.js, Express, Flutter, Flask",
  },
  {
    icon: <Database />,
    name: "Databases & Cloud",
    stack: "Firebase, MongoDB, MySQL, SQLite,  Google Cloud",
  },
  {
    icon: <MonitorSmartphone />,
    name: "Systems & Platforms",
    stack: "Linux, Raspberry Pi",
  },
  {
    icon: <PencilRuler />,
    name: "Design & Tools",
    stack:
      "WordPress, FlutterFlow, Wix, Canva, Figma, Penpot, draw.io, Git, ngrok",
  },
];

export const history = [
  {
    role: "Software Developer",
    status: "Freelance",
    company: null,
    project: null,
    location: "Remote",
    dates: "May 2025",
    highlights: [
      "Implemented CRUD functionality and report generation/export features for a JavaFX-based clinic management system, resolving platform compatibility and build issues.",
      "Collaborated with clients to understand workflow requirements and translate them into scalable software solutions.",
    ],
  },
  {
    role: "Game Developer",
    status: null,
    company: "Yahaha Studios",
    project: "Horror Hatch 3-DAY CHALLENGE",
    location: null,
    dates: "July 2024 - Sept. 2024",
    highlights: [
      "Developed 6 horror games within multiple 3-day game jam events using the Yahaha Studios game engine, focusing on gameplay, immersive scenarios, and rapid prototyping.",
    ],
  },
  {
    role: "WordPress Developer",
    status: "Internship",
    company: "Hooman Design Corporation",
    project: "CX Immersion",
    location: null,
    dates: "Mar. 2024 - May 2024",
    highlights: [
      "Redesigned the company's mega menu using WordPress and Figma, improving UX, navigation, and mobile responsiveness.",
      "Collaborated with a partner and supervisor to implement design specifications and optimize site accessibility.",
    ],
  },
  {
    role: "Game Programmer",
    status: "Club Member",
    company: "CIIT Senior High School, Inc.",
    project: "Visual Novel Development Club",
    location: null,
    dates: "Aug. 2022 - May 2023",
    highlights: [
      "Programmed 2 visual novel demos in Ren'Py, including dialogue systems, branching narratives, and scene transitions.",
      "Collaborated with club members to integrate art assets, music, and sound effects, enhancing overall immersion and player engagement.",
    ],
  },
];

export const resume = {
  name: "Resume",
  link: "https://docs.google.com/document/d/1RcfydmLiKHflmqPUgxS8G4w-paj2iNOGng6KX3Fgnps/edit?usp=sharing",
  downloadUrl:
    "https://docs.google.com/document/d/1RcfydmLiKHflmqPUgxS8G4w-paj2iNOGng6KX3Fgnps/export?format=pdf",
  src: "/documents/resume.pdf",
};
