import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Emerald monogram for iOS home-screen / apple-touch icon
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
          background: "#0e7c5a",
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
          borderRadius: 40,
        }}
      >
        AK
      </div>
    ),
    { ...size }
  );
}
