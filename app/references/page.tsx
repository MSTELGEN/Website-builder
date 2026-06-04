import type { Metadata } from "next";
import { nights } from "@/lib/nights";

export const metadata: Metadata = {
  title: "References — ManyRituals 7-Night Sleep Reset",
  description:
    "Full citation list for the research behind the 7-Night Sleep Reset. Every claim traceable to its source.",
};

// Deduplicate citations by key across all nights
function allCitations() {
  const seen = new Set<string>();
  const out: { citation: (typeof nights)[0]["citations"][0]; night: number }[] = [];
  for (const night of nights) {
    for (const c of night.citations) {
      if (!seen.has(c.key)) {
        seen.add(c.key);
        out.push({ citation: c, night: night.num });
      }
    }
  }
  return out;
}

export default function ReferencesPage() {
  const items = allCitations();

  return (
    <div className="pt-28 pb-20 px-5">
      <div className="mx-auto max-w-3xl">
        <p className="text-ember text-sm tracking-widest uppercase font-medium mb-4">
          Research foundation
        </p>
        <h1
          className="text-4xl md:text-5xl font-light text-paper mb-6 leading-tight"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          References
        </h1>
        <p className="text-paper/55 text-lg mb-4 max-w-2xl leading-relaxed">
          Every scientific claim in the 7-Night Sleep Reset is listed here with its source.
          We link directly to PubMed or the publisher DOI wherever possible.
        </p>
        <p className="text-paper/35 text-sm mb-12">
          Items marked <span className="text-amber-400/70">VERIFY</span> are likely correct but
          have not yet been confirmed against the primary source. Claims from these sources are
          softened in the guide text until verification is complete. Items marked{" "}
          <span className="text-sage">VERIFIED</span> have been checked against the primary
          publication.
        </p>

        {/* Legend */}
        <div className="rounded-xl border border-paper/10 bg-paper/[0.03] p-5 mb-12">
          <h2 className="text-xs uppercase tracking-widest text-paper/40 font-medium mb-4">
            Status legend
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-sage font-medium w-20 flex-shrink-0">VERIFIED</dt>
              <dd className="text-paper/55">Primary source confirmed against PubMed/DOI.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-amber-400/70 font-medium w-20 flex-shrink-0">VERIFY</dt>
              <dd className="text-paper/55">
                Publication is likely real; exact title/journal/year to be confirmed before
                publication. Claims in the guide are hedged accordingly.
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-paper/40 font-medium w-20 flex-shrink-0">ANIMAL</dt>
              <dd className="text-paper/55">
                Rodent or other non-human study. Described as emerging research in the guide.
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-paper/40 font-medium w-20 flex-shrink-0">THEORY</dt>
              <dd className="text-paper/55">
                Hypothesis or theoretical paper. Described as &quot;proposes&quot; rather than
                &quot;shows&quot; in the guide.
              </dd>
            </div>
          </dl>
        </div>

        {/* Citation list */}
        <ol className="space-y-8 list-none p-0 m-0" aria-label="Reference list">
          {items.map(({ citation: c, night }) => {
            const isVerified =
              c.note?.toUpperCase().startsWith("VERIFIED") ?? false;
            const isVerify = c.note?.toUpperCase().startsWith("VERIFY") ?? false;
            const isAnimal =
              c.note?.toLowerCase().includes("rodent") ||
              c.note?.toLowerCase().includes("animal") ||
              false;
            const isTheory =
              c.note?.toLowerCase().includes("theoretical") ||
              c.note?.toLowerCase().includes("hypothesis") ||
              false;

            return (
              <li
                key={c.key}
                id={`ref-${c.key}`}
                className="border-t border-paper/8 pt-6 grid gap-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border ${
                      isVerified
                        ? "text-sage border-sage/30 bg-sage/10"
                        : isVerify
                        ? "text-amber-400/70 border-amber-400/20 bg-amber-400/5"
                        : "text-paper/30 border-paper/10"
                    }`}
                  >
                    {isVerified ? "Verified" : isVerify ? "Verify" : "Cited"}
                  </span>
                  {isAnimal && (
                    <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border text-paper/30 border-paper/10">
                      Animal study
                    </span>
                  )}
                  {isTheory && (
                    <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border text-paper/30 border-paper/10">
                      Theoretical
                    </span>
                  )}
                  <span className="text-paper/25 text-xs">→ Night {night}</span>
                </div>

                <p className="text-paper/80 text-sm leading-relaxed">
                  <span className="text-paper/55">{c.authors}</span>{" "}
                  <span className="text-paper/35">({c.year}).</span>{" "}
                  <strong className="font-medium text-paper/90">{c.title}.</strong>{" "}
                  <em className="text-paper/55">{c.journal}</em>.
                </p>

                {c.note && (
                  <p className="text-xs text-paper/30 italic">{c.note}</p>
                )}

                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-ember/60 hover:text-ember transition-colors duration-200 w-fit"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View on PubMed / publisher
                  </a>
                )}
              </li>
            );
          })}
        </ol>

        {/* Audit note */}
        <div className="mt-16 rounded-xl border border-paper/10 bg-paper/[0.03] p-6">
          <h2 className="text-xs uppercase tracking-widest text-paper/40 font-medium mb-3">
            Editorial policy
          </h2>
          <p className="text-paper/45 text-sm leading-relaxed">
            ManyRituals follows a strict evidence-only policy. Every factual or scientific claim
            on this site is traceable to a listed source. Citations marked VERIFY will be
            confirmed against PubMed before this guide moves to final publication. No citations,
            authors, journals, or statistics are invented. If a claim cannot be supported by a
            primary source, it is either cut or clearly hedged as emerging or theoretical research.
          </p>
        </div>
      </div>
    </div>
  );
}
