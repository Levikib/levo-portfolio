/**
 * Signal Path design system primitives. Import from "@/components/signal".
 * Styles live in src/app/signal.css (already loaded globally by layout.tsx).
 * Wrap pages in <main className="sp"> to get the dark ground and type.
 *
 * <ClayCard as? href? external? accent? elevation? pad? className? style? id?>
 *   as:        "div" | "article" | "section" | "li" | "figure" | "aside" | "header" (default "div", ignored with href)
 *   href:      whole card becomes one link (next/link for internal paths). Do not nest links inside.
 *   accent:    any CSS colour; tints rim light + hover hologram. Use className "clay-accent" on text to pick it up.
 *   elevation: "rest" | "raised" | "pressed" (links lift on hover, press on :active)
 *   pad:       "none" | "sm" | "md" | "lg" (default "md")
 *   Helpers inside a card: .clay-kicker (mono label), .clay-title, .clay-body, .clay-foot (pushed to bottom),
 *   .clay-fake-btn (button look for links that are the whole card).
 *
 * <ClayButton variant? href? external? icon? size?>children</ClayButton>
 *   variant: "primary" (lime) | "signal" (amber) | "violet" | "dark" | "ghost". Default "primary".
 *   No href renders <button type="button">. Icon defaults to → (internal) or ↗ (external); pass "" for none.
 *
 * <SectionHeader eyebrow title kicker? id? as? align? note? />
 *   eyebrow: mono command label, e.g. "$ ls ./thoughts". as: "h1" | "h2" (default h2). note: marker-font aside.
 *
 * <CtaBand title eyebrow? body? tone? id? as?>{optional ClayButtons}</CtaBand>
 *   tone: "lime" | "signal" | "violet". Default children: WhatsApp, Email, Case studies.
 *   On coloured slabs use ClayButton variant="dark" for the main action and "ghost" for the rest.
 *
 * Layout helpers (CSS): .sp-wrap (max width + gutters), .sp-section (vertical rhythm),
 * .clay-grid (auto card grid, add --2 / --3 / --4 for fixed columns), .sp-chips/.sp-chip.
 */
export { default as ClayCard } from "./ClayCard";
export type { ClayCardProps } from "./ClayCard";
export { default as ClayButton } from "./ClayButton";
export type { ClayButtonProps } from "./ClayButton";
export { default as SectionHeader } from "./SectionHeader";
export type { SectionHeaderProps } from "./SectionHeader";
export { default as CtaBand } from "./CtaBand";
export type { CtaBandProps } from "./CtaBand";
export { default as Marquee } from "./Marquee";
export * as Doodles from "./Doodles";
