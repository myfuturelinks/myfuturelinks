import { Job } from "@/lib/jobs";
import Link from "next/link";

export function JobCard({ job }: { job: Job }) {
  const langs = job.languages ?? [];

  return (
    <div
      className="relative group bg-white p-6 rounded-3xl ring-1 ring-ink/10
                 transition hover:ring-ink/20 hover:shadow-md focus-within:ring-brand-500"
    >
      {/* Full-card click target */}
      <Link
        href={`/contact?category=Work&job=${job.slug}`}
        aria-label={`Apply for ${job.title}`}
        className="absolute inset-0 rounded-3xl"
        tabIndex={-1}
      />

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-ink">{job.title}</h3>
          <p className="text-sm text-neutral-600 mt-1">{job.location}</p>

          <div className="mt-3">
            <div className="text-sm font-semibold text-ink">Languages</div>
            {langs.length === 0 ? (
              <p className="text-sm text-neutral-600 mt-1">None required</p>
            ) : (
              <ul className="mt-1 list-disc pl-5 text-sm text-neutral-700 leading-relaxed">
                {langs.map((l, i) => (
                  <li key={i}>
                    {l.lang}
                    {l.minLevel ? ` — ${l.minLevel}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {job.requirements?.length ? (
            <div className="mt-4">
              <div className="text-sm font-semibold text-ink">Requirements</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 leading-relaxed">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Visible CTA (stays compact; full width on mobile only) */}
        {/* <Link
          href={`/contact?category=Work&job=${job.slug}`}
          className="relative z-10 mt-6 w-full sm:w-auto self-start
                     inline-flex items-center justify-center rounded-xl
                     bg-brand-500 text-ink font-semibold px-6 py-3 hover:opacity-90"
        >
          Apply
        </Link> */}
      </div>
    </div>
  );
}
