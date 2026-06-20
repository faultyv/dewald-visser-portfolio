import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "#11152A",
          color: "#F2F4FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            background: "linear-gradient(135deg, #0073EA, #6C6CFF 48%, #FF158A)",
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: 0,
          }}
        >
          DV
        </div>
      </div>
    ),
    { ...size },
  );
}
