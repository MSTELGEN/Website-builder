import type { Metadata } from "next";
import { nights } from "@/lib/nights";
import PrintGate from "@/components/PrintGate";

export const metadata: Metadata = {
  title: "The 7-Night Sleep Reset — Printable Guide",
  description: "Printable PDF version of the ManyRituals 7-Night Sleep Reset guide.",
  robots: "noindex",
};

export default function PrintPage() {
  return (
    <div className="print-root">
      <PrintGate>
      <div className="print-doc">
        {/* Cover */}
        <div className="print-cover print-page">
          <div className="print-cover-inner">
            <p className="print-kicker">ManyRituals · Free Guide</p>
            <h1 className="print-h1">
              The 7-Night<br />
              <em>Sleep Reset</em>
            </h1>
            <p className="print-subtitle">
              Seven evidence-based rituals for better sleep.<br />
              No supplements. No gadgets. No pseudoscience.
            </p>
            <p className="print-tagline">Sleep research, decoded.</p>

            <div className="print-disclaimer-box">
              <p className="print-disclaimer-label">A note before you start</p>
              <p className="print-disclaimer-text">
                This guide is for healthy adults with ordinary sleep difficulties. If you have
                symptoms of <strong>sleep apnoea</strong>, <strong>perimenopause-related sleep
                disruption</strong>, <strong>clinical insomnia</strong> (six or more weeks), or
                <strong> anxiety or mood disorders</strong> affecting sleep — please see a clinician
                first. Nothing in this guide is medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="print-section print-page">
          <p className="print-kicker">Before you start</p>
          <h2 className="print-h2">This is an experiment, not a cure.</h2>
          <p className="print-body">
            Each night introduces one change to your environment or behaviour. That's deliberate —
            isolating one variable at a time lets you feel what actually moves the needle for{" "}
            <em>you</em>. Your sleep is not a generic problem with a generic fix.
          </p>
          <p className="print-body">
            The science behind each ritual is well-grounded, but the effects vary by person. Some
            will feel transformative immediately. Some won't. That's useful data.
          </p>
          <p className="print-body">
            The framing throughout is environment → physiology → nervous system. Better sleep is
            mostly about removing obstacles: too much heat, too much light, an always-on brain.
            Once the obstacles are out of the way, your body usually knows what to do.
          </p>

          <div className="print-expect-grid">
            {[
              {
                night: "By Night 3",
                text: "Sleep onset may already be faster — temperature and phone cues compound quickly.",
              },
              {
                night: "By Night 5",
                text: "Fewer mid-night wakes for most people. Alcohol and meal timing changes start showing in the second half.",
              },
              {
                night: "By Night 7",
                text: "A clearer picture of which rituals actually matter for you. That's the real output of this week.",
              },
            ].map(({ night, text }) => (
              <div key={night} className="print-expect-card">
                <p className="print-expect-label">{night}</p>
                <p className="print-expect-text">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 nights */}
        {nights.map((night) => (
          <div key={night.num} className="print-section print-page">
            <div className="print-night-header">
              <span className="print-night-num">{String(night.num).padStart(2, "0")}</span>
              <div>
                <p className="print-kicker">Night {night.num}</p>
                <h2 className="print-h2">{night.ritual}</h2>
              </div>
            </div>

            <div className="print-why">
              <p className="print-why-label">Why this works</p>
              <p className="print-body">{night.why}</p>
            </div>

            <div className="print-two-col">
              <div>
                <p className="print-section-label">The protocol</p>
                <ol className="print-ol">
                  {night.protocol.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="print-section-label">Common mistakes</p>
                <ul className="print-ul">
                  {night.mistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
                <p className="print-section-label" style={{ marginTop: "1rem" }}>What to expect</p>
                <p className="print-small">{night.expect}</p>
              </div>
            </div>

            {/* Tracker row */}
            <div className="print-tracker-row">
              <p className="print-tracker-label">Track it</p>
              <div className="print-tracker-boxes">
                {["N1","N2","N3","N4","N5","N6","N7"].map((n) => (
                  <div key={n} className="print-tracker-cell">
                    <span className="print-tracker-n">{n}</span>
                    <div className="print-tracker-box" />
                  </div>
                ))}
              </div>
            </div>

            {/* Citations */}
            {night.citations.length > 0 && (
              <div className="print-citations">
                {night.citations.map((c) => (
                  <p key={c.key} className="print-citation">
                    {c.authors} ({c.year}). {c.title}. <em>{c.journal}</em>.
                    {c.note && <span className="print-citation-note"> [{c.note}]</span>}
                    {c.url && <span> {c.url}</span>}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Back page */}
        <div className="print-back-page print-page">
          <p className="print-back-brand">ManyRituals</p>
          <p className="print-back-tagline">Sleep research, decoded.</p>
          <p className="print-back-url">manyrituals.com</p>
          <p className="print-back-legal">
            Your email is never sold. Every email has a one-click unsubscribe.<br />
            This guide is not medical advice. © {new Date().getFullYear()} ManyRituals.
          </p>
        </div>
      </div>
      </PrintGate>

      <style>{`
        /* ── Screen styles ── */
        .print-root {
          background: #14171c;
          min-height: 100vh;
          font-family: 'Hanken Grotesk', system-ui, sans-serif;
          color: #14171c;
        }

        /* Toolbar */
        .print-toolbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #14171c;
          border-bottom: 1px solid rgba(243,236,224,0.12);
        }
        .print-toolbar-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .print-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          color: #d98a4e;
          font-size: 1rem;
        }
        .print-toolbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .print-back {
          color: rgba(243,236,224,0.5);
          text-decoration: none;
          font-size: 0.8rem;
        }
        .print-back:hover { color: rgba(243,236,224,0.85); }

        /* Document */
        .print-doc {
          max-width: 860px;
          margin: 0 auto;
          padding: 16px;
        }
        @media (min-width: 640px) {
          .print-doc { padding: 24px 20px; }
        }
        .print-page {
          background: #fff;
          border-radius: 8px;
          margin-bottom: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }

        /* Cover */
        .print-cover {
          min-height: 60vh;
          display: flex;
          align-items: center;
        }
        .print-cover-inner {
          padding: 36px 24px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .print-cover-inner { padding: 56px 60px; }
        }
        .print-kicker {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #d98a4e;
          font-weight: 500;
          margin: 0 0 16px;
        }
        .print-h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 300;
          line-height: 1.0;
          color: #14171c;
          margin: 0 0 20px;
        }
        .print-h1 em {
          color: #d98a4e;
          font-style: italic;
        }
        .print-subtitle {
          font-size: 1.1rem;
          color: #4a4a4a;
          line-height: 1.55;
          margin: 0 0 8px;
          max-width: 520px;
        }
        .print-tagline {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 0.95rem;
          color: #d98a4e;
          margin: 0 0 36px;
        }
        .print-disclaimer-box {
          border: 1px solid rgba(20,23,28,0.12);
          border-left: 3px solid #8fa68c;
          border-radius: 6px;
          padding: 16px 20px;
          max-width: 560px;
        }
        .print-disclaimer-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8fa68c;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .print-disclaimer-text {
          font-size: 0.82rem;
          color: #555;
          line-height: 1.55;
          margin: 0;
        }

        /* Sections */
        .print-section { padding: 28px 24px; }
        @media (min-width: 640px) {
          .print-section { padding: 48px 60px; }
        }
        .print-h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 300;
          line-height: 1.15;
          color: #14171c;
          margin: 0 0 20px;
        }
        .print-body {
          font-size: 0.95rem;
          color: #333;
          line-height: 1.7;
          margin: 0 0 14px;
          max-width: 640px;
        }

        /* Expect grid */
        .print-expect-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 20px;
        }
        @media (min-width: 560px) {
          .print-expect-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
        }
        .print-expect-card {
          border: 1px solid rgba(143,166,140,0.3);
          background: rgba(143,166,140,0.06);
          border-radius: 8px;
          padding: 14px 16px;
        }
        .print-expect-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #8fa68c;
          margin: 0 0 6px;
        }
        .print-expect-text {
          font-size: 0.8rem;
          color: #555;
          line-height: 1.5;
          margin: 0;
        }

        /* Night header */
        .print-night-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }
        .print-night-num {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(3.5rem, 9vw, 6rem);
          font-weight: 300;
          font-style: italic;
          line-height: 0.9;
          color: #d98a4e;
          opacity: 0.22;
          flex-shrink: 0;
          margin-top: 4px;
          user-select: none;
        }

        /* Why box */
        .print-why {
          background: rgba(217,138,78,0.05);
          border-left: 2px solid rgba(217,138,78,0.4);
          border-radius: 0 6px 6px 0;
          padding: 14px 18px;
          margin-bottom: 24px;
          max-width: 640px;
        }
        .print-why-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d98a4e;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .print-why .print-body { margin: 0; }

        /* Two col */
        .print-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (min-width: 560px) {
          .print-two-col { grid-template-columns: 1fr 1fr; }
        }
        .print-section-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #999;
          font-weight: 600;
          margin: 0 0 10px;
        }
        .print-ol, .print-ul {
          margin: 0;
          padding-left: 1.2rem;
        }
        .print-ol li, .print-ul li {
          font-size: 0.83rem;
          color: #444;
          line-height: 1.6;
          margin-bottom: 6px;
        }
        .print-small {
          font-size: 0.82rem;
          color: #555;
          line-height: 1.55;
          margin: 0;
        }

        /* Tracker row */
        .print-tracker-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid rgba(20,23,28,0.08);
          border-bottom: 1px solid rgba(20,23,28,0.08);
          margin-bottom: 20px;
        }
        .print-tracker-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d98a4e;
          font-weight: 600;
          white-space: nowrap;
          margin: 0;
          width: 56px;
        }
        .print-tracker-boxes {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .print-tracker-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .print-tracker-n {
          font-size: 0.6rem;
          color: #aaa;
          letter-spacing: 0.05em;
        }
        .print-tracker-box {
          width: 28px;
          height: 28px;
          border: 1.5px solid rgba(20,23,28,0.18);
          border-radius: 5px;
        }

        /* Citations */
        .print-citations {
          border-top: 1px solid rgba(20,23,28,0.08);
          padding-top: 14px;
        }
        .print-citation {
          font-size: 0.72rem;
          color: #888;
          line-height: 1.5;
          margin: 0 0 4px;
        }
        .print-citation-note {
          color: #aaa;
          font-style: italic;
        }

        /* Back page */
        .print-back-page {
          text-align: center;
          padding: 60px 40px;
          background: #14171c;
          border-radius: 8px;
          color: #f3ece0;
        }
        .print-back-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 2rem;
          color: #d98a4e;
          margin: 0 0 8px;
        }
        .print-back-tagline {
          font-size: 1rem;
          color: rgba(243,236,224,0.55);
          margin: 0 0 12px;
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
        }
        .print-back-url {
          font-size: 0.85rem;
          color: rgba(243,236,224,0.35);
          margin: 0 0 20px;
        }
        .print-back-legal {
          font-size: 0.72rem;
          color: rgba(243,236,224,0.25);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Print / PDF styles ── */
        @media print {
          @page {
            size: A4;
            margin: 16mm 18mm;
          }

          body { background: white !important; }

          .no-print { display: none !important; }

          .print-root { background: white; }
          .print-doc { max-width: 100%; padding: 0; }
          .print-page {
            box-shadow: none;
            border-radius: 0;
            margin: 0;
            border: none;
            page-break-after: always;
            break-after: page;
          }

          .print-cover { min-height: auto; page-break-after: always; break-after: page; }
          .print-cover-inner { padding: 40mm 0 20mm; }
          .print-section { padding: 20mm 0; }

          .print-back-page {
            background: #14171c !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color: #f3ece0 !important;
          }

          .print-expect-grid { grid-template-columns: repeat(3, 1fr); }
          .print-two-col { grid-template-columns: 1fr 1fr; }

          /* Force colour on accents */
          .print-h1 em,
          .print-back-brand,
          .print-kicker,
          .print-night-num,
          .print-tagline,
          .print-why-label,
          .print-tracker-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          .print-expect-card,
          .print-why,
          .print-disclaimer-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
