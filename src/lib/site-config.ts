export const site = {
  name: "MyFutureLinks",
  description:
    "Ethical recruitment & EU study admissions guidance for European countries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.png", // we’ll add this image next
  nav: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work abroad" },
    { href: "/study", label: "Study in EU" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  social: {
    x: "https://x.com/",
    fb: "https://facebook.com/",
    ig: "https://instagram.com/",
    li: "https://www.linkedin.com/company/myfuturelinks/",
  },

  // --- Legal/contact (edit these to your real details) ---
  // legalName: "MyFutureLinks BV", // your registered name
  legalName: "MyFutureLinks", // your registered name
  // address: "Some Street 1, 1000 Brussels", // your office address
  // country: "Belgium",
  contactEmail: "enquiry@myfuturelinks.com",
} as const;
