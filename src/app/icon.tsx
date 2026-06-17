import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Emerald monogram favicon
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
          background: "#0e7c5a",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 7,
        }}
      >
        AK
      </div>
    ),
    { ...size }
  );
}
