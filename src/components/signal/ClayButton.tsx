import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export type ClayButtonProps = {
  /** primary = lime clay, signal = amber clay, violet = violet clay, dark = ink clay, ghost = outlined glass. Default "primary". */
  variant?: "primary" | "signal" | "violet" | "dark" | "ghost";
  /** Renders a link. Without href it renders a <button type="button">. */
  href?: string;
  /** New tab with rel="noreferrer". */
  external?: boolean;
  /** Trailing glyph. Default "→" for internal, "↗" for external. Pass "" for none. */
  icon?: string;
  size?: "md" | "lg";
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  children: ReactNode;
};

/** The one button on the site. Always at least 48px tall, clay pressed on :active. */
export default function ClayButton({
  variant = "primary",
  href,
  external,
  icon,
  size = "md",
  className = "",
  style,
  children,
  ...aria
}: ClayButtonProps) {
  const ext = external || (href ? /^https?:/.test(href) : false);
  const glyph = icon ?? (ext ? "↗" : "→");
  const cls = `cbtn cbtn--${variant} cbtn--${size} ${className}`.trim();
  const inner = (
    <>
      <span className="cbtn__label">{children}</span>
      {glyph && <span className="cbtn__icon" aria-hidden>{glyph}</span>}
    </>
  );
  if (!href) return <button type="button" className={cls} style={style} {...aria}>{inner}</button>;
  if (ext || /^mailto:|^tel:/.test(href)) {
    return (
      <a href={href} className={cls} style={style} target={ext ? "_blank" : undefined} rel={ext ? "noreferrer" : undefined} {...aria}>
        {inner}
      </a>
    );
  }
  return <Link href={href} className={cls} style={style} {...aria}>{inner}</Link>;
}
