"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const canTiltRef = useRef(false);
  const canPressRef = useRef(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      canTiltRef.current = !coarse.matches && !reduced.matches;
      canPressRef.current = !reduced.matches; // press feedback is welcome on touch too
    };
    update();
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTiltRef.current) return;
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
  };
  const onEnter = () => {
    if (!canTiltRef.current) return;
    gsap.to(ref.current, { y: -8, duration: 0.35, ease: "power2.out", boxShadow: "0 24px 50px -20px var(--m3-shadow)" });
  };
  const onLeave = () => {
    if (canPressRef.current) gsap.to(ref.current, { scale: 1, duration: 0.4, ease: "power3.out" });
    if (!canTiltRef.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: "power3.out", boxShadow: "0 4px 16px -4px var(--m3-shadow)" });
  };
  // Spring-like press feedback — a quick scale dip that settles back with a touch of overshoot.
  const onDown = () => {
    if (!canPressRef.current) return;
    gsap.to(ref.current, { scale: 0.978, duration: 0.16, ease: "power2.out" });
  };
  const onUp = () => {
    if (!canPressRef.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{ transformStyle: "preserve-3d" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
