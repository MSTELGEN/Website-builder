"use client";

import { useEffect, useState } from "react";
import { getOpenState } from "@/lib/shop";

type State = ReturnType<typeof getOpenState> | null;

export default function OpenStatus({ variant = "pill" }: { variant?: "pill" | "line" }) {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    const update = () => setState(getOpenState(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Server + first paint: neutral placeholder to avoid hydration mismatch.
  if (!state) {
    return (
      <span className={variant === "pill" ? pillBase + " border-white/15 text-white/60" : "text-white/60"}>
        <span className="h-2 w-2 rounded-full bg-white/40" />
        Openingstijden laden…
      </span>
    );
  }

  if (state.open) {
    const label = `Nu open · tot ${state.closesAt}`;
    if (variant === "line") {
      return (
        <span className="inline-flex items-center gap-2 text-neon-lime">
          <Dot className="bg-neon-lime shadow-neon-lime" /> {label}
        </span>
      );
    }
    return (
      <span className={pillBase + " border-neon-lime/50 bg-neon-lime/10 text-neon-lime"}>
        <Dot className="bg-neon-lime shadow-neon-lime" /> {label}
      </span>
    );
  }

  const label = `Gesloten · open ${state.opensDay ?? ""} ${state.opensAt ?? ""}`.trim();
  if (variant === "line") {
    return (
      <span className="inline-flex items-center gap-2 text-neon-pink">
        <Dot className="bg-neon-pink shadow-neon-pink" /> {label}
      </span>
    );
  }
  return (
    <span className={pillBase + " border-neon-pink/40 bg-neon-pink/10 text-neon-pink"}>
      <Dot className="bg-neon-pink shadow-neon-pink" /> {label}
    </span>
  );
}

const pillBase =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider";

function Dot({ className }: { className: string }) {
  return <span className={`h-2 w-2 rounded-full animate-pulse-dot ${className}`} aria-hidden="true" />;
}
