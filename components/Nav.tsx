"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#guide", label: "The Guide" },
  { href: "/#tracker", label: "Tracker" },
  { href: "/references", label: "References" },
  { href: "/#waitlist", label: "Waitlist" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(to bottom, rgba(20,23,28,0.95) 0%, rgba(20,23,28,0) 100%)",
        backdropFilter: "blur(4px)",
      }}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-lg font-medium text-paper hover:text-ember transition-colors duration-200"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          ManyRituals
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-paper/60 hover:text-paper transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-paper transition-all duration-200 ${open ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-paper transition-all duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-paper transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-ink-soft border-t border-paper/10">
          <ul className="flex flex-col list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block px-5 py-3 text-paper/80 hover:text-paper border-b border-paper/5 transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
