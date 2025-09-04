"use client";

import Link from "next/link";
import Container from "@/components/site/container";

const sectors = [
  { title: "Healthcare", text: "Care assistants, nurses" },
  { title: "Tech & IT", text: "Developers, support" },
  { title: "Hospitality", text: "Chefs, waitstaff" },
  { title: "Logistics", text: "Warehouse, drivers" },
];

export function Hero() {
  return (
    <section className="relative py-16 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-[clamp(32px,6vw,56px)] font-extrabold leading-tight text-ink">
            Work or study your way to{" "}
            <span className="text-brand-500">Europe</span>
          </h1>

          <p className="mt-5 text-lg text-neutral-800 leading-relaxed max-w-xl">
            MyFutureLinks is a trusted bridge for talent and students seeking
            opportunities in Belgium, the Netherlands, and Germany — with
            ethical recruitment, admissions guidance, and end-to-end compliance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-neutral-700">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Ethical & compliant
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Transparent fees
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              EU bridge
            </span>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/work"
              className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
            >
              Explore jobs
            </Link>
            <Link
              href="/study"
              className="px-5 py-3 rounded-2xl ring-1 ring-ink/15 hover:bg-brand-500"
            >
              Explore study
            </Link>
          </div>
        </div>

        {/* RIGHT: gradient frame + 4 inner boxes */}
        <div className="lg:justify-self-end">
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-brand-500 via-amber-300 to-ink">
            <div className="rounded-3xl bg-white p-6 md:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectors.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl p-4 ring-1 ring-ink/10 hover:ring-ink/20 transition"
                  >
                    <div className="text-sm font-semibold text-ink">
                      {s.title}
                    </div>
                    <div className="text-xs mt-1 text-neutral-600">
                      {s.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-neutral-600">
                Plus: Business, Engineering, Health & Social programs (Study).
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
