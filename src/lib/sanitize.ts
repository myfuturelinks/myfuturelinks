export const stripCRLF = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
export const clamp = (s: string, n: number) =>
  s.length > n ? s.slice(0, n) : s;
