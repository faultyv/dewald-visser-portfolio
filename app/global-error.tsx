"use client";

import Link from "next/link";

// Renders only when the root layout itself throws, so the M3 theme CSS and fonts
// are not available here — everything is inlined and self-contained on purpose.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1020",
          color: "#e8eaf2",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 560 }}>
          <div style={{ color: "#5b8cff", fontWeight: 600, fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 16 }}>
            Something broke
          </div>
          <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.12, fontWeight: 700 }}>The site hit an unexpected error.</h1>
          <p style={{ marginTop: 18, color: "#a0a6b8", fontSize: 17, lineHeight: 1.5 }}>
            Reloading usually clears it. If it keeps happening, try again shortly.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{ cursor: "pointer", border: "none", borderRadius: 999, background: "#0073EA", color: "#fff", padding: "12px 22px", fontSize: 14, fontWeight: 600 }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{ borderRadius: 999, border: "1px solid #2a3350", color: "#e8eaf2", padding: "12px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
