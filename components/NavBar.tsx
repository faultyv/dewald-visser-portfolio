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
  { href: "/#contact", label: "Contact" },
];

export function NavBar({ name = "Dewald Visser" }: { name?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-4 py-3 backdrop-blur-md bg-surface/75 border-b border-outline-variant/60 sm:px-5 xl:px-10 xl:py-4">
      <Link href="/#hero" className="flex min-w-0 items-center gap-2.5 no-underline text-title-m text-on-surface sm:text-title-l">
        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
        <span className="truncate">{name}</span>
      </Link>

      <div className="hidden xl:flex items-center gap-6 text-label-l">
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
        className="state-layer grid h-11 w-11 place-items-center rounded-full text-on-surface xl:hidden"
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
            className="absolute top-full left-0 right-0 flex flex-col gap-1 rounded-b-[28px] border-b border-outline-variant bg-surface-container p-4 elevation-3 xl:hidden"
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
