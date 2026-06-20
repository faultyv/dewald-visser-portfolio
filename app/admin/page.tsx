import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CMS — Dewald Visser",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <>
      <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
      <main style={{ minHeight: "100svh", background: "#11152a" }}>
        <noscript>
          <div style={{ padding: 24, color: "#fff", fontFamily: "system-ui, sans-serif" }}>
            JavaScript is required to use the CMS.
          </div>
        </noscript>
      </main>
      <Script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js" strategy="afterInteractive" />
    </>
  );
}
