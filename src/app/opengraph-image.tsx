import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded OG card (dark, emerald accent) used for link previews + Twitter.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c100e",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#2fae82",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          <div style={{ display: "flex" }}>›</div>
          PORTFOLIO
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#9aa39e",
              fontSize: 40,
              fontWeight: 500,
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        {/* Footer: accent bar + domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 8,
              background: "#2fae82",
              borderRadius: 4,
            }}
          />
          <div style={{ display: "flex", color: "#e8ece9", fontSize: 30 }}>
            ajkumarray.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
