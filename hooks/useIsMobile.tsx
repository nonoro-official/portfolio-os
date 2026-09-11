"use client";
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      // portrait
      const isNarrowScreen = window.innerWidth < breakpoint;

      //
      const isSpoofedIPad =
        navigator.userAgent.includes("Mac") &&
        "maxTouchPoints" in navigator &&
        navigator.maxTouchPoints > 2;

      const isMobileAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      setIsMobile(isNarrowScreen || isSpoofedIPad || isMobileAgent);
    };

    checkMobile(); // Check on initial mount

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
