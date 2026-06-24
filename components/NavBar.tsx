"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useTheme } from "./ThemeContext";
import { whatsappLink } from "@/lib/whatsapp";
import { fmTransition } from "@/lib/motion-tokens";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#system", label: "System" },
  { href: "/work", label: "Work" },
  { href: "/#pillars", label: "Pillars" },
  { href: "/#cv", label: "Career" },
  { href: "/#companies", label: "Companies" },
  { href: "/#method", label: "Method" },
  { href: "/#credentials", label: "Certs" },
  { href: "/#contact", label: "Contact" },
];

const THEME_ITEMS = [
  { key: "light" as const, icon: "light_mode" },
  { key: "dark" as const, icon: "dark_mode" },
];

export function NavBar({ name = "Dewald Visser" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const pathname = usePathname();
  const { theme, setTheme, label } = useTheme();

  useEffect(() => {
    const ids = [
      "hero",
      ...LINKS.map((link) => (link.href === "/work" ? "work" : link.href.split("#")[1])).filter(Boolean),
    ];
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const focusLine = Math.min(360, viewportHeight * 0.42);
      const visibleTop = Math.min(124, viewportHeight * 0.18);
      const visibleBottom = viewportHeight * 0.78;
      let current = "hero";
      let bestScore = Number.NEGATIVE_INFINITY;

      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(rect.bottom, visibleBottom) - Math.max(rect.top, visibleTop));
        const ownsFocusLine = rect.top <= focusLine && rect.bottom >= focusLine;
        const distancePenalty = Math.abs(rect.top - focusLine) * 0.02;
        const score = overlap + (ownsFocusLine ? 420 : 0) - distancePenalty;

        if (score > bestScore) {
          bestScore = score;
          current = id;
        }
      }

      setActive(current);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  return (
    <nav className="hig-glass !overflow-visible fixed left-3 right-3 top-3 z-[80] flex items-center justify-between rounded-[24px] px-3.5 py-2.5 sm:left-5 sm:right-5 sm:px-4 xl:left-8 xl:right-8 xl:py-3">
      <Link href="/#hero" className="state-layer flex min-w-0 items-center gap-2.5 rounded-full px-2 py-1.5 no-underline text-title-m text-on-surface sm:text-title-l">
        <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_var(--color-primary)]" />
        <span className="truncate">{name}</span>
      </Link>

      <div className="hidden items-center gap-1 rounded-full border border-outline-variant/70 bg-surface-container/38 p-1 text-label-l xl:flex">
        {LINKS.map((l) => {
          const id = l.href === "/work" ? "work" : l.href.split("#")[1] ?? "";
          const on = l.href === "/work" ? pathname.startsWith("/work") || active === "work" : pathname === "/" && id && active === id;
          return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={on ? "page" : undefined}
            className={`relative state-layer rounded-full px-3.5 py-2 no-underline transition-colors ${
              on ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {on && (
              <motion.span
                layoutId="navPill"
                transition={fmTransition.standard}
                className="absolute inset-0 rounded-full bg-primary shadow-[0_10px_22px_-16px_var(--color-primary)]"
              />
            )}
            <span className="relative z-10">{l.label}</span>
          </Link>
          );
        })}
      </div>

      <div className="hidden items-center gap-2 xl:flex">
        <div role="group" aria-label="Theme" className="flex gap-1 rounded-full border border-outline-variant/60 bg-surface-container/44 p-1">
          {THEME_ITEMS.map((item) => {
            const on = item.key === theme;
            return (
              <button
                key={item.key}
                type="button"
                data-theme-btn={item.key}
                aria-label={`${label[item.key]} theme`}
                aria-pressed={on}
                onClick={() => setTheme(item.key)}
                onPointerDown={() => setTheme(item.key)}
                className={`hig-control state-layer grid h-9 w-9 place-items-center rounded-full transition-colors ${
                  on ? "border-primary bg-primary text-on-primary" : "border-transparent bg-transparent text-on-surface-variant"
                }`}
              >
                <IconSymbol name={item.icon} size={18} filled={on} />
              </button>
            );
          })}
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="hig-control state-layer inline-flex items-center gap-1.5 rounded-full bg-success px-4 py-2.5 text-label-l text-on-success no-underline"
        >
          <WhatsAppIcon size={16} /> WhatsApp
        </a>
        <a
          href="https://linkedin.com/in/dewaldvisser"
          target="_blank"
          rel="noopener noreferrer"
          className="hig-control state-layer inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-label-l text-on-primary no-underline"
        >
          LinkedIn <IconSymbol name="open_in_new" size={16} />
        </a>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="hig-control state-layer grid h-11 w-11 place-items-center rounded-full text-on-surface xl:hidden"
      >
        <IconSymbol name={open ? "close" : "menu"} size={26} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={fmTransition.standard}
            className="absolute left-0 right-0 top-[calc(100%+10px)] flex flex-col gap-1 rounded-[24px] border border-outline-variant bg-surface-container p-3 elevation-4 xl:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="state-layer rounded-2xl px-3.5 py-3 text-title-m text-on-surface no-underline"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {THEME_ITEMS.map((item) => {
                const on = item.key === theme;
                return (
                  <button
                    key={item.key}
                    type="button"
                    data-theme-btn={item.key}
                    aria-label={`${label[item.key]} theme`}
                    aria-pressed={on}
                    onClick={() => setTheme(item.key)}
                    onPointerDown={() => setTheme(item.key)}
                    className={`hig-control state-layer inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-label-l ${
                      on ? "border-primary bg-primary text-on-primary" : "border-outline text-on-surface"
                    }`}
                  >
                    <IconSymbol name={item.icon} size={18} filled={on} />
                    {label[item.key]}
                  </button>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="hig-control inline-flex items-center justify-center gap-1.5 rounded-full bg-success px-4 py-3 text-label-l text-on-success no-underline"
              >
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
              <a
                href="https://linkedin.com/in/dewaldvisser"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="hig-control inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-label-l text-on-primary no-underline"
              >
                LinkedIn <IconSymbol name="open_in_new" size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
