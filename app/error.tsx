"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IconSymbol } from "@/components/IconSymbol";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface for debugging; swap for a logging service if one is ever wired up.
    console.error(error);
  }, [error]);

  return (
    <main className="content-shell relative flex min-h-[100svh] items-center py-28">
      <section className="max-w-[760px]">
        <div className="text-label-l text-primary mb-4">Something broke</div>
        <h1 className="m-0 text-display-s text-on-surface">A fault slipped through.</h1>
        <p className="mt-5 max-w-[560px] text-body-l text-on-surface-variant">
          An unexpected error interrupted this page. Retry to reload it, or head back into the portfolio.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="hig-control state-layer inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-label-l text-on-primary"
          >
            Try again <IconSymbol name="refresh" size={18} />
          </button>
          <Link href="/work" className="hig-control state-layer inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-label-l text-on-surface no-underline">
            View work <IconSymbol name="arrow_forward" size={18} />
          </Link>
          <Link href="/" className="hig-control state-layer inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-label-l text-on-surface no-underline">
            Home <IconSymbol name="home" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
