"use client";
import { useEffect, useState } from "react";
import { isSubscribed, setSubscribed } from "@/lib/subscription";
import EmailCapture from "@/components/EmailCapture";
import PrintButton from "@/components/PrintButton";

export default function PrintGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Visitors arriving from the Kit confirmation/incentive email carry ?unlocked=1.
    // Honour it (and remember them) so the email link works on any device.
    const fromEmail =
      new URLSearchParams(window.location.search).get("unlocked") === "1";
    if (fromEmail) {
      setSubscribed();
      setUnlocked(true);
      setReady(true);
      return;
    }
    setUnlocked(isSubscribed());
    setReady(true);
    const onSub = () => setUnlocked(true);
    window.addEventListener("mr-subscribed", onSub);
    return () => window.removeEventListener("mr-subscribed", onSub);
  }, []);

  // Avoid a flash of the gate before we've checked localStorage
  if (!ready) {
    return <div style={{ minHeight: "60vh" }} aria-hidden="true" />;
  }

  if (!unlocked) {
    return (
      <div className="gate-screen">
        <div className="gate-card">
          <p className="gate-kicker">Almost yours</p>
          <h1 className="gate-title">
            Get the printable guide<br />
            <em>+ tracker + Night 8</em>
          </h1>
          <p className="gate-sub">
            Enter your email and everything unlocks instantly — the full PDF, the printable
            tracker, and the bonus ritual most people never hear about. Then one short email
            walks you through each night.
          </p>

          <EmailCapture
            variant="gate"
            showValueList
            ctaLabel="Unlock my downloads"
            onSuccess={() => setUnlocked(true)}
          />

          <a href="/" className="gate-back">← Back to the guide</a>
        </div>

        <style>{`
          .gate-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 20px 40px;
            background:
              radial-gradient(ellipse 70% 50% at 50% 25%, rgba(217,138,78,0.10) 0%, transparent 70%),
              #14171c;
          }
          .gate-card {
            max-width: 520px;
            width: 100%;
          }
          .gate-kicker {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #d98a4e;
            font-weight: 500;
            margin: 0 0 14px;
          }
          .gate-title {
            font-family: 'Fraunces', Georgia, serif;
            font-weight: 300;
            font-size: clamp(2rem, 6vw, 3rem);
            line-height: 1.05;
            color: #f3ece0;
            margin: 0 0 18px;
          }
          .gate-title em { color: #d98a4e; font-style: italic; }
          .gate-sub {
            color: rgba(243,236,224,0.6);
            font-size: 0.98rem;
            line-height: 1.6;
            margin: 0 0 26px;
          }
          .gate-back {
            display: inline-block;
            margin-top: 22px;
            color: rgba(243,236,224,0.4);
            font-size: 0.85rem;
            text-decoration: none;
          }
          .gate-back:hover { color: rgba(243,236,224,0.7); }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar appears only once unlocked */}
      <div className="no-print print-toolbar">
        <div className="print-toolbar-inner">
          <span className="print-brand">ManyRituals</span>
          <div className="print-toolbar-actions">
            <a href="/" className="print-back">← Back to guide</a>
            <PrintButton />
          </div>
        </div>
        {/* Print hint — screen only */}
        <div className="print-hint">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{flexShrink:0}}>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Use <strong>Ctrl+P</strong> (Windows) or <strong>⌘P</strong> (Mac) to save as PDF or print the tick-box tracker on paper.
        </div>
      </div>
      {children}
      <style>{`
        .print-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          font-size: 0.78rem;
          color: rgba(243,236,224,0.45);
          border-top: 1px solid rgba(243,236,224,0.07);
          max-width: 860px;
          margin: 0 auto;
        }
        .print-hint strong { color: rgba(243,236,224,0.7); font-weight: 500; }
        @media print { .print-hint { display: none !important; } }
      `}</style>
    </>
  );
}
