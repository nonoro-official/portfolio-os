import React from "react";
import { Button } from "@/components/ui/Button";
import type { Window } from "@/types/desktop";
import { useDesktopContext } from "@/context/DesktopContext";
import { about } from "@/config/nonoro";

interface AboutProps {
  windowItem?: Window;
}

const About: React.FC<AboutProps> = ({ windowItem }) => {
  const { closeWindow } = useDesktopContext();

  return (
    <div className="w-full h-full flex bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto relative">
        <div className="max-w-2xl mx-auto px-6 py-8 w-full">
          {about.map((me) => {
            return (
              <div key={me.name} className="flex flex-col gap-4 w-full">
                {/* Header */}
                <div className="w-full text-center pb-4 border-b border-zinc-200 dark:border-border">
                  <h1 className="text-4xl font-extrabold text-amber-600 select-none py-1">
                    {me.icon} About Me
                  </h1>
                </div>

                {/* Body */}
                <div className="w-full mt-2">
                  <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed text-left">
                    {me.name}
                    <br />
                    {me.contact}
                    <br />
                    {me.copyright}
                    <br /> <br />
                    {me.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <Button
          onClick={() => {
            if (windowItem) {
              closeWindow(windowItem.id);
            }
          }}
          variant="secondary"
          className="absolute bottom-4 right-2 z-10 w-20 cursor-pointer"
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default About;
