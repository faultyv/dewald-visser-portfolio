"use client";

export function ProjectMiniNav({ hasGallery }: { hasGallery: boolean }) {
  const items = [
    { id: "overview", label: "Overview" },
    ...(hasGallery ? [{ id: "gallery", label: "Gallery" }] : []),
    { id: "stack", label: "Stack" },
  ];

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, opts?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-[68px] z-[40] -mx-1 mb-9 flex gap-2 overflow-x-auto bg-surface/85 backdrop-blur-md py-3 px-1 border-b border-outline-variant">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => go(item.id)}
          className="state-layer text-label-l text-on-surface-variant px-4 py-2 rounded-full bg-surface-container border border-outline whitespace-nowrap cursor-pointer"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
