'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TypewriterEffect from "@/components/effects/TypewriterEffect";

const BootSplash = () => {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [isBlackedOut, setIsBlackedOut] = useState<boolean>(false);
    const router = useRouter();

    // BIOS line interval
    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines((prev) => (prev < 5 ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    // black screen to route
    useEffect(() => {
        if (visibleLines >= 4) {
            const redirectTimer = setTimeout(() => {
                setIsBlackedOut(true); 
                
                setTimeout(() => {
                    router.replace("/login");
                }, 1000);
            }, 5000); 
            
            return () => clearTimeout(redirectTimer);
        }
    }, [visibleLines, router]);

    if (isBlackedOut) {
        return <div className="h-screen w-full bg-black"></div>;
    }

    return (
        <div className="h-screen w-full bg-black text-white p-10 font-mono">
            <div className="flex flex-col gap-2">
                {visibleLines >= 1 && <p>nonoro-official</p>}
                {visibleLines >= 1 && <p>Copyright (C) 2026-</p>}
                <br />
                {visibleLines >= 2 && <p>NP BIOS Rev1.0</p>}
                <br />
                {visibleLines >= 3 && <p>Main Processor : custom_silicon</p>}
                {visibleLines >= 4 && <p>Memory Testing : OK</p>}
            </div>

            {visibleLines >= 5 && (
                <div className="absolute bottom-10 left-10 flex items-center text-2xl font-bold">
                    <span>Booting NonorOS</span>
                    <TypewriterEffect text={"...................."} delay={300} showCursor={false} />
                </div>
            )}
        </div>
    );
};

export default BootSplash;