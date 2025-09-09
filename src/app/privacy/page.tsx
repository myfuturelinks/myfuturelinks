import type { Metadata } from "next";
import Container from "@/components/site/container";
import { site } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MyFutureLinks collects, uses, stores, and protects personal data for recruitment, education, and consultancy services.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "why-we-collect", label: "3. Why We Collect Data" },
  { id: "storage-retention", label: "4. Data Storage & Retention" },
  { id: "sharing", label: "5. Sharing of Information" },
  { id: "security", label: "6. Security Measures" },
  { id: "your-rights", label: "7. Your Rights" },
];

export default function PrivacyPage() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        {/* Hero */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">
            Privacy Policy
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 text-sm text-ink/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(245,208,66)]" />
              Effective date:{" "}
              <strong className="ml-1 font-semibold">09/2025</strong>
            </span>
            <span className="hidden md:inline text-sm text-neutral-500">
              Last updated when this page changes.
            </span>
          </div>
        </header>

        {/* Content grid */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* TOC */}
          <aside className="md:col-span-3">
            <details className="md:hidden rounded-xl border border-ink/10 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-ink">
                Table of contents
              </summary>
              <nav className="mt-3 space-y-2">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-2 py-1.5 text-sm text-ink/80 hover:bg-ink/[0.04]"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </details>

            <nav className="sticky top-24 hidden md:block rounded-xl border border-ink/10 bg-white p-4">
              <div className="mb-2 text-sm font-semibold text-ink">
                Table of contents
              </div>
              <ul className="space-y-1.5 text-sm">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="rounded-md px-2 py-1 text-ink/80 hover:bg-ink/[0.04] hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <article className="md:col-span-9">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
              <div className="prose max-w-none prose-p:leading-relaxed">
                <h2
                  id="introduction"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  1. Introduction
                </h2>
                <br />
                <p>
                  MyFutureLinks (“we”, “our”, “us”) values your privacy and is
                  committed to protecting personal information shared with us.
                  This Privacy Policy explains how we collect, use, store, and
                  protect personal data in the course of providing recruitment,
                  education, and consultancy services.
                </p>
                <br />
                <br />

                <h2
                  id="information-we-collect"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  2. Information We Collect
                </h2>
                <br />
                <p>We may collect:</p>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>
                    Personal details (name, nationality, date of birth, passport
                    copy).
                  </li>
                  <li>Contact information (email, phone, address).</li>
                  <li>
                    Professional/educational details (CV, diplomas,
                    certificates).
                  </li>
                  <li>Financial details (invoices, proof of funds).</li>
                  <li>
                    Communication records (emails, intake forms, interview
                    notes).
                  </li>
                </ul>
                <br />
                <br />

                <h2
                  id="why-we-collect"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  3. Why We Collect Data
                </h2>
                <br />
                <p>We use your data to:</p>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Assess your eligibility for jobs or study programs.</li>
                  <li>Match candidates with employers and institutions.</li>
                  <li>Support visa and relocation processes.</li>
                  <li>Communicate effectively regarding applications.</li>
                  <li>Manage invoicing and payments.</li>
                </ul>
                <br />
                <br />

                <h2
                  id="storage-retention"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  4. Data Storage &amp; Retention
                </h2>
                <br />
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>
                    Data is stored securely using professional cloud services
                    with restricted staff access.
                  </li>
                  <li>
                    We retain data only as long as necessary to deliver services
                    or meet legal requirements.
                  </li>
                  <li>Once no longer needed, data will be securely deleted.</li>
                </ul>
                <br />
                <br />

                <h2
                  id="sharing"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  5. Sharing of Information
                </h2>
                <br />
                <p>We may share information only when required for:</p>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Job applications with employers.</li>
                  <li>University/college admissions.</li>
                  <li>
                    Legal, financial, or administrative processes (such as visa
                    authorities).
                  </li>
                </ul>
                <br />
                <p className="font-medium">
                  We do not sell or misuse your information.
                </p>
                <br />
                <br />

                <h2
                  id="security"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  6. Security Measures
                </h2>
                <br />
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Limited staff access on a need-to-know basis.</li>
                  <li>Use of secure systems for storage and communication.</li>
                  <li>Confidentiality obligations for staff and partners.</li>
                </ul>
                <br />
                <br />

                <h2
                  id="your-rights"
                  className="text-xl font-bold text-ink scroll-mt-24"
                >
                  7. Your Rights
                </h2>
                <br />
                <p>You may request:</p>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Access to your personal information.</li>
                  <li>Correction of inaccurate details.</li>
                  <li>
                    Deletion of data once services are complete (where legally
                    possible).
                  </li>
                </ul>
                <br />
                <br />
              </div>

              {/* Contact card */}
              <div className="mt-8 rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
                <div className="text-sm text-neutral-700">
                  Requests can be sent to{" "}
                  <a
                    className="font-semibold underline"
                    href="mailto:legal@myfuturelinks.com"
                  >
                    legal@myfuturelinks.com
                  </a>
                  .
                </div>
              </div>

              <div className="mt-6 border-t border-ink/10 pt-4 text-sm text-neutral-500">
                If we make material changes to this Privacy Policy, we’ll update
                the effective date above and post the new version on this page.
              </div>
            </div>
          </article>
        </div>

        {/* JSON-LD */}
        <JsonLd
          id="privacy-jsonld"
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: `${site.url}/privacy`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: site.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Privacy Policy",
                  item: `${site.url}/privacy`,
                },
              ],
            },
            isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
          }}
        />
      </Container>
    </section>
  );
}
