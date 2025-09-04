"use client";

import * as React from "react";
import { Program, programs, ProgramLevel, CEFR } from "@/lib/programs";
import { ProgramCard } from "@/components/study/program-card";
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

const allCountries = Array.from(new Set(programs.map((p) => p.country))).sort();
const allLevels = Array.from(
  new Set(programs.map((p) => p.level))
).sort() as ProgramLevel[];
const allLanguages = Array.from(
  new Set(programs.flatMap((p) => (p.languages ?? []).map((l) => l.lang)))
).sort(); // e.g., ["English"]

const LEVELS: CEFR[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const order = (lvl?: CEFR) => (lvl ? LEVELS.indexOf(lvl) : -1);

export default function ProgramsBoard() {
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState<string | "all">("all");
  const [level, setLevel] = React.useState<ProgramLevel | "all">("all");
  const [language, setLanguage] = React.useState<"any" | "none" | string>(
    "any"
  );
  const [minLevel, setMinLevel] = React.useState<"any" | CEFR>("any");

  const filtered = React.useMemo(() => {
    const ql = q.trim().toLowerCase();

    return programs.filter((p) => {
      const matchQ =
        !ql ||
        p.name.toLowerCase().includes(ql) ||
        p.school.toLowerCase().includes(ql) ||
        p.location.toLowerCase().includes(ql);

      const matchCountry = country === "all" || p.country === country;
      const matchLevel = level === "all" || p.level === level;

      const langs = p.languages ?? [];
      let matchLang = true;

      if (language === "none") {
        matchLang = langs.length === 0;
      } else if (language !== "any") {
        const entries = langs.filter((l) => l.lang === language);
        if (entries.length === 0) matchLang = false;
        else if (minLevel !== "any") {
          const minIdx = order(minLevel);
          matchLang = entries.some((e) => order(e.minLevel) >= minIdx);
        }
      } else if (language === "any" && minLevel !== "any") {
        const minIdx = order(minLevel);
        matchLang = langs.some((e) => order(e.minLevel) >= minIdx);
      }

      return matchQ && matchCountry && matchLevel && matchLang;
    });
  }, [q, country, level, language, minLevel]);

  const clear = () => {
    setQ("");
    setCountry("all");
    setLevel("all");
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
              placeholder="Program, school, or location…"
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

          {/* Level */}
          <div>
            <Label>Level</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="all">All</SelectItem>
                {allLevels.map((lv) => (
                  <SelectItem key={lv} value={lv}>
                    {lv}
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
              Example: English + B2 to find IELTS-equivalent programs.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <Button variant="ghost" onClick={clear} className="text-neutral-700">
            Clear filters
          </Button>
        </div>
      </div>

      {/* Results 3/2/1 */}
      <div
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5")}
      >
        {filtered.map((p) => (
          <ProgramCard key={p.slug} program={p} />
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
