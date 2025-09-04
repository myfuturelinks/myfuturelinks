import { sectors } from "@/lib/content";

export function SectorsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {sectors.map((s) => (
        <div
          key={s.title}
          className="rounded-2xl p-4 ring-1 ring-ink/10 hover:ring-ink/20 transition"
        >
          <div className="text-sm font-semibold text-neutral-700 leading-relaxed">{s.title}</div>
          <div className="text-xs mt-1 text-neutral-700 leading-relaxed">{s.text}</div>
        </div>
      ))}
    </div>
  );
}
