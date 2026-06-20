"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
  };
  const onEnter = () => {
    gsap.to(ref.current, { y: -8, duration: 0.35, ease: "power2.out", boxShadow: "0 24px 50px -20px var(--m3-shadow)" });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: "power3.out", boxShadow: "0 4px 16px -4px var(--m3-shadow)" });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
