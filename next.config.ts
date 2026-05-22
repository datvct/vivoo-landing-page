import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker multi-stage build
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env
        .NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL,
  },
  experimental: {
    proxyClientMaxBodySize:
      50 * 1024 * 1024, // 50MB
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://localhost:8080/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Thêm domain ảnh của bạn vào đây
        // Ví dụ: hostname: "example.com",
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "http",
        hostname: "**", // Cho phép mọi HTTP host (dev only)
      },
    ],
  },
};

export default nextConfig;
