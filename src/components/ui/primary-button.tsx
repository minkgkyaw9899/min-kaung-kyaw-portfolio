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

export const PrimaryButton = ({
  title,
  className,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  const container = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  // Stability: We split the string once to ensure the top and bottom
  // layers match exactly during the map.
  const characters = title.split("");

  const onMouseEnter = contextSafe(() => {
    gsap.to(container.current, {
      duration: 0.3,
      ease: "power3.out",
    });

    gsap.to(".char-top", {
      y: () => -15 - Math.random() * 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "power3.out",
    });

    gsap.to(".char-bottom", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.02,
      ease: "power3.out",
    });

    if (leftIcon || rightIcon) {
      gsap.to(".btn-icon", {
        x: (_, target) => (target.classList.contains("icon-right") ? 5 : -5),
        duration: 0.3,
        ease: "power2.out",
      });
    }

    gsap.to(".btn-bg", {
      y: "0%",
      duration: 0.4,
      ease: "power3.inOut",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(container.current, { scale: 1, duration: 0.3, ease: "power3.out" });

    gsap.to(".char-top", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.02,
      ease: "power3.out",
    });

    gsap.to(".char-bottom", {
      y: () => 15 + Math.random() * 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "power3.out",
    });

    if (leftIcon || rightIcon) {
      gsap.to(".btn-icon", { x: 0, duration: 0.3, ease: "power2.out" });
    }

    gsap.to(".btn-bg", {
      y: "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });
  });

  return (
    <button
      {...props}
      ref={container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[13px] font-bold uppercase tracking-[2px] bg-foreground text-background no-underline rounded-full transition-transform will-change-transform",
        className,
      )}
    >
      <div className="btn-bg absolute inset-0 z-0 translate-y-full bg-primary" />

      {leftIcon && (
        <span className="btn-icon icon-left relative z-10 transition-colors duration-300 group-hover:text-background">
          {leftIcon}
        </span>
      )}

      <span className="relative z-10 flex flex-col items-center">
        {/* Top Layer */}
        <span className="flex">
          {characters.map((char) => (
            <span
              key={`top-${char}-${nanoid()}`} // Stable, unique key
              className="char-top inline-block transition-none"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </span>

        {/* Bottom Layer */}
        <span className="absolute flex text-background">
          {characters.map((char) => (
            <span
              key={`bottom-${char}-${nanoid()}`} // Stable, unique key
              className="char-bottom inline-block translate-y-7.5 opacity-0"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </span>
      </span>

      {rightIcon && (
        <span className="btn-icon icon-right relative z-10 transition-colors duration-300 group-hover:text-background">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
