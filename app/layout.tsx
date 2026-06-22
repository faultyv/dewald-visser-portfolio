import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import Script from "next/script";
import { THEME_CSS } from "@/lib/m3-theme";
import { Providers } from "@/components/Providers";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const NAME = "Dewald Visser";
const TAGLINE = "Founder, Growth Marketer, Designer, Systems Builder";
const DESCRIPTION =
  "Founder-operator across brand, growth marketing, web systems and practical AI enablement — strategy, design and code under one roof.";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — ${TAGLINE}`,
    template: `%s — ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: `${NAME} Portfolio`,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    "Dewald Visser",
    "founder",
    "growth marketing",
    "graphic design",
    "web design",
    "AI enablement",
    "brand",
    "Durban",
    "South Africa",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: `${NAME} Portfolio`,
    title: `${NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    creator: "@TheBBQhunter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  jobTitle: TAGLINE,
  description: DESCRIPTION,
  url: SITE_URL,
  email: "mailto:dewaldvisser94@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Hillcrest, Durban", addressCountry: "ZA" },
  knowsLanguage: ["English", "Afrikaans", "Zulu", "German"],
  sameAs: [
    "https://linkedin.com/in/dewaldvisser",
    "https://behance.net/dewaldvisser",
    "https://instagram.com/dewaldv84",
    "https://x.com/TheBBQhunter",
    "https://dewaldvisser.co.za",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <Script id="person-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
        <style id="m3-theme-tokens" dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <Script id="theme-fallback" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_FALLBACK_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased" id="root-theming">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
