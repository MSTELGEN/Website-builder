"use client";

import { shop } from "@/lib/shop";
import OpenStatus from "./OpenStatus";

export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-night/95 px-3 py-2.5 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-none tracking-wide text-white">
            {shop.name}
          </p>
          <div className="mt-1 text-[11px]">
            <OpenStatus variant="line" />
          </div>
        </div>
        <a
          href={shop.phoneHref}
          className="inline-flex items-center gap-2 rounded-full bg-neon-pink px-5 py-2.5 text-sm font-bold text-white shadow-neon-pink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 011.5-3z" />
          </svg>
          Bel & bestel
        </a>
      </div>
    </div>
  );
}
