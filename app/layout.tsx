import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import { THEME_CSS } from "@/lib/m3-theme";
import { Providers } from "@/components/Providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dewald Visser — Founder, Marketer, Designer, Builder",
  description:
    "Multidisciplinary founder and creative — building brands, running the marketing that grows them, and shipping the web experiences that carry them.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var t = localStorage.getItem('cc-theme');
    var valid = ['light','dark'];
    document.documentElement.setAttribute('data-theme', valid.includes(t) ? t : 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

const THEME_FALLBACK_SCRIPT = `
(function () {
  function applyTheme(t) {
    if (t !== 'light' && t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('cc-theme', t); } catch (e) {}
    var labels = { light: 'Light', dark: 'Dark' };
    document.querySelectorAll('[data-theme-name]').forEach(function (el) { el.textContent = labels[t]; });
    document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-theme-btn') === t;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('border-primary', on);
      btn.classList.toggle('bg-primary', on);
      btn.classList.toggle('text-on-primary', on);
      btn.classList.toggle('elevation-1', on);
      btn.classList.toggle('border-transparent', !on);
      btn.classList.toggle('bg-transparent', !on);
      btn.classList.toggle('text-on-surface-variant', !on);
    });
  }
  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('[data-theme-btn]') : null;
    if (!target) return;
    applyTheme(target.getAttribute('data-theme-btn'));
  }, true);
  window.__applyDewaldTheme = applyTheme;
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
        <style id="m3-theme-tokens" dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_FALLBACK_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased" id="root-theming">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
