import Container from "@/components/site/container";
import ContactForm from "@/components/forms/contact-form";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/jsonld";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Ask about jobs, admissions, visa guidance, or requirements.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-ink">Contact us</h1>
        <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
          Tell us whether you&apos;re applying for Work or Study. We&apos;ll
          reply by email within 1–2 business days.
        </p>

        <div className="mt-8 max-w-xl">
          <div className="rounded-2xl p-6 ring-1 ring-ink/10 bg-white">
            <ContactForm />
          </div>
        </div>

        {/* JSON-LD */}
        <JsonLd
          id="contact-breadcrumbs"
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
                name: "Contact",
                item: `${site.url}/contact`,
              },
            ],
          }}
        />
      </Container>
    </section>
  );
}

// import Container from "@/components/site/container";
// import ApplyForm from "@/components/forms/apply-form";

// export default function ApplyPage() {
//   return (
//     <section className="py-16">
//       <Container>
//         <h1 className="text-3xl font-extrabold text-ink">Apply</h1>
//         <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
//           Submit your profile for Work or Study opportunities in Belgium, the
//           Netherlands, and Germany.
//         </p>

//         <div className="mt-8 max-w-xl rounded-2xl p-6 ring-1 ring-ink/10 bg-white">
//           <ApplyForm />
//         </div>
//       </Container>
//     </section>
//   );
// }
