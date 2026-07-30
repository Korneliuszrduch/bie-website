import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Avoid picking parent c:\dev\package-lock.json as workspace root
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    const staging =
      process.env.SITE_ENV !== "production" ||
      (process.env.NEXT_PUBLIC_SITE_URL ?? "").includes("nowa.");

    if (!staging) return [];

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
