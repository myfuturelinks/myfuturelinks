// src/app/privacy/page.tsx
import type { Metadata } from "next";
import Container from "@/components/site/container";
import { site } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/jsonld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How we collect, use, share, and protect your personal data (including applicants from Nepal) and how to exercise your GDPR rights.",
  alternates: { canonical: "/privacy" },
};

const LastUpdated = "2025-09-04"; // update when you change the policy

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <Container className="prose prose-neutral max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>
        <p className="text-sm text-neutral-500">Last updated: {LastUpdated}</p>

        <p>
          This Privacy Policy explains how <strong>{site.legalName}</strong>{" "}
          (“we”, “us”, “our”) processes your personal data when you use our
          website at <strong>{site.url}</strong>, contact us, or apply for
          work/study opportunities. Because we operate in the EU, we follow the
          EU General Data Protection Regulation (GDPR) even if you are located
          outside the EU (for example, in Nepal).
        </p>

        <h2>1. Who we are</h2>
        <p>
          Data controller: <strong>{site.legalName}</strong>
          <br />
          Address: {site.address}, {site.country}
          <br />
          Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>

        <h2>2. Who this service is for (target audience)</h2>
        <p>
          Our website primarily serves applicants from <strong>Nepal</strong>{" "}
          who wish to
          <strong> study or work in Europe</strong>, and we may support
          applicants from other countries as well. At this time, our
          institutional and employer connections are focused on{" "}
          <strong>Malta</strong>.
        </p>

        <h2>3. Minimum age</h2>
        <p>
          You must be <strong>18 years or older</strong> to use our services and
          apply through this website. We do not knowingly accept or process
          applications from minors. If you believe a minor has provided data,
          please contact us and we will delete it.
        </p>

        <h2>4. What data we collect</h2>
        <ul>
          <li>
            <strong>Contact details</strong>: name, email, phone (including
            country code), and the category you select (Work/Study); your
            message.
          </li>
          <li>
            <strong>Profile/application data</strong> (only if you provide it):
            nationality, preferred destination (e.g., Malta), education or work
            background, skills, language level(s), and documents (e.g., CV,
            transcripts) if you later choose to share them.
          </li>
          <li>
            <strong>Technical/usage data</strong>: IP address, timestamps, and
            basic diagnostics to keep the site secure and improve it.
          </li>
          <li>
            <strong>Anti-spam signals</strong>: rate-limit counters and optional
            bot-check tokens (only if a captcha is enabled).
          </li>
        </ul>

        <h2>5. Why we use your data (legal bases)</h2>
        <ul>
          <li>
            <strong>To respond to enquiries and process applications</strong>{" "}
            you request, including connecting you with colleges/employers (GDPR
            Art. 6(1)(b) – contract / pre-contract steps).
          </li>
          <li>
            <strong>To improve and secure our services</strong> (GDPR Art.
            6(1)(f) – legitimate interests).
          </li>
          <li>
            <strong>To comply with legal obligations</strong> where applicable
            (GDPR Art. 6(1)(c)).
          </li>
          <li>
            <strong>With your consent</strong> where required (GDPR Art.
            6(1)(a)), e.g., certain analytics or onward sharing beyond what’s
            necessary.
          </li>
        </ul>

        <h2>6. Who we share data with</h2>
        <p>
          We may share your data with trusted service providers (“processors”)
          and, with your request/consent, with partner institutions as separate
          data controllers:
        </p>
        <ul>
          <li>
            <strong>Partner colleges/employers in Malta</strong> (when you ask
            us to connect you). They are independent controllers and will apply
            their own privacy policies.
          </li>
          <li>
            <strong>Email delivery</strong> (e.g., Resend) to send and receive
            messages.
          </li>
          <li>
            <strong>Hosting & infrastructure</strong> (e.g., Vercel).
          </li>
          <li>
            <strong>Rate-limiting / anti-abuse</strong> (e.g., Upstash Redis) to
            protect forms.
          </li>
          <li>
            <strong>Bot protection</strong> (e.g., Cloudflare Turnstile) if
            enabled.
          </li>
          <li>
            <strong>Analytics</strong> (if enabled) for aggregate,
            non-identifying insights.
          </li>
        </ul>
        <p>We do not sell your personal data.</p>

        <h2>7. International transfers</h2>
        <p>
          If you are located outside the EU (for example, in Nepal), your data
          will be transferred to the EU for processing. We also may transfer
          data within the EU (including to <strong>Malta</strong>) to connect
          you with partner colleges/employers. Where a provider is outside the
          EEA, we rely on appropriate safeguards such as the European
          Commission’s Standard Contractual Clauses or adequacy decisions.
        </p>

        <h2>8. How long we keep your data</h2>
        <p>
          We retain enquiries and application-related data for as long as
          necessary to handle your request and for a reasonable period
          afterwards (typically up to <strong>24 months</strong>), unless a
          longer period is required by law or needed to establish/defend legal
          claims. Email/service logs may be retained for security and
          compliance.
        </p>

        <h2>9. Your rights</h2>
        <ul>
          <li>Access your data and receive a copy</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Delete your data (“right to be forgotten”)</li>
          <li>Restrict or object to processing</li>
          <li>Data portability</li>
          <li>
            Withdraw consent at any time (where processing is based on consent)
          </li>
          <li>
            Lodge a complaint with your supervisory authority (for example,
            Belgium: Data Protection Authority)
          </li>
        </ul>
        <p>
          To exercise these rights, email{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We
          may need to verify your identity before acting on your request.
        </p>

        <h2>10. Security</h2>
        <p>
          We use technical and organizational measures to protect your data
          (TLS, access controls, least-privilege, rate-limiting, and optional
          bot protection). No method is completely secure; we continuously
          improve our safeguards.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be
          posted here with a new “Last updated” date.
        </p>

        <h2>Contact</h2>
        <p>
          {site.legalName}
          <br />
          {site.address}, {site.country}
          <br />
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>

        <p className="text-xs text-neutral-500">
          This page provides general information and is not legal advice.
        </p>

        {/* JSON-LD for breadcrumbs & page type */}
        <JsonLd
          id="privacy-breadcrumbs"
          data={{
            "@context": "https://schema.org",
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
          }}
        />
        <JsonLd
          id="privacy-webpage"
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: `${site.url}/privacy`,
            isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            about: [
              { "@type": "Country", name: "Nepal" },
              { "@type": "Country", name: "Malta" },
            ],
          }}
        />
      </Container>
    </section>
  );
}
