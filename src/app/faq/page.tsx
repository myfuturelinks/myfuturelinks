import Container from "@/components/site/container";
import { workFaq, studyFaq } from "@/lib/content";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/jsonld";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-ink">FAQs</h1>

        <div id="work" className="mt-8">
          <h2 className="text-xl font-bold text-ink">Work — FAQs</h2>
          <ul className="mt-4 space-y-3">
            {workFaq.map((f) => (
              <li
                key={f.q}
                className="bg-white p-5 rounded-2xl ring-1 ring-ink/10"
              >
                <div className="font-medium">{f.q}</div>
                <div className="text-sm text-neutral-600 leading-relaxed mt-2">
                  {f.a}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="study" className="mt-10">
          <h2 className="text-xl font-bold text-ink">Study — FAQs</h2>
          <ul className="mt-4 space-y-3">
            {studyFaq.map((f) => (
              <li
                key={f.q}
                className="bg-white p-5 rounded-2xl ring-1 ring-ink/10"
              >
                <div className="font-medium">{f.q}</div>
                <div className="text-sm text-neutral-600 leading-relaxed mt-2">
                  {f.a}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* JSON-LD */}
        <JsonLd
          id="faq-breadcrumbs"
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
                name: "FAQ",
                item: `${site.url}/faq`,
              },
            ],
          }}
        />
      </Container>
    </section>
  );
}
