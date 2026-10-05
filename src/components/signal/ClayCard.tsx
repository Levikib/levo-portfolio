import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "article" | "section" | "li" | "figure" | "aside" | "header";

export type ClayCardProps = {
  /** Element to render when there is no href. Default "div". */
  as?: Tag;
  /** Makes the whole card one link. Internal paths use next/link. */
  href?: string;
  /** Opens in a new tab with rel="noreferrer" (only with href). */
  external?: boolean;
  /** Any CSS colour. Tints the rim light, the hover hologram and .clay-accent text. */
  accent?: string;
  /** Clay depth. Default "rest". Links lift to "raised" on hover and sink to "pressed" on :active. */
  elevation?: "rest" | "raised" | "pressed";
  /** Inner padding step. Default "md". */
  pad?: "none" | "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  children: ReactNode;
};

/**
 * The one card on the site. Graphite clay with a top highlight, an inner
 * bottom shade, a soft drop, grain and a holographic rim on hover.
 */
export default function ClayCard({
  as = "div",
  href,
  external,
  accent,
  elevation = "rest",
  pad = "md",
  className = "",
  style,
  children,
  ...aria
}: ClayCardProps) {
  const cls = `clay clay--${elevation} clay--pad-${pad}${href ? " clay--link" : ""} ${className}`.trim();
  const st = accent ? ({ ...style, ["--accent" as string]: accent } as CSSProperties) : style;

  if (href) {
    if (external || /^https?:|^mailto:|^tel:/.test(href)) {
      return (
        <a href={href} className={cls} style={st} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} {...aria}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} style={st} {...aria}>
        {children}
      </Link>
    );
  }
  const El = as;
  return (
    <El className={cls} style={st} {...aria}>
      {children}
    </El>
  );
}
