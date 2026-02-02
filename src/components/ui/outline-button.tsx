"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { nanoid } from "nanoid";
import { type ButtonHTMLAttributes, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const OutlineButton = ({
  title,
  className,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  const container = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const characters = title.split("");

  const onMouseEnter = contextSafe(() => {
    // 1. Border Color change - Added Overwrite
    gsap.to(container.current, {
      borderColor: "var(--primary)",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto", // Prevents color sticking
    });

    // 2. Text Animations - Added Overwrite
    gsap.to(".char-top", {
      y: () => -12 - Math.random() * 15,
      opacity: 0,
      duration: 0.4,
      stagger: 0.015,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(".char-bottom", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.015,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 3. Fill Layer
    gsap.to(".btn-fill", {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      ease: "expo.out",
      overwrite: "auto",
    });

    if (leftIcon || rightIcon) {
      gsap.to(".btn-icon", {
        x: (_i, target) => (target.classList.contains("icon-right") ? 4 : -4),
        duration: 0.3,
        overwrite: "auto",
      });
    }
  });

  const onMouseLeave = contextSafe(() => {
    // 1. Return Border Color - Added Overwrite
    gsap.to(container.current, {
      borderColor: "rgba(var(--foreground-rgb), 0.2)", // Use a fallback or clean rgba
      // If oklch is tricky, try animating to the specific variable:
      // borderColor: "var(--border-default-variable)",
      duration: 0.3,
      overwrite: "auto",
    });

    gsap.to(".char-top", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.01,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(".char-bottom", {
      y: 25, // Fixed value for cleaner reset
      opacity: 0,
      duration: 0.4,
      stagger: 0.01,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(".btn-fill", {
      scaleY: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      overwrite: "auto",
    });

    if (leftIcon || rightIcon) {
      gsap.to(".btn-icon", { x: 0, duration: 0.3, overwrite: "auto" });
    }
  });

  return (
    <button
      {...props}
      ref={container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[13px] font-bold uppercase tracking-[2px] rounded-full border-2 border-foreground/20 bg-transparent text-foreground transition-all duration-300",
        className,
      )}
    >
      <div className="btn-fill absolute inset-0 z-0 scale-y-0 opacity-0 bg-primary" />

      {leftIcon && (
        <span className="btn-icon icon-left relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
          {leftIcon}
        </span>
      )}

      <span className="relative z-10 flex flex-col items-center pointer-events-none">
        <span className="flex">
          {characters.map((char) => (
            <span
              key={`top-${nanoid()}`} // Stable index-based key for static text
              className="char-top inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </span>

        <span className="absolute flex text-primary-foreground">
          {characters.map((char) => (
            <span
              key={`bottom-${nanoid()}`}
              className="char-bottom inline-block translate-y-6 opacity-0"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </span>
      </span>

      {rightIcon && (
        <span className="btn-icon icon-right relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
