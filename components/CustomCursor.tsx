"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const cur = ref.current;
    if (!cur) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      cur.style.display = "none";
      return;
    }
    const onMove = (e: PointerEvent) => {
      cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove);

    const grow = () => {
      cur.style.width = "52px";
      cur.style.height = "52px";
      cur.style.marginLeft = "-26px";
      cur.style.marginTop = "-26px";
      cur.style.background = "rgba(0,115,234,0.12)";
    };
    const shrink = () => {
      cur.style.width = "24px";
      cur.style.height = "24px";
      cur.style.marginLeft = "-12px";
      cur.style.marginTop = "-12px";
      cur.style.background = "transparent";
    };

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("pointerenter", grow);
        el.addEventListener("pointerleave", shrink);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full border-2 z-[90] pointer-events-none will-change-transform transition-[width,height,margin,background] duration-200"
      style={{ borderColor: "var(--color-primary)", mixBlendMode: theme === "dark" ? "screen" : "normal" }}
      aria-hidden="true"
    />
  );
}
