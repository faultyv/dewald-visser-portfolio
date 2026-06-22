import type { NextConfig } from "next";
import path from "path";

// Conservative, non-breaking hardening headers applied to every response.
// Deliberately no Content-Security-Policy: the inline theme-init script and
// Google Fonts stylesheet would need a carefully-tuned nonce/allowlist, and a
// wrong CSP silently breaks the live site — not worth the risk for a portfolio.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
