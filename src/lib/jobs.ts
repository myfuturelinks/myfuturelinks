export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type LanguageReq = {
  lang: string; // e.g., "English", "Dutch", "German"
  minLevel?: CEFR; // optional. If omitted => basic ability / not strict
};

export type Job = {
  slug: string;
  title: string;
  location: string; // "City, Country"
  country: string; // "Belgium"
  sector: "Healthcare" | "Hospitality" | "Logistics" | "Tech & IT";
  languages?: LanguageReq[]; // optional. If missing or [], no language needed
  skills: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "care-assistant-brussels",
    title: "Care Assistant",
    location: "Brussels, Belgium",
    country: "Belgium",
    sector: "Healthcare",
    languages: [{ lang: "English", minLevel: "B1" }],
    skills: ["Patient care", "Nursing", "Elderly support"],
    requirements: ["CV/Resume", "Experience preferred"],
  },
  {
    slug: "junior-warehouse-netherlands",
    title: "Warehouse Associate (Junior)",
    location: "Eindhoven, Netherlands",
    country: "Netherlands",
    sector: "Logistics",
    languages: [{ lang: "English", minLevel: "A2" }],
    skills: ["Picking", "Packing", "Forklift (plus)"],
    requirements: ["CV/Resume", "Shift-ready"],
  },
  {
    slug: "chef-de-partie-germany",
    title: "Chef de Partie",
    location: "Hamburg, Germany",
    country: "Germany",
    sector: "Hospitality",
    languages: [{ lang: "English", minLevel: "B1" }],
    skills: ["Line cook", "Food safety"],
    requirements: ["CV/Resume", "2+ years kitchen exp."],
  },
  {
    slug: "it-support-amsterdam",
    title: "IT Support Specialist",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    sector: "Tech & IT",
    languages: [
      { lang: "English", minLevel: "B2" },
      { lang: "Dutch", minLevel: "A2" },
    ],
    skills: ["Helpdesk", "Windows", "Networking"],
    requirements: ["CV/Resume", "CompTIA+ (nice to have)"],
  },
  {
    slug: "warehouse-no-language",
    title: "Warehouse Loader (No language required)",
    location: "Antwerp, Belgium",
    country: "Belgium",
    sector: "Logistics",
    languages: [], // none required
    skills: ["Heavy lifting", "Team player"],
    requirements: ["CV/Resume", "Physically fit"],
  },
];
