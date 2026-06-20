"use client";

import Link from "next/link";
import { useRef } from "react";
import { spawnRipple } from "@/lib/ripple";
import { gsap } from "@/lib/gsap";

type Variant = "filled" | "tonal" | "outlined" | "text";

const VARIANT_CLASS: Record<Variant, string> = {
  filled: "bg-primary text-on-primary",
  tonal: "bg-primary-container text-on-primary-container",
  outlined: "bg-transparent text-on-surface border border-outline",
  text: "bg-transparent text-primary",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
};

function useMagnetic(enabled: boolean | undefined) {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
    });
  };
  const onLeave = () => {
    if (!enabled || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };
  return { ref, onMove, onLeave };
}

const base =
  "ripple-container state-layer inline-flex items-center justify-center gap-2 rounded-full text-label-l px-6 py-3.5 cursor-pointer transition-shadow will-change-transform select-none";

export function Button({
  variant = "filled",
  className = "",
  children,
  magnetic,
  onClick,
  type = "button",
}: CommonProps & { onClick?: () => void; type?: "button" | "submit" }) {
  const { ref, onMove, onLeave } = useMagnetic(magnetic);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onPointerDown={spawnRipple}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`${base} ${VARIANT_CLASS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  external,
  variant = "filled",
  className = "",
  children,
  magnetic,
}: CommonProps & { href: string; external?: boolean }) {
  const { ref, onMove, onLeave } = useMagnetic(magnetic);
  const cls = `${base} ${VARIANT_CLASS[variant]} ${className} no-underline`;

  if (external) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={spawnRipple}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onPointerDown={spawnRipple}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cls}
    >
      {children}
    </Link>
  );
}
