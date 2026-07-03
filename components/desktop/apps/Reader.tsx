import React from "react";
import { Button } from "@/components/ui/Button";
import { useWindow } from "@/hooks/useWindow";
import { resume } from "@/config/nonoro";

const Reader = () => {
  const { goHome } = useWindow();

  return (
    <div className="flex h-full w-full flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Menu Bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200/50 bg-[#FDFBF7] px-4 py-1 dark:border-border dark:bg-popover">
        <Button
          variant="window"
          onClick={goHome}
          className="rounded p-1 hover:bg-zinc-200/50"
        >
          File
        </Button>

        <Button variant="window" asChild>
          <a href={resume.link} target="_blank" rel="noopener noreferrer">
            View
          </a>
        </Button>

        <Button variant="window" asChild>
          <a href={resume.downloadUrl} download>
            Download
          </a>
        </Button>
      </div>

      {/* Content */}
      <div className="flex h-full justify-center overflow-auto p-8">
        <div className="w-full max-w-[900px]">
          {/* Document Viewer */}
          <div className="justify-center items-center">
            <div className="relative aspect-[1/1.4] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-inner">
              <iframe
                src={resume.src}
                title={resume.name}
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
