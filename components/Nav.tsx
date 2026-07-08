"use client";

import { useState } from "react";
import { shop } from "@/lib/shop";
import OpenStatus from "./OpenStatus";

const links = [
  { href: "#assortiment", label: "Assortiment" },
  { href: "#openingstijden", label: "Openingstijden" },
  { href: "#bezorgen", label: "Bezorgen" },
  { href: "#locatie", label: "Locatie" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={shop.name}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon-pink/50 bg-neon-pink/10 font-display text-xl leading-none text-neon-pink shadow-neon-pink">
            D
          </span>
          <span className="hidden font-display text-2xl leading-none tracking-wide text-white sm:block">
            Avond<span className="text-neon-pink">winkel</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <OpenStatus />
          </div>
          <a
            href={shop.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-neon-pink px-4 py-2 text-sm font-bold text-white shadow-neon-pink transition-transform hover:scale-105"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">Bel ons</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-night px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 px-3">
            <OpenStatus />
          </div>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 011.5-3z"
        fill="currentColor"
      />
    </svg>
  );
}
