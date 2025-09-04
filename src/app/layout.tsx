import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/use-toast";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "work in Europe",
    "study in Europe",
    "Belgium jobs",
    "Netherlands study",
    "Germany admissions",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-ink">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>{" "}
          {/* grows to push footer down */}
          <Footer />
          {/* <Toaster /> */}
        </ToastProvider>
      </body>
    </html>
  );
}
