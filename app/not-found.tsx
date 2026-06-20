import Link from "next/link";
import { IconSymbol } from "@/components/IconSymbol";

export default function NotFound() {
  return (
    <main className="content-shell relative flex min-h-[100svh] items-center py-28">
      <section className="max-w-[760px]">
        <div className="text-label-l text-primary mb-4">404</div>
        <h1 className="m-0 text-display-s text-on-surface">This page is not in the system.</h1>
        <p className="mt-5 max-w-[560px] text-body-l text-on-surface-variant">
          The route may have moved, or the project you are looking for is not published yet. The work index is the best way back into the portfolio.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="hig-control state-layer inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-label-l text-on-primary no-underline">
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
