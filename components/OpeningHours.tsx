"use client";

import { useEffect, useState } from "react";
import { openingHours, dayNames } from "@/lib/shop";

// Volgorde maandag → zondag.
const order = [1, 2, 3, 4, 5, 6, 0];

export default function OpeningHours() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <ul className="divide-y divide-white/10">
      {order.map((d) => {
        const h = openingHours[d];
        const isToday = today === d;
        return (
          <li
            key={d}
            className={`flex items-center justify-between px-4 py-3 text-sm sm:text-base ${
              isToday ? "rounded-xl bg-neon-cyan/10" : ""
            }`}
          >
            <span className={`flex items-center gap-2 ${isToday ? "text-neon-cyan" : "text-white/80"}`}>
              {dayNames[d]}
              {isToday && (
                <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
                  Vandaag
                </span>
              )}
            </span>
            <span className={`font-semibold tabular-nums ${isToday ? "text-white" : "text-white/60"}`}>
              {h ? `${h.open} – ${h.close}` : "Gesloten"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
