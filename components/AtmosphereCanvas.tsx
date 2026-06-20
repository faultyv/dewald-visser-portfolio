"use client";

import { useEffect, useRef } from "react";
import { SEEDS } from "@/lib/m3-theme";
import { useTheme } from "./ThemeContext";

const ALPHA: Record<string, { b: number; s: number }> = {
  light: { b: 0.06, s: 0.14 },
  cloud: { b: 0.05, s: 0.12 },
  bold: { b: 0.07, s: 0.15 },
  dark: { b: 0.17, s: 0.26 },
};

function hexToRgbTriplet(hex: string) {
  const m = hex.replace("#", "");
  return `${parseInt(m.slice(0, 2), 16)},${parseInt(m.slice(2, 4), 16)},${parseInt(m.slice(4, 6), 16)}`;
}

export function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const alphaRef = useRef(ALPHA.light);

  useEffect(() => {
    alphaRef.current = ALPHA[theme] ?? ALPHA.light;
  }, [theme]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const blobPal = [SEEDS.primary, SEEDS.secondary, SEEDS.tertiary, SEEDS.success, SEEDS.warning].map(hexToRgbTriplet);
    const shapePal = Object.values(SEEDS).map(hexToRgbTriplet);

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(240, 520),
      c: blobPal[i % blobPal.length],
      k: rand(0.7, 1.25),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.06, 0.06),
    }));

    const N = w < 760 ? 7 : 14;
    const shapes = Array.from({ length: N }, (_, i) => ({
      x: rand(0, w),
      y: rand(0, h),
      s: rand(16, 50),
      type: i % 3,
      c: shapePal[i % shapePal.length],
      k: rand(0.7, 1.2),
      rot: rand(0, Math.PI),
      vr: rand(-0.004, 0.004),
      vx: rand(-0.07, 0.07),
      vy: rand(-0.08, 0.08),
      depth: rand(0.2, 1),
    }));

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    function roundRect(x: number, y: number, rw: number, rh: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + rw, y, x + rw, y + rh, r);
      ctx!.arcTo(x + rw, y + rh, x, y + rh, r);
      ctx!.arcTo(x, y + rh, x, y, r);
      ctx!.arcTo(x, y, x + rw, y, r);
      ctx!.closePath();
    }

    let raf = 0;
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      const { b: bA, s: sA } = alphaRef.current;

      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;
        const px = b.x + (mouse.x - 0.5) * 45;
        const py = b.y + (mouse.y - 0.5) * 45;
        const a = bA * b.k;
        const g = ctx.createRadialGradient(px, py, 0, px, py, b.r);
        g.addColorStop(0, `rgba(${b.c},${a})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(px - b.r, py - b.r, b.r * 2, b.r * 2);
      });

      shapes.forEach((s) => {
        s.rot += s.vr;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -80) s.x = w + 80;
        if (s.x > w + 80) s.x = -80;
        if (s.y < -80) s.y = h + 80;
        if (s.y > h + 80) s.y = -80;
        const ox = (mouse.x - 0.5) * 60 * s.depth;
        const oy = (mouse.y - 0.5) * 60 * s.depth;
        const a = sA * s.k;
        ctx.save();
        ctx.translate(s.x + ox, s.y + oy);
        ctx.rotate(s.rot);
        ctx.fillStyle = `rgba(${s.c},${a})`;
        if (s.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, s.s, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 1) {
          roundRect(-s.s, -s.s, s.s * 2, s.s * 2, s.s * 0.4);
          ctx.fill();
        } else {
          roundRect(-s.s * 1.3, -s.s * 0.5, s.s * 2.6, s.s, s.s * 0.5);
          ctx.fill();
        }
        ctx.restore();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
