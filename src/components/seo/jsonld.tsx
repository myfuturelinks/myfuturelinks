"use client";
import Script from "next/script";

export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, any>;
}) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
