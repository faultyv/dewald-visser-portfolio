"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";
import type { GalleryItem } from "@/lib/content";

const TILE_PATTERN = [
  "md:[grid-column:1/9] md:[grid-row:1/5]",
  "md:[grid-column:9/14] md:[grid-row:1/3]",
  "md:[grid-column:9/12] md:[grid-row:3/5]",
  "md:[grid-column:12/14] md:[grid-row:3/5]",
  "md:[grid-column:1/8] md:[grid-row:5/7]",
  "md:[grid-column:8/14] md:[grid-row:5/7]",
  "md:col-span-4 md:row-span-2",
  "md:col-span-5 md:row-span-2",
];

function tileClass(index: number, total: number) {
  if (total === 1) return "md:[grid-column:1/14] md:[grid-row:1/5]";
  if (total === 2) return index === 0 ? "md:[grid-column:1/9] md:[grid-row:1/5]" : "md:[grid-column:9/14] md:[grid-row:1/5]";
  if (total === 3) {
    if (index === 0) return "md:[grid-column:1/9] md:[grid-row:1/5]";
    if (index === 1) return "md:[grid-column:9/14] md:[grid-row:1/3]";
    return "md:[grid-column:9/14] md:[grid-row:3/5]";
  }
  return TILE_PATTERN[index % TILE_PATTERN.length];
}

function tileSizes(index: number, total: number) {
  if (total === 1) return "(max-width:768px) 92vw, 1050px";
  if (index === 0) return "(max-width:768px) 92vw, 680px";
  if (index === 1) return "(max-width:768px) 92vw, 420px";
  return "(max-width:768px) 92vw, 300px";
}

export function ProjectGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const media = gallery.filter((item) => item.src);
  const selected = openIdx !== null ? media[openIdx] : null;

  const goTo = useCallback(
    (direction: number) => {
      setOpenIdx((idx) => {
        if (idx === null || media.length < 2) return idx;
        return (idx + direction + media.length) % media.length;
      });
    },
    [media.length],
  );

  useEffect(() => {
    if (openIdx === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, openIdx]);

  useEffect(() => {
    const buttons = Array.from(galleryRef.current?.querySelectorAll<HTMLButtonElement>("[data-gallery-index]") ?? []);
    const listeners = buttons.map((button) => {
      const open = () => {
        const index = Number(button.dataset.galleryIndex);
        if (Number.isInteger(index)) setOpenIdx(index);
      };
      button.addEventListener("click", open);
      button.addEventListener("pointerdown", open);
      return [button, open] as const;
    });

    return () => {
      listeners.forEach(([button, open]) => {
        button.removeEventListener("click", open);
        button.removeEventListener("pointerdown", open);
      });
    };
  }, [media.length]);

  if (!media.length) return null;

  return (
    <Dialog.Root open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
      <div ref={galleryRef} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:[grid-auto-rows:minmax(88px,8vw)] md:[grid-template-columns:repeat(13,minmax(0,1fr))] lg:[grid-auto-rows:minmax(96px,7vw)]">
        {media.map((g, i) => (
          <button
            key={g.id}
            type="button"
            data-gallery-index={i}
            onPointerDown={() => setOpenIdx(i)}
            onClick={() => setOpenIdx(i)}
            className={`group relative min-h-0 cursor-pointer overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low p-0 text-left elevation-1 state-layer aspect-[1.42/1] sm:aspect-square md:aspect-auto md:h-full ${tileClass(i, media.length)}`}
          >
            <Image
              src={g.src!}
              alt={g.label}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              sizes={tileSizes(i, media.length)}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15" />
            <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-1 text-label-s text-white backdrop-blur-md">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute inset-x-0 bottom-0 p-3 md:p-4">
              <span className="block max-w-[30ch] text-label-m text-white drop-shadow-sm">{g.label}</span>
            </span>
          </button>
        ))}
      </div>

      <Dialog.Portal>
        <AnimatePresence>
          {selected && openIdx !== null && (
            <>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[120] bg-scrim"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={fmTransition.emphasized}
                  className="fixed inset-0 z-[121] flex items-center justify-center p-3 md:p-6"
                >
                  <Dialog.Title className="sr-only">{selected.label}</Dialog.Title>
                  <div className="relative grid h-[min(84vh,760px)] w-full max-w-6xl grid-rows-[1fr_auto] overflow-hidden rounded-lg border border-outline bg-surface-container-high elevation-4">
                    <div className="relative min-h-0 bg-scrim">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selected.id}
                          initial={{ opacity: 0.2, scale: 0.985 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 0.985 }}
                          transition={fmTransition.standard}
                          className="absolute inset-0"
                        >
                          <Image src={selected.src!} alt={selected.label} fill className="object-contain" sizes="92vw" />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant bg-surface-container px-4 py-3 md:px-5">
                      <div>
                        <div className="text-label-s text-on-surface-variant">
                          {String(openIdx + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
                        </div>
                        <div className="text-title-s text-on-surface">{selected.label}</div>
                      </div>

                      {media.length > 1 && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => goTo(-1)}
                            className="hig-control state-layer grid h-10 w-10 cursor-pointer place-items-center rounded-full text-on-surface"
                            aria-label="Previous image"
                          >
                            <IconSymbol name="chevron_left" size={22} />
                          </button>
                          <button
                            type="button"
                            onClick={() => goTo(1)}
                            className="hig-control state-layer grid h-10 w-10 cursor-pointer place-items-center rounded-full text-on-surface"
                            aria-label="Next image"
                          >
                            <IconSymbol name="chevron_right" size={22} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Dialog.Close className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-outline bg-surface-container text-on-surface elevation-2 state-layer md:right-6 md:top-6">
                    <IconSymbol name="close" size={22} />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
