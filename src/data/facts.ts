/**
 * The ONE source of truth for every number and contact detail on the site.
 * Each value carries where it came from. Change a number here and it changes
 * everywhere: hero, stations, case studies, terminal, metadata.
 */

export const SITE = {
  name: "Levis Kibirie",
  short: "Levo",
  url: "https://levis.makejahomes.co.ke",
  role: "Product engineer and designer",
  city: "Nairobi, Kenya",
  timezone: "EAT (UTC+3)",
  email: "leviskibirie2110@gmail.com",
  whatsapp: "254723819934",
  github: "https://github.com/Levikib",
  linkedin: "https://linkedin.com/in/levis-kibirie-6bba13344",
} as const;

type Fact = { value: number; suffix?: string; label: string; source: string };

export const MAKEJA: Record<"tenants" | "units" | "leases" | "clients", Fact> = {
  tenants: { value: 4500, suffix: "+", label: "tenants", source: "Levo, 2026-10-05" },
  units: { value: 5000, suffix: "+", label: "units managed", source: "Levo, 2026-10-05" },
  leases: { value: 3000, suffix: "+", label: "digital leases", source: "Levo, 2026-10-05" },
  clients: { value: 80, suffix: "+", label: "client companies", source: "Levo, 2026-10-05" },
};

export const CAREER: Record<"years" | "banking", Fact> = {
  years: { value: 8, suffix: "+", label: "years shipping", source: "profile" },
  banking: { value: 4, label: "years in core banking", source: "Sensys contract" },
};

/** Formats a fact for server-rendered output, e.g. 4500 -> "4,500+". */
export function fmt(f: Fact): string {
  return `${f.value.toLocaleString("en-US")}${f.suffix ?? ""}`;
}

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
