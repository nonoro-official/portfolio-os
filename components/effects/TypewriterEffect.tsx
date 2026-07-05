"use client";
import React from "react";
import Typewriter from "typewriter-effect";

interface TypewriterProps {
  text: string;
  delay?: number;
  showCursor?: boolean;
  enableLoop?: boolean;
  onComplete?: () => void;
  className?: string;
}

const TypewriterEffect = ({
  text,
  delay = 50,
  showCursor = true,
  enableLoop = false,
  onComplete,
  className,
}: TypewriterProps) => {
  return (
    <div className={className}>
      <Typewriter
        options={{
          strings: enableLoop ? [text] : undefined,
          autoStart: enableLoop,
          delay,
          loop: enableLoop,
          cursor: showCursor ? "|" : "",
        }}
        onInit={(typewriter) => {
          if (!enableLoop) {
            typewriter
              .typeString(text)
              .callFunction(() => {
                if (onComplete) onComplete();
              })
              .start();
          }
        }}
      />
    </div>
  );
};

export default TypewriterEffect;
