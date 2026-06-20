"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";
import { SEED_BG } from "@/lib/seed-classes";
import type { GalleryItem } from "@/lib/content";
import type { SeedName } from "@/lib/m3-theme";

export function ProjectGallery({ gallery, seed }: { gallery: GalleryItem[]; seed: SeedName }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <Dialog.Root open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
      <div className="grid gap-3.5 mb-9" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
        {gallery.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setOpenIdx(i)}
            className="relative rounded-lg overflow-hidden border-none p-0 cursor-pointer state-layer"
            style={{ aspectRatio: "4/3" }}
          >
            {g.src ? (
              <Image src={g.src} alt={g.label} fill className="object-cover" sizes="280px" />
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center ${SEED_BG[seed]} opacity-15`}>
                <IconSymbol name="image" size={28} className="text-on-surface-variant opacity-60" />
              </div>
            )}
            <span className="absolute bottom-0 left-0 right-0 bg-scrim text-white text-label-s px-2.5 py-1.5">{g.label}</span>
          </button>
        ))}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-scrim"
          />
        </Dialog.Overlay>
        <AnimatePresence>
          {openIdx !== null && (
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={fmTransition.emphasized}
                className="fixed inset-0 z-[121] flex items-center justify-center p-6"
              >
                <Dialog.Title className="sr-only">{gallery[openIdx]?.label}</Dialog.Title>
                <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-surface-container" style={{ aspectRatio: "4/3" }}>
                  {gallery[openIdx]?.src ? (
                    <Image src={gallery[openIdx].src!} alt={gallery[openIdx].label} fill className="object-cover" />
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${SEED_BG[seed]} opacity-15`}>
                      <IconSymbol name="image" size={48} className="text-on-surface-variant opacity-60" />
                    </div>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-scrim text-white text-label-l px-4 py-3">{gallery[openIdx]?.label}</span>
                </div>
                <Dialog.Close className="absolute top-6 right-6 w-11 h-11 rounded-full bg-surface-container border border-outline flex items-center justify-center state-layer cursor-pointer">
                  <IconSymbol name="close" size={22} className="text-on-surface" />
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
