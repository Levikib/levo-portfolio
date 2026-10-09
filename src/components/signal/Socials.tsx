import { SITE, waLink } from "@/data/facts";
import "./socials.css";

const ICONS: Record<string, JSX.Element> = {
  GitHub: <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.2c-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />,
  LinkedIn: <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5Z" />,
  WhatsApp: <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8ZM12 0a12 12 0 0 0-10.3 18L0 24l6.2-1.6A12 12 0 1 0 12 0Z" />,
  Email: <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 6 7.8-6H4.2ZM20 7.7l-7.4 5.7a1 1 0 0 1-1.2 0L4 7.7V18h16V7.7Z" />,
};

/** Every public profile in one row. Add more profiles to SITE and to LINKS. */
export default function Socials({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const LINKS = [
    { label: "GitHub", href: SITE.github, handle: "Levikib" },
    { label: "LinkedIn", href: SITE.linkedin, handle: "Levis Kibirie" },
    { label: "WhatsApp", href: waLink("Hi Levo, I found you through your site."), handle: "Chat" },
    { label: "Email", href: `mailto:${SITE.email}`, handle: "Email" },
  ];
  return (
    <ul className={`soc soc--${size} ${className}`.trim()} aria-label="Find me online">
      {LINKS.map((l) => (
        <li key={l.label}>
          <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer me" aria-label={`${l.label}: ${l.handle}`} className="soc__a">
            <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" fill="currentColor">{ICONS[l.label]}</svg>
            <span className="soc__label">{l.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
