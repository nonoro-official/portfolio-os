'use client'
import React from 'react'
import Typewriter from 'typewriter-effect'

interface TypewriterProps {
  text: string;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterEffect = ({ text, delay = 50, showCursor = true, onComplete}: TypewriterProps) => {
  return (
    <div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .callFunction(() => {
              if (onComplete) onComplete();
            })
            .start();
        }}
        options={{
            delay,
            loop: false,
            cursor: showCursor ? "|" : "",
        }}
      />
    </div>
  )
}

export default TypewriterEffect
