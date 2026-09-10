"use client";
import React, { useState, useEffect } from "react";
import TypewriterEffect from "@/components/effects/TypewriterEffect";
import { ArrowRightCircle, FingerprintPattern } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "../ui/button";

const EnterPassword = () => {
  const [isFinished, setIsFinished] = useState(false);
  const passwordText = "Hello! Welcome to my portfolio!";
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogin = () => {
    router.replace("/desktop");
  };

  useEffect(() => {
    if (!isFinished) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.replace("/desktop");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFinished, router]);

  return (
    <>
      <div className="w-full px-4 py-3 bg-card border border-border rounded text-foreground flex items-center justify-between font-sans">
        <span className="flex-1">
          <TypewriterEffect
            text={passwordText}
            delay={70}
            onComplete={() => setIsFinished(true)}
          />
        </span>

        {isFinished && !isMobile && (
          <Button
            variant="ghost"
            size="none"
            aria-label="Login"
            onClick={handleLogin}
            className="flex items-center justify-center shrink-0 transition-all duration-700 ease-out opacity-100 translate-y-0 starting:opacity-0 starting:translate-y-1"
          >
            <ArrowRightCircle className="size-5 text-muted-foreground hover:text-primary" />
          </Button>
        )}
      </div>
      {isFinished && isMobile && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            variant="ghost"
            size="none"
            aria-label="Login"
            onClick={handleLogin}
            className="rounded-full p-2 flex items-center justify-center shrink-0 transition-all duration-700 ease-out opacity-100 translate-y-0 starting:opacity-0 starting:translate-y-1"
          >
            <FingerprintPattern className="size-12 text-muted-foreground hover:text-primary" />
          </Button>
        </div>
      )}
    </>
  );
};

export default EnterPassword;
