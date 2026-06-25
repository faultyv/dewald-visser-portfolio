import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #2563EB, #5B5CE2 52%, #0891B2)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 0,
        }}
      >
        DV
      </div>
    ),
    { ...size },
  );
}
