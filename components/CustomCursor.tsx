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
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2 };
    let raf = 0;
    const render = () => {
      pos.x += (pos.tx - pos.x) * 0.22;
      pos.y += (pos.ty - pos.y) * 0.22;
      cur.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      raf = requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(render);

    const grow = () => {
      cur.style.width = "52px";
      cur.style.height = "52px";
      cur.style.marginLeft = "-26px";
      cur.style.marginTop = "-26px";
      cur.style.background = "rgba(0,115,234,0.12)";
      cur.style.borderWidth = "1px";
    };
    const shrink = () => {
      cur.style.width = "24px";
      cur.style.height = "24px";
      cur.style.marginLeft = "-12px";
      cur.style.marginTop = "-12px";
      cur.style.background = "transparent";
      cur.style.borderWidth = "2px";
    };

    const wired = new Set<Element>();
    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        if (wired.has(el)) return;
        el.addEventListener("pointerenter", grow);
        el.addEventListener("pointerleave", shrink);
        wired.add(el);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      wired.forEach((el) => {
        el.removeEventListener("pointerenter", grow);
        el.removeEventListener("pointerleave", shrink);
      });
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
