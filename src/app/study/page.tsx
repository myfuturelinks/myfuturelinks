import Container from "@/components/site/container";
import { studyFaq } from "@/lib/content";
import ProgramsBoard from "@/components/study/programs-board";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/jsonld";
import { site } from "@/lib/site-config";
import { programs } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Study in the EU",
  description:
    "Bachelor, Master, vocational and foundation programs with admissions guidance and visa support.",
  alternates: { canonical: "/study" },
};

export default function StudyPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-ink">Study in the EU</h1>
        <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
          Bachelor, Master, vocational and foundation programs in Belgium, the
          Netherlands, and Germany. Guidance for SOP, CV, visa, funds and
          housing.
        </p>

        {/* ✅ Filterable programs */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-ink mb-4">Featured programs</h2>
          <ProgramsBoard />
        </div>

        {/* FAQs */}
        <div className="mt-12 space-y-3">
          {studyFaq.map((f) => (
            <details
              key={f.q}
              className="bg-white rounded-2xl p-5 ring-1 ring-ink/10"
            >
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        {/* JSON-LD */}
        <JsonLd
          id="study-breadcrumbs"
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
                name: "Study",
                item: `${site.url}/study`,
              },
            ],
          }}
        />
        <JsonLd
          id="study-itemlist"
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: programs.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/study`,
              name: p.name,
            })),
          }}
        />
      </Container>
    </section>
  );
}
