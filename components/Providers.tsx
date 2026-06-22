"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./ThemeContext";
import { NavBar } from "./NavBar";
import { AtmosphereCanvas } from "./AtmosphereCanvas";
import { CustomCursor } from "./CustomCursor";
import { MotionRoot } from "./MotionRoot";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* reducedMotion="user" keeps gentle opacity fades but drops transform/scale
          motion for visitors who request reduced motion — matches the GSAP/Lenis layer. */}
      <MotionConfig reducedMotion="user">
        <AtmosphereCanvas />
        <CustomCursor />
        <div id="scrollbar" className="fixed top-0 left-0 h-[3px] w-0 z-[85] rounded-r-[3px]" style={{ background: "linear-gradient(90deg,var(--color-primary),var(--color-secondary) 40%,var(--color-tertiary) 70%,var(--color-success))" }} />
        <NavBar />
        <MotionRoot />
        <main className="relative z-10">{children}</main>
      </MotionConfig>
    </ThemeProvider>
  );
}
