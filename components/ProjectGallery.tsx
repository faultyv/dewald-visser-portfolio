"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";
import type { GalleryItem } from "@/lib/content";

export function ProjectGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const media = gallery.filter((item) => item.src);

  if (!media.length) return null;

  return (
    <Dialog.Root open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
      <div className="grid gap-3.5 mb-9" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
        {media.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setOpenIdx(i)}
            className="relative rounded-lg overflow-hidden border-none p-0 cursor-pointer state-layer"
            style={{ aspectRatio: "4/3" }}
          >
            <Image src={g.src!} alt={g.label} fill className="object-cover" sizes="280px" />
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
                <Dialog.Title className="sr-only">{media[openIdx]?.label}</Dialog.Title>
                <div className="relative w-full max-w-3xl max-h-[80vh] aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container">
                  <Image src={media[openIdx].src!} alt={media[openIdx].label} fill className="object-contain" />
                  <span className="absolute bottom-0 left-0 right-0 bg-scrim text-white text-label-l px-4 py-3">{media[openIdx]?.label}</span>
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
