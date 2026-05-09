import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Dynamically generated 1200x630 PNG served at /og-image.png
// Used by OG / Twitter / Schema.org metadata across all pages.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a4d2e 0%, #2d3436 50%, #0a2818 100%)",
          color: "#F8B500",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* pixel-art trees decoration (top corners) */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            fontSize: "120px",
            opacity: 0.6,
          }}
        >
          🌲
        </div>
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            fontSize: "120px",
            opacity: 0.6,
          }}
        >
          🌲
        </div>

        {/* main title */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 900,
            marginBottom: "16px",
            color: "#F8B500",
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          Forest Survival
        </div>

        {/* subtitle */}
        <div
          style={{
            fontSize: "44px",
            color: "#DFE6E9",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          A 10-Day Browser Survival Challenge
        </div>

        {/* feature row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: "30px",
            color: "#55E6C1",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            🪵 Gather
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            🔥 Survive
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            ⏳ 10 Days
          </span>
        </div>

        {/* footer ribbon */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "16px",
            fontSize: "24px",
            color: "#DFE6E9",
            opacity: 0.85,
          }}
        >
          <span>Free</span>
          <span>·</span>
          <span>No Download</span>
          <span>·</span>
          <span>Play Instantly</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
