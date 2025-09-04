// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;





// next.config.mjs
/** @type {import('next').NextConfig} */

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' https://api.resend.com https://challenges.cloudflare.com;
  img-src 'self' data: blob:;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  frame-src https://challenges.cloudflare.com;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful browser features you don't use
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), usb=(), interest-cohort=()",
  },
  // Start CSP as report-only so nothing breaks; switch to Content-Security-Policy when confident
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
