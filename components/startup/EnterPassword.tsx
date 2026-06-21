'use client'
import React, { useState, useEffect, useCallback } from 'react'
import TypewriterEffect from '@/components/effects/TypewriterEffect'
import { ArrowRightCircle } from 'lucide-react'
import { useRouter } from "next/navigation";

const EnterPassword = () => {
  const [isFinished, setIsFinished] = useState(false);
  const passwordText = "Hello! Welcome to my portfolio!"
  const router = useRouter();
  
  const handleLogin = useCallback(() => {
    router.push('/desktop')
  }, [router]);

  useEffect(() => {
    if (!isFinished) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFinished, handleLogin,]);

  return (
    <div className="w-full px-4 py-3 bg-card border border-border rounded text-foreground flex items-center justify-between font-sans">
      <span className="flex-1">
        <TypewriterEffect text={passwordText} delay={70} onComplete={() => setIsFinished(true)}/>
      </span>
      
      {isFinished && (
        <button 
          type="button"
          aria-label="Login" 
          onClick={handleLogin}
          className="flex items-center justify-center shrink-0 transition-all duration-700 ease-out opacity-100 translate-y-0 starting:opacity-0 starting:translate-y-1"
        >
          <ArrowRightCircle 
            size={20} 
            className="text-muted-foreground hover:text-primary ml-2" 
          />
        </button>
      )}
    </div>
  )
}

export default EnterPassword;