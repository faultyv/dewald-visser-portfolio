"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#system", label: "System" },
  { href: "/#pillars", label: "Pillars" },
  { href: "/#method", label: "Method" },
  { href: "/#cv", label: "Career" },
  { href: "/#companies", label: "Companies" },
  { href: "/work", label: "Work" },
  { href: "/#credentials", label: "Certs" },
  { href: "/#contact", label: "Contact" },
];

export function NavBar({ name = "Dewald Visser" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", ...LINKS.map((link) => link.href.split("#")[1]).filter(Boolean)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hig-glass fixed left-3 right-3 top-3 z-[80] flex items-center justify-between rounded-[24px] px-3.5 py-2.5 sm:left-5 sm:right-5 sm:px-4 xl:left-8 xl:right-8 xl:py-3">
      <Link href="/#hero" className="state-layer flex min-w-0 items-center gap-2.5 rounded-full px-2 py-1.5 no-underline text-title-m text-on-surface sm:text-title-l">
        <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_var(--color-primary)]" />
        <span className="truncate">{name}</span>
      </Link>

      <div className="hidden items-center gap-1 rounded-full border border-outline-variant/70 bg-surface-container/38 p-1 text-label-l xl:flex">
        {LINKS.map((l) => {
          const id = l.href.split("#")[1] ?? (l.href === "/work" ? "work-route" : "");
          const on = id && active === id;
          return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={on ? "page" : undefined}
            className={`state-layer rounded-full px-3.5 py-2 no-underline transition-colors ${
              on ? "bg-primary text-on-primary shadow-[0_10px_22px_-16px_var(--color-primary)]" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {l.label}
          </Link>
          );
        })}
      </div>

      <div className="hidden xl:block">
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
            className="hig-glass absolute left-0 right-0 top-[calc(100%+10px)] flex flex-col gap-1 rounded-[24px] p-3 xl:hidden"
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
            <a
              href="https://linkedin.com/in/dewaldvisser"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="hig-control mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-label-l text-on-primary no-underline"
            >
              LinkedIn <IconSymbol name="open_in_new" size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
