import { Program } from "@/lib/programs";
import Link from "next/link";

export function ProgramCard({ program }: { program: Program }) {
  const langs = program.languages ?? [];

  return (
    <div
      className="relative group bg-white p-6 rounded-3xl ring-1 ring-ink/10
                 transition hover:ring-ink/20 hover:shadow-md focus-within:ring-brand-500"
    >
      {/* Full-card click */}
      <Link
        href={`/contact?category=Study&program=${program.slug}`}
        aria-label={`Apply for ${program.name}`}
        className="absolute inset-0 rounded-3xl"
        tabIndex={-1}
      />

      <div className="flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-ink">{program.name}</h3>
          <p className="text-sm text-neutral-600 mt-1">
            {program.school} · {program.location}
          </p>
          <p className="text-xs text-neutral-600 mt-1">
            Level: {program.level}
          </p>

          {/* Languages */}
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

          {/* Other requirements */}
          {program.requirements?.length ? (
            <div className="mt-4">
              <div className="text-sm font-semibold text-ink">Requirements</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 leading-relaxed">
                {program.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* <Link
          href={`/contact?category=Study&program=${program.slug}`}
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
