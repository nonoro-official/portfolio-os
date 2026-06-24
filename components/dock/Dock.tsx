import React from "react";
import { useDesktopContext } from "@/context/DesktopContext";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/Button";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const MAIN_SOCIALS = [
  {
    name: "Github",
    icon: faGithub,
    link: "https://github.com/nonoro-official",
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/noah-peñaranda-7b63ba356",
  },
  {
    name: "Email",
    icon: faEnvelope,
    link: "mailto:noah.c.penaranda@gmail.com",
  },
];

const Dock = () => {
  const { windows } = useDesktopContext();
  const isAnyWindowMaximized = windows.some((w) => w.state === "maximized");

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 w-max max-w-[90vw] h-14 bg-sidebar text-sidebar-foreground flex 
        items-center gap-2 px-4 border border-sidebar-border rounded-xl shadow-lg backdrop-blur-md z-50 
        transition-all duration-300 ease-in-out
        ${
          isAnyWindowMaximized
            ? "bottom-0 translate-y-full opacity-0 pointer-events-none"
            : "bottom-7 translate-y-0 opacity-100"
        }`}
    >
      {/* github, linkedin, email links */}
      {MAIN_SOCIALS.map((social) => (
        <Button key={social.name} variant="ghost-bar" size="icon-lg" asChild>
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <Icon icon={social.icon} size="xl" />
          </a>
        </Button>
      ))}
    </div>
  );
};

export default Dock;
