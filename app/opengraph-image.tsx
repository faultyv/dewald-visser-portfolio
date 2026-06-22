import { ImageResponse } from "next/og";

export const alt = "Dewald Visser — Founder, Growth Marketer, Designer, Systems Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const tags = [
    { label: "Entrepreneur", color: "#6C6CFF" },
    { label: "Marketing", color: "#0073EA" },
    { label: "Graphic Design", color: "#E2445C" },
    { label: "Web", color: "#00C875" },
    { label: "AI Enablement", color: "#FF158A" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 78px",
          background:
            "radial-gradient(1100px 700px at 80% -12%, rgba(108,108,255,0.42), transparent 60%), radial-gradient(900px 620px at -6% 112%, rgba(0,115,234,0.38), transparent 55%), linear-gradient(135deg,#11152A 0%,#172045 48%,#101427 100%)",
          fontFamily: "sans-serif",
          color: "#F2F4FB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: "#0073EA", boxShadow: "0 0 38px #0073EA" }} />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>Dewald Visser</div>
          <div style={{ marginLeft: "auto", fontSize: 21, color: "#A6ABC9" }}>Hillcrest · Durban · ZA</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 122, fontWeight: 800, lineHeight: 1, letterSpacing: -3, display: "flex" }}>
            Dewald Visser<span style={{ color: "#0073EA" }}>.</span>
          </div>
          <div style={{ fontSize: 34, color: "#C7CBE4", maxWidth: 920, lineHeight: 1.3, display: "flex" }}>
            Strategy, design and code under one roof — brand, growth marketing, web systems and practical AI.
          </div>
        </div>

        <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <div
              key={t.label}
              style={{ fontSize: 25, fontWeight: 600, color: "#fff", background: t.color, padding: "11px 24px", borderRadius: 999, display: "flex" }}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
