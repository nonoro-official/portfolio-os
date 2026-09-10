"use client";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useDesktopContext } from "@/context/DesktopContext";

interface DateTimeProps {
  className?: string;
}

export function DateTime({ className }: DateTimeProps) {
  const [time, setTime] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);

  const { isMobile, focusedWindow } = useDesktopContext();

  // Check if an active window is open on mobile
  const isWindowFocused = Boolean(
    focusedWindow && focusedWindow.state !== "minimized",
  );

  useEffect(() => {
    setDate(new Date());

    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      // Close calendar if the click happened outside the container ref
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    // Use mousedown to prevent race conditions with the trigger button
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCalendarOpen]);

  const desktopDateString = date
    ? `${date.toLocaleDateString("en-US", { month: "short" })} ${date.getDate()} ${date.toLocaleDateString("en-US", { weekday: "short" })}`
    : "--- -- ---";

  const mobileDateString = date
    ? `${date.toLocaleDateString("en-US", { weekday: "short" })}, ${date.toLocaleDateString("en-US", { month: "short" })} ${date.getDate()}`
    : "--- -- ---";

  return (
    <div
      className="relative inline-block text-sm tracking-wider tabular-nums"
      ref={containerRef}
    >
      <Button
        variant="ghost-bar"
        size="default"
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className={`cursor-pointer ${
          isMobile && !isWindowFocused
            ? "h-auto flex flex-col items-center justify-center py-2 px-3 gap-0.5"
            : ""
        }`}
      >
        {isMobile ? (
          /* Mobile View */
          <>
            <span
              className={
                isWindowFocused ? "" : "text-3xl font-bold tracking-normal"
              }
            >
              {time || "--:--"}
            </span>

            {!isWindowFocused && (
              <span
                className={`text-xs text-muted-foreground font-normal ${className ?? ""}`}
              >
                {mobileDateString}
              </span>
            )}
          </>
        ) : (
          /* Desktop View */
          <>
            <span className={className}>{desktopDateString}</span>
            <span>{time || "--:--"}</span>
          </>
        )}
      </Button>

      {isCalendarOpen && (
        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 bg-background shadow-xl rounded-lg z-50">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border bg-card"
            captionLayout="dropdown"
          />
        </div>
      )}
    </div>
  );
}
