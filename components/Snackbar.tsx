"use client";

import { AnimatePresence, motion } from "motion/react";
import { fmTransition } from "@/lib/motion-tokens";

export function Snackbar({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={fmTransition.emphasized}
          className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[95] bg-surface-container-highest text-on-surface text-label-l px-5 py-3.5 rounded-lg elevation-4 flex items-center gap-2.5"
          role="status"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
