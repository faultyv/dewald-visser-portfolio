"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#pillars", label: "Pillars" },
  { href: "/#method", label: "Method" },
  { href: "/#cv", label: "Career" },
  { href: "/#companies", label: "Companies" },
  { href: "/work", label: "Work" },
  { href: "/#credentials", label: "Certs" },
];

export function NavBar({ name = "Dewald Visser" }: { name?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-5 md:px-10 py-4 backdrop-blur-md bg-surface/70 border-b border-outline-variant/60">
      <Link href="/#hero" className="flex items-center gap-2.5 no-underline text-title-l text-on-surface">
        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
        {name}
      </Link>

      <div className="hidden md:flex items-center gap-7 text-label-l">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="text-on-surface-variant no-underline hover:text-on-surface transition-colors">
            {l.label}
          </Link>
        ))}
        <a
          href="https://linkedin.com/in/dewaldvisser"
          target="_blank"
          rel="noopener noreferrer"
          className="ripple-container state-layer text-on-primary bg-primary no-underline px-4.5 py-2.5 rounded-full inline-flex items-center gap-1.5"
        >
          LinkedIn <IconSymbol name="open_in_new" size={16} />
        </a>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden state-layer rounded-full p-2 text-on-surface"
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
            className="absolute top-full left-0 right-0 md:hidden bg-surface-container border-b border-outline-variant flex flex-col p-5 gap-1"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-title-m text-on-surface no-underline py-3 px-2 rounded-lg state-layer"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://linkedin.com/in/dewaldvisser"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 text-label-l text-on-primary bg-primary no-underline px-4 py-3 rounded-full inline-flex items-center justify-center gap-1.5"
            >
              LinkedIn <IconSymbol name="open_in_new" size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
