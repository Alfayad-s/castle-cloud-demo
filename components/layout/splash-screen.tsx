"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { APP_TAGLINE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const MIN_DISPLAY_MS = 2000;
const EXIT_MS = 700;

export function SplashScreen() {
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), MIN_DISPLAY_MS);
    const hideTimer = window.setTimeout(() => setIsHidden(true), MIN_DISPLAY_MS + EXIT_MS);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = "";
    }
  }, [isHidden]);

  if (isHidden) {
    return null;
  }

  return (
    <div
      className={cn("splash-screen fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden", isExiting && "splash-screen-exit")}
      role="status"
      aria-live="polite"
      aria-label="Loading Castle Cloud Builders"
    >
      <div className="splash-screen-glow pointer-events-none absolute inset-0" aria-hidden />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-6 px-6",
          !isExiting && "splash-logo-enter",
          isExiting && "splash-logo-exit",
        )}
      >
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-[#BB913D]/20 blur-3xl" aria-hidden />
          <Image
            src="/logo-with-text.svg"
            alt="Castle Cloud Builders"
            width={320}
            height={200}
            priority
            className="relative h-auto w-[min(72vw,320px)] object-contain drop-shadow-[0_8px_32px_rgba(187,145,61,0.25)]"
          />
        </div>

        <p
          className={cn(
            "splash-tagline-enter max-w-xs text-center text-sm tracking-wide text-white/60",
            isExiting && "splash-tagline-exit",
          )}
        >
          {APP_TAGLINE}
        </p>

        <div
          className={cn("splash-loader-enter flex items-center gap-1.5", isExiting && "splash-loader-exit")}
          aria-hidden
        >
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="size-1.5 rounded-full bg-[#BB913D]"
              style={{ animationDelay: `${index * 160}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
