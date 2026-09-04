import React from "react";
import { useDesktopContext } from "@/context/DesktopContext";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { DOCK_INNER_HEIGHT, DOCK_BOTTOM_OFFSET } from "@/constants/desktop";

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
  const { windows, isMobile } = useDesktopContext();
  const isAnyWindowMaximized = windows.some((w) => w.state === "maximized");

  return (
    <div
      style={{
        height: `${DOCK_INNER_HEIGHT}px`,
        bottom: isAnyWindowMaximized ? 0 : `${DOCK_BOTTOM_OFFSET}px`,
      }}
      className={`fixed left-1/2 -translate-x-1/2 w-max max-w-[90vw] flex items-center gap-3 px-4 z-50 
        transition-all duration-300 ease-in-out
        ${
          !isMobile
            ? "bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-xl shadow-lg backdrop-blur-md"
            : ""
        }
        ${
          isAnyWindowMaximized
            ? "translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
    >
      {isMobile && (
        <span className="absolute -top-0.75 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sidebar-border border border-background shadow-sm" />
      )}

      {/* github, linkedin, email links */}
      {MAIN_SOCIALS.map((social) => (
        <div
          key={social.name}
          className="relative flex flex-col items-center group"
        >
          <Button
            variant="ghost-bar"
            size="icon-lg"
            className="h-12 w-12"
            asChild
          >
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex items-center justify-center"
            >
              <Icon icon={social.icon} size="2xl" className="text-2xl" />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Dock;
