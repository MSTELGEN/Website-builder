"use client";
import EmailCapture from "@/components/EmailCapture";

export default function WhatNext() {
  return (
    <section
      id="waitlist"
      className="py-20 md:py-28 px-5 border-t border-paper/8 scroll-mt-20"
      aria-label="What's next"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-ember text-sm tracking-widest uppercase font-medium mb-4">
          What&apos;s next
        </p>

        <h2
          className="text-4xl md:text-5xl font-light text-paper mb-6 leading-tight"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          {/* ← Replace with final product name before launch */}
          The ManyRituals
          <br />
          <em className="text-ember">Sleep System</em>
        </h2>

        <p className="text-paper/60 text-lg max-w-xl mb-4 leading-relaxed">
          Seven nights is a start. The full Sleep System goes deeper — circadian rhythm tuning,
          stress protocols, the science of recovery, and a personalised ritual stack built around
          your schedule.
        </p>

        {/* PLACEHOLDER — update before launch */}
        <p className="text-paper/35 text-sm mb-10 italic">
          [Product name and price TBC — drop your placeholder here before launch]
        </p>

        <div className="rounded-2xl border border-ember/20 bg-ember/5 p-8 mb-10">
          <h3
            className="text-2xl font-light text-paper mb-3"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            Join the waitlist
          </h3>
          <p className="text-paper/55 text-sm mb-6">
            Be first to know when it launches, get early-bird pricing, and receive two bonus
            rituals by email.
          </p>
          <EmailCapture variant="waitlist" className="max-w-md" />
        </div>

        {/* Social nudges */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.share) {
                navigator
                  .share({
                    title: "The 7-Night Sleep Reset",
                    text: "Seven evidence-based rituals for better sleep — free from ManyRituals.",
                    url: window.location.href,
                  })
                  .catch(() => null);
              } else {
                navigator.clipboard?.writeText(window.location.href).catch(() => null);
              }
            }}
            className="cursor-pointer flex items-center gap-2 rounded-lg border border-paper/15 hover:border-paper/30 px-5 py-2.5 text-sm text-paper/60 hover:text-paper transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="4" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 3.8L5.5 7.2M5.5 8.8l5 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Share this guide
          </button>

          <a
            href="https://instagram.com/manyrituals"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-paper/15 hover:border-paper/30 px-5 py-2.5 text-sm text-paper/60 hover:text-paper transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor" />
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
