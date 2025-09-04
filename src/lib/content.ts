export const sectors = [
  { title: "Healthcare", text: "Care assistants, nurses" },
  { title: "Tech & IT", text: "Developers, support" },
  { title: "Hospitality", text: "Chefs, waitstaff" },
  { title: "Logistics", text: "Warehouse, drivers" },
] as const;

// We’ll use these on dedicated pages later.
export const workFaq = [
  {
    q: "Who sponsors the work permit?",
    a: "Usually the employer, depending on country and role.",
  },
  {
    q: "Do applicants pay before visa?",
    a: "No. Fees are staged, transparent, and ethical.",
  },
  {
    q: "Which sectors are available?",
    a: "Healthcare, hospitality, logistics, tech/IT.",
  },
] as const;

export const studyFaq = [
  {
    q: "Do you guarantee admission or visa?",
    a: "No, decisions are made by institutions and embassies.",
  },
  {
    q: "Proof of funds requirements?",
    a: "Varies by country. We guide your legal documentation.",
  },
  {
    q: "English-taught programs?",
    a: "Yes. Many Bachelor/Master options in BE/NL/DE.",
  },
] as const;
