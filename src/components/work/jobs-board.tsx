"use client";

import * as React from "react";
import { jobs, CEFR } from "@/lib/jobs";
import { JobCard } from "@/components/work/job-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const allCountries = Array.from(new Set(jobs.map((j) => j.country))).sort();
const allSectors = Array.from(new Set(jobs.map((j) => j.sector))).sort();
const allLanguages = Array.from(
  new Set(jobs.flatMap((j) => (j.languages ?? []).map((l) => l.lang)))
).sort(); // e.g., ["Dutch","English"]

const LEVELS: CEFR[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const levelOrder = (lvl?: CEFR) => (lvl ? LEVELS.indexOf(lvl) : -1); // undefined => lowest

export default function JobsBoard() {
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState<string | "all">("all");
  const [sector, setSector] = React.useState<string | "all">("all");
  const [language, setLanguage] = React.useState<"any" | "none" | string>(
    "any"
  );
  const [minLevel, setMinLevel] = React.useState<"any" | CEFR>("any");

  const filtered = React.useMemo(() => {
    const ql = q.trim().toLowerCase();

    return jobs.filter((j) => {
      const matchQ =
        !ql ||
        j.title.toLowerCase().includes(ql) ||
        j.location.toLowerCase().includes(ql) ||
        j.skills.some((s) => s.toLowerCase().includes(ql));

      const matchCountry = country === "all" || j.country === country;
      const matchSector = sector === "all" || j.sector === sector;

      // language filtering
      const langs = j.languages ?? [];
      let matchLang = true;

      if (language === "none") {
        matchLang = langs.length === 0;
      } else if (language !== "any") {
        // must have this language
        const entries = langs.filter((l) => l.lang === language);
        if (entries.length === 0) matchLang = false;
        else if (minLevel !== "any") {
          const minIdx = levelOrder(minLevel);
          matchLang = entries.some((e) => levelOrder(e.minLevel) >= minIdx);
        }
      } else if (language === "any" && minLevel !== "any") {
        // Any language but with min level: job must have any language >= min
        const minIdx = levelOrder(minLevel);
        matchLang = langs.some((e) => levelOrder(e.minLevel) >= minIdx);
      }

      return matchQ && matchCountry && matchSector && matchLang;
    });
  }, [q, country, sector, language, minLevel]);

  const clearFilters = () => {
    setQ("");
    setCountry("all");
    setSector("all");
    setLanguage("any");
    setMinLevel("any");
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="rounded-3xl bg-white ring-1 ring-ink/10 p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-4">
          {/* Search */}
          <div>
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Title or location…"
            />
          </div>

          {/* Country */}
          <div>
            <Label>Country</Label>
            <Select value={country} onValueChange={(v) => setCountry(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="all">All</SelectItem>
                {allCountries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sector */}
          <div>
            <Label>Sector</Label>
            <Select value={sector} onValueChange={(v) => setSector(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="All sectors" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="all">All</SelectItem>
                {allSectors.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div>
            <Label>Language</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={language}
                onValueChange={(v) => setLanguage(v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="none">None required</SelectItem>
                  {allLanguages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={minLevel}
                onValueChange={(v) => setMinLevel(v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any level" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="any">Any level</SelectItem>
                  {LEVELS.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Tip: Choose “None required” to find jobs without language needs.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-neutral-700"
          >
            Clear filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5")}
      >
        {filtered.map((j) => (
          <JobCard key={j.slug} job={j} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-neutral-600">
          No matches. Try removing a filter.
        </div>
      )}
    </div>
  );
}
