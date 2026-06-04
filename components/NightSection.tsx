"use client";
import { useCallback } from "react";
import type { Night } from "@/lib/nights";

interface Props {
  night: Night;
  trackerState?: boolean[];
  onToggleRitual?: (nightNum: number) => void;
}

export default function NightSection({ night, trackerState, onToggleRitual }: Props) {
  const nightIndex = night.num - 1;
  const done = trackerState?.[nightIndex] ?? false;

  const handleTrack = useCallback(() => {
    onToggleRitual?.(nightIndex);
  }, [onToggleRitual, nightIndex]);

  return (
    <article
      id={`night-${night.num}`}
      className="relative py-16 md:py-20 border-t border-paper/8 scroll-mt-20"
      aria-label={`Night ${night.num}: ${night.ritual}`}
    >
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-6 items-start">
          {/* Night number (decorative) */}
          <div
            className="night-num select-none pointer-events-none md:pt-2"
            aria-hidden="true"
          >
            {String(night.num).padStart(2, "0")}
          </div>

          <div>
            {/* Ritual heading */}
            <p className="text-ember text-sm tracking-widest uppercase font-medium mb-2">
              Night {night.num}
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-paper mb-6 leading-tight"
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
            >
              {night.ritual}
            </h2>

            {/* Why this works */}
            <section aria-label="Why this works" className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-sage mb-3 font-medium">
                Why this works
              </h3>
              <p className="text-paper/75 leading-relaxed max-w-2xl">{night.why}</p>
            </section>

            {/* Protocol */}
            <section aria-label="The protocol" className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-sage mb-3 font-medium">
                The protocol
              </h3>
              <ul className="space-y-2 list-none m-0 p-0">
                {night.protocol.map((step, i) => (
                  <li key={i} className="flex gap-3 text-paper/75">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-ember/15 text-ember flex items-center justify-center text-xs font-medium mt-0.5"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Two-column: Mistakes + What to expect */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <section
                aria-label="Common mistakes"
                className="rounded-xl border border-paper/8 bg-paper/[0.03] p-5"
              >
                <h3 className="text-xs uppercase tracking-widest text-paper/40 mb-3 font-medium">
                  Common mistakes
                </h3>
                <ul className="space-y-2 list-none m-0 p-0">
                  {night.mistakes.map((m, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-paper/55">
                      <span className="text-paper/25 flex-shrink-0 mt-1 leading-none">—</span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                aria-label="What to expect"
                className="rounded-xl border border-sage/15 bg-sage/[0.06] p-5"
              >
                <h3 className="text-xs uppercase tracking-widest text-sage mb-3 font-medium">
                  What to expect
                </h3>
                <p className="text-sm text-paper/65 leading-relaxed">{night.expect}</p>
              </section>
            </div>

            {/* Track it */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleTrack}
                className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium cursor-pointer transition-all duration-200 ${
                  done
                    ? "border-ember/50 bg-ember/10 text-ember"
                    : "border-paper/20 bg-transparent text-paper/60 hover:border-ember/40 hover:text-paper/80"
                }`}
                aria-pressed={done}
                aria-label={`Mark Night ${night.num} as ${done ? "not done" : "done"} in tracker`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                    done ? "bg-ember" : "border border-paper/30"
                  }`}
                  aria-hidden="true"
                >
                  {done && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke="#14171c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {done ? "Logged in tracker" : "Track it tonight"}
              </button>

              <a
                href="#tracker"
                className="text-xs text-paper/35 hover:text-paper/60 transition-colors duration-200"
              >
                View full tracker →
              </a>
            </div>

            {/* Citations */}
            {night.citations.length > 0 && (
              <div className="mt-8 pt-6 border-t border-paper/8">
                <h3 className="text-[10px] uppercase tracking-widest text-paper/30 mb-2">Sources</h3>
                <ul className="space-y-1 list-none m-0 p-0">
                  {night.citations.map((c) => (
                    <li key={c.key} className="text-[11px] text-paper/30 leading-relaxed">
                      {c.authors} ({c.year}). {c.title}.{" "}
                      <em>{c.journal}</em>.
                      {c.note && (
                        <span className="ml-1 text-paper/20">[{c.note}]</span>
                      )}
                      {c.url && (
                        <>
                          {" "}
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ember/50 hover:text-ember/80 transition-colors duration-200"
                          >
                            ↗
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
