import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#0c3b5e",
          color: "#e6a100",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
