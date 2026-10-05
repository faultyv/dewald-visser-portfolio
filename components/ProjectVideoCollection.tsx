"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { parseYouTubeId } from "@/lib/youtube";
import { IconSymbol } from "./IconSymbol";
import type { ProjectVideoItem } from "@/lib/content";

export function ProjectVideoCollection({ videos }: { videos: ProjectVideoItem[] }) {
  const [selected, setSelected] = useState<ProjectVideoItem | null>(null);
  const id = selected ? parseYouTubeId(selected.url) : null;
  return <section id="video-portfolio" className="mb-14 scroll-mt-28">
    <p className="text-label-l text-primary mb-2">Video editing & live production</p>
    <h2 className="text-headline-m text-on-surface">Watch the complete video collection.</h2>
    <p className="mt-3 mb-6 text-body-m text-on-surface-variant">Graduations, interviews, learning videos and campaign edits. Videos load when you choose to play them.</p>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => { const videoId = parseYouTubeId(video.url); return <button key={video.url} type="button" onClick={() => setSelected(video)} className="hig-card overflow-hidden text-left cursor-pointer" aria-label={`Play ${video.title}`}>
        <div className="relative bg-surface-container-low">
          {videoId && <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={video.title} width={480} height={360} unoptimized loading="lazy" className="w-full h-auto" />}
          <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-primary text-on-primary"><IconSymbol name="play_arrow" size={28} filled /></span>
        </div>
        <div className="p-4"><h3 className="text-title-s text-on-surface">{video.title}</h3>{video.role && <p className="mt-2 text-label-m text-primary">{video.role}</p>}</div>
      </button>; })}
    </div>
    <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}><Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[120] bg-scrim" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-[121] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface-container p-3 md:p-5 shadow-xl">
        <Dialog.Title className="mb-2 pr-12 text-title-m text-on-surface">{selected?.title}</Dialog.Title>
        <Dialog.Description className="mb-4 text-body-s text-on-surface-variant">A video from the Joseph Business School Africa portfolio.</Dialog.Description>
        {id && <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} title={selected?.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="aspect-video w-full border-0" />}
        {selected && <a href={selected.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-label-m text-primary">Watch on YouTube ↗</a>}
        <Dialog.Close aria-label="Close video" className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full text-on-surface"><IconSymbol name="close" size={24} /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal></Dialog.Root>
  </section>;
}
