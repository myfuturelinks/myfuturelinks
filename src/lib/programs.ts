// Reuse the CEFR scale we used for jobs
export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type LanguageReq = {
  lang: string; // e.g., "English"
  minLevel?: CEFR; // optional
};

export type ProgramLevel = "Foundation" | "Bachelor" | "Master" | "Vocational";

export type Program = {
  slug: string;
  name: string;
  school: string;
  location: string; // "City, Country"
  country: string; // "Netherlands"
  level: ProgramLevel;
  languages?: LanguageReq[]; // optional
  requirements: string[]; // non-language items (CV, transcripts, etc.)
};

export const programs: Program[] = [
  {
    slug: "bachelor-it-netherlands",
    name: "BSc Information Technology",
    school: "Applied Sciences University",
    location: "The Hague, Netherlands",
    country: "Malta",
    level: "Bachelor",
    languages: [{ lang: "English", minLevel: "B2" }],
    requirements: ["CV", "High-school transcripts", "Motivation letter"],
  },
  {
    slug: "foundation-business-belgium",
    name: "Foundation in Business",
    school: "International College",
    location: "Antwerp, Belgium",
    country: "Malta",
    level: "Foundation",
    languages: [{ lang: "English", minLevel: "B1" }],
    requirements: ["CV", "Transcripts", "Statement of purpose"],
  },
  {
    slug: "masters-data-germany",
    name: "MSc Data Engineering",
    school: "Technical University",
    location: "Berlin, Germany",
    country: "Malta",
    level: "Master",
    languages: [{ lang: "English", minLevel: "B2" }],
    requirements: ["CV", "Bachelor degree", "Portfolio/Projects (plus)"],
  },
  {
    slug: "vocational-hospitality-nl",
    name: "Vocational Hospitality Management",
    school: "College Noord",
    location: "Rotterdam, Netherlands",
    country: "Malta",
    level: "Vocational",
    languages: [], // no strict language requirement
    requirements: ["CV", "Basic math/logic test"],
  },
];
