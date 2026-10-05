"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArtworkImage } from "./ArtworkImage";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { IconSymbol } from "./IconSymbol";
import { fmTransition } from "@/lib/motion-tokens";
import type { GalleryItem } from "@/lib/content";
import dimensions from "@/lib/artwork-dimensions.json";

export function ProjectGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState("All work");
  const galleryRef = useRef<HTMLDivElement>(null);
  const allMedia = gallery.filter((item) => item.src);
  const media = allMedia.filter((item) => activeGroup === "All work" || (item.group ?? "Additional artwork") === activeGroup);
  const mediaCount = media.length;
  const groups = [...new Set(allMedia.map((item) => item.group ?? "Additional artwork"))];
  const filtered = media.map((item, index) => ({ item, index }));
  const selected = openIdx !== null ? media[openIdx] : null;

  const goTo = useCallback(
    (direction: number) => {
      setOpenIdx((idx) => {
        if (idx === null || mediaCount < 2) return idx;
        return (idx + direction + mediaCount) % mediaCount;
      });
    },
    [mediaCount],
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

  if (!media.length) return null;

  return (
    <Dialog.Root open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
      <div className="gallery-toolbar">
        <div><p className="text-title-m text-on-surface">Explore the artwork</p><p className="text-body-s text-on-surface-variant">The complete collection. Select any image for a closer look.</p></div>
        <span className="text-label-m text-on-surface-variant" aria-live="polite">{filtered.length} works</span>
      </div>
      {groups.length > 1 && <div className="gallery-filters" role="group" aria-label="Filter artwork">
        {["All work", ...groups].map((group) => <button key={group} type="button" aria-pressed={activeGroup === group} onClick={() => { setActiveGroup(group); }} className="gallery-filter">{group}</button>)}
      </div>}
      <div ref={galleryRef} className="artwork-gallery">
        {filtered.map(({ item: g, index: i }) => (
          <button
            key={g.id}
            type="button"
            data-gallery-index={i}
            onClick={() => setOpenIdx(i)}
            className="artwork-tile"
            aria-label={`View ${g.label}`}
          >
            <ArtworkImage src={g.src!} alt={g.label} sizes="(max-width:640px) 92vw, (max-width:1000px) 46vw, 500px" />
            <span className="artwork-caption"><span>{String(i + 1).padStart(2, "0")}</span><span>{g.label}</span><IconSymbol name="open_in_full" size={16} /></span>
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
                  <Dialog.Description className="sr-only">Complete artwork. Use the arrow keys to browse, or open the full-size image.</Dialog.Description>
                  <Dialog.Title className="sr-only">{selected.label}</Dialog.Title>
                  <div className="project-gallery-dialog relative grid h-[min(84vh,760px)] w-full max-w-6xl grid-rows-[1fr_auto] overflow-hidden border border-outline bg-surface-container-high elevation-4">
                    <div className="relative min-h-0 bg-scrim" style={{ backgroundColor: selected.src && (dimensions as Record<string, { background?: string }>)[selected.src]?.background === "dark" ? "#162a42" : undefined }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selected.id}
                          initial={{ opacity: 0.2, scale: 0.985 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 0.985 }}
                          transition={fmTransition.standard}
                          className="absolute inset-0"
                        >
                          <Image src={selected.src!} alt={selected.label} fill style={{ objectFit: selected.src?.endsWith(".svg") ? "contain" : "scale-down" }} sizes="92vw" unoptimized />
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

                      <div className="flex items-center gap-2">
                          <a href={selected.src!} target="_blank" rel="noreferrer" className="text-label-m text-primary px-3">Open full size</a>
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
                    </div>
                  </div>

                  <Dialog.Close aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-outline bg-surface-container text-on-surface elevation-2 state-layer md:right-6 md:top-6">
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
