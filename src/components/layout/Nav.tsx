"use client";
import {useState, useEffect} from "react";
import Link from "next/link";

const links = [
  { href:"/work", label:"Work" },
  { href:"/store", label:"Store" },
  { href:"/blog", label:"Thoughts" },
  { href:"/about", label:"About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[500] flex justify-between items-center px-8 md:px-12 py-5 transition-all duration-500 ${
      scrolled
        ? "bg-[rgba(250,247,240,0.92)] backdrop-blur-md border-b border-[var(--border)] shadow-sm"
        : "bg-transparent"
    }`}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily:"var(--font-display)", fontWeight:800, fontSize:"20px",
        letterSpacing:"0.05em", color:"var(--text)", textDecoration:"none",
      }}>
        LK<span style={{color:"var(--purple)"}}>.</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="nav-link">{l.label}</Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-4">
        <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
        <a href="mailto:leviskibirie2110@gmail.com" className="btn-primary py-2.5 px-5 text-xs">
          Hire Me
        </a>
      </div>

      {/* Mobile toggle */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)] p-8 flex flex-col gap-6 md:hidden shadow-lg">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link text-base" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href="mailto:leviskibirie2110@gmail.com" className="btn-primary text-center">Hire Me</a>
        </div>
      )}
    </nav>
  );
}
