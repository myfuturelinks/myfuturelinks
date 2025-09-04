import { Hero } from "@/components/site/hero";
import { SectorsGrid } from "@/components/site/sectors-grid";
import Container from "@/components/site/container";
import Link from "next/link";
import { CardShell } from "@/components/site/card";
import { JsonLd } from "@/components/seo/jsonld";
import { site } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-16 bg-ink/5">
        <Container className="grid md:grid-cols-2 gap-6">
          <CardShell>
            <h3 className="text-xl font-extrabold text-ink">Work Abroad</h3>
            <ul className="mt-3 text-sm list-disc pl-5 text-neutral-700 leading-relaxed">
              <li>Healthcare, hospitality, logistics, tech/IT roles</li>
              <li>Employer interviews &amp; offer-handling</li>
              <li>Visa &amp; work-permit coordination</li>
              <li>Arrival checklist: housing, bank, registration</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/apply?type=work"
                className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
              >
                Apply for jobs
              </Link>
              <Link
                href="/faq#work"
                className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
              >
                Work FAQ
              </Link>
            </div>
          </CardShell>

          <CardShell>
            <h3 className="text-xl font-extrabold text-ink">Study in the EU</h3>
            <ul className="mt-3 text-sm list-disc pl-5 text-neutral-700 leading-relaxed">
              <li>Bachelor, Master, vocational, foundation programs</li>
              <li>Admissions support: SOP, CV, docs, deadlines</li>
              <li>Visa guidance: proof of funds, insurance, housing</li>
              <li>Arrival onboarding: registration, bank, transport</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/apply?type=study"
                className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
              >
                Start admissions
              </Link>
              <Link
                href="/faq#study"
                className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
              >
                Study FAQ
              </Link>
            </div>
          </CardShell>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-extrabold text-ink mb-6">Sectors</h2>
          <SectorsGrid />
        </Container>
      </section>

      {/* Structured data */}
      <JsonLd
        id="org"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: `${site.url}/favicon.ico`,
          sameAs: Object.values(site.social).filter(Boolean),
        }}
      />
      <JsonLd
        id="website"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/work?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </>
  );
}
