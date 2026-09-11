"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TypewriterEffect from "@/components/effects/TypewriterEffect";
import { useIsMobile } from "@/hooks/useIsMobile";

const BootSplash = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isBlackedOut, setIsBlackedOut] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  // BIOS line interval
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= 4) {
          clearInterval(timer);
          return 5;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  // Black screen to route
  useEffect(() => {
    if (visibleLines === 5 && !isBlackedOut) {
      const redirectTimer = setTimeout(() => {
        setIsBlackedOut(true);

        setTimeout(() => {
          router.replace("/login");
        }, 500);
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [visibleLines, router, isBlackedOut]);

  // Skip to login
  const handleSkip = () => {
    if (isBlackedOut) return;
    setIsBlackedOut(true);
    setTimeout(() => {
      router.replace("/login");
    }, 240);
  };

  if (isBlackedOut) {
    return <div className="h-dvh w-full bg-black"></div>;
  }

  return (
    <div
      className="relative h-dvh w-full bg-black text-white p-6 md:p-10 font-mono select-none cursor-pointer overflow-hidden"
      onClick={handleSkip}
    >
      {isMobile ? (
        <div className="h-full flex items-center justify-center text-2xl font-bold">
          <TypewriterEffect text={"nonorOS"} delay={120} showCursor={false} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {visibleLines >= 1 && <p>nonoro-official</p>}
            {visibleLines >= 1 && <p>Copyright (C) 2026-</p>}
            <br />
            {visibleLines >= 2 && <p>NP BIOS Rev1.0</p>}
            <br />
            {visibleLines >= 3 && <p>Main Processor : citrus</p>}
            {visibleLines >= 4 && <p>Memory Testing : OK</p>}
          </div>

          {visibleLines >= 5 && (
            <div className="absolute bottom-2 right-2 md:bottom-10 md:right-10 text-sm text-neutral-500 animate-pulse">
              <span>Booting NonorOS</span>
              <TypewriterEffect
                text={"...................."}
                delay={300}
                showCursor={false}
              />
            </div>
          )}
        </>
      )}

      <div className="absolute bottom-10 right-10 text-sm text-neutral-500 animate-pulse">
        [Click anywhere to skip]
      </div>
    </div>
  );
};

export default BootSplash;
