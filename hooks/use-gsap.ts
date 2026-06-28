"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapFadeIn<T extends HTMLElement>(
  dependencies: unknown[] = [],
  options?: gsap.TweenVars,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", ...options },
    );
  }, dependencies);

  return ref;
}

export function useGsapCounter(
  target: number,
  duration = 1.2,
  dependencies: unknown[] = [],
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(counter.value).toLocaleString("en-IN");
        }
      },
    });
  }, [target, duration, ...dependencies]);

  return ref;
}
