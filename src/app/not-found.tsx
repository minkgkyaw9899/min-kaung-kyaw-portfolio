"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function NotFound() {
  const container = useRef(null);

  useGSAP(
    () => {
      const splitCode = new SplitText("#notFoundCode", {
        type: "chars, words",
      });

      // Animate the characters
      gsap.from(splitCode.chars, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out",
      });

      const splitText = new SplitText("#notFoundText", {
        type: "words",
      });

      // Animate the words
      gsap.from(splitText.words, {
        opacity: 0,
        x: 60,
        duration: 1.4,
        stagger: 0.2,
        ease: "back.out",
      });
    },
    { scope: container },
  );

  return (
    <div className="bg-background min-h-screen flex items-center justify-center gap-8">
      <div ref={container} className=" flex items-center justify-center gap-8">
        <p
          id="notFoundCode"
          className="text-5xl lg:text-8xl text-destructive font-display"
        >
          404
        </p>
        <p
          id="notFoundText"
          className="text-3xl lg:text-6xl text-destructive mt-24 font-display"
        >
          Page Not Found
        </p>
      </div>
    </div>
  );
}
