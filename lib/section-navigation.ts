/** Match native fragment scrolling, including any project navigation above the section. */
export function sectionScrollOffset(element: HTMLElement) {
  const pagePadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const sectionMargin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  return pagePadding + sectionMargin;
}

export function scrollToSection(element: HTMLElement) {
  // Reveal animations translate off-screen content; anchors must use its settled layout.
  let layoutTop = 0;
  let current: HTMLElement | null = element;
  while (current) {
    layoutTop += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  const top = Math.max(0, layoutTop - sectionScrollOffset(element));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis) {
    window.__lenis.scrollTo(top, { immediate: reducedMotion });
  } else {
    window.scrollTo({ top, behavior: reducedMotion ? "instant" : "smooth" });
  }
}
