import Container from "@/components/site/container";
import { workFaq } from "@/lib/content";
import JobsBoard from "@/components/work/jobs-board";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/jsonld";
import { site } from "@/lib/site-config";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Work abroad",
  description:
    "Ethical recruitment for healthcare, hospitality, logistics and tech/IT roles in Belgium, the Netherlands, and Germany.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-ink">Work abroad</h1>
        <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
          Ethical recruitment for healthcare, hospitality, logistics and
          tech/IT. We coordinate interviews, offers, and the work-permit process
          end to end.
        </p>

        {/* ✅ Filterable jobs */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-ink mb-4">Open roles</h2>
          <JobsBoard />
        </div>

        {/* FAQs */}
        <div className="mt-12 space-y-3">
          {workFaq.map((f) => (
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
          id="work-breadcrumbs"
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
                name: "Work",
                item: `${site.url}/work`,
              },
            ],
          }}
        />
        <JsonLd
          id="work-itemlist"
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: jobs.map((j, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/work`,
              name: j.title,
            })),
          }}
        />
      </Container>
    </section>
  );
}
