import EmailCapture from "@/components/EmailCapture";
import GuideSection from "@/components/GuideSection";
import Tracker from "@/components/Tracker";
import GuideIntro from "@/components/GuideIntro";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import WhatNext from "@/components/WhatNext";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-5 pt-24 pb-16 overflow-hidden"
        aria-label="Hero"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(217,138,78,0.09) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-3xl w-full relative">
          <p className="text-ember text-sm tracking-widest uppercase font-medium mb-6">
            ManyRituals · Free Guide
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] md:leading-none text-paper mb-6"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            The 7-Night
            <br />
            <em className="text-ember">Sleep Reset</em>
          </h1>

          <p className="text-paper/60 text-lg md:text-xl max-w-xl mb-2 leading-relaxed">
            Seven small experiments. Seven nights.
            <br />
            No supplements, no gadgets, no pseudoscience.
          </p>
          <p className="text-paper/40 text-sm mb-10 max-w-lg">
            Research-backed rituals for better sleep, explained plainly — so you know what's
            actually happening in your body.
          </p>

          {/* Email capture — with value list (the reason to subscribe) */}
          <div className="max-w-lg rounded-2xl border border-paper/10 bg-paper/[0.03] p-6">
            <p className="text-paper/80 text-sm font-medium mb-1">
              Get the whole reset, free — straight to your inbox:
            </p>
            <EmailCapture variant="hero" showValueList />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="#tracker"
              className="group inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/[0.07] px-5 py-2.5 text-sm font-medium text-ember hover:bg-ember/15 transition-colors duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                <rect x="9" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="currentColor" />
                <rect x="1" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="currentColor" />
                <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              Try the 7-night tracker
              <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">↓</span>
            </a>
            <span className="text-paper/30 text-xs">free · no email needed to try it</span>
          </div>

          <p className="mt-6 text-paper/30 text-sm max-w-lg">
            Prefer to read first? Scroll down — the full guide is right here on the page. The
            printable PDF, tracker, and Night 8 are the part we send by email.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/25 text-xs"
          aria-hidden="true"
        >
          <span>scroll</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-bounce"
            style={{ animationDuration: "1.5s" }}
          >
            <path
              d="M8 3v9M5 9l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* How to use */}
      <ScrollReveal>
        <GuideIntro />
      </ScrollReveal>

      {/* Medical disclaimer — early, before the guide content */}
      <ScrollReveal>
        <MedicalDisclaimer />
      </ScrollReveal>

      {/* The 7 nights — client component manages tracker state integration */}
      <GuideSection />

      {/* Tracker */}
      <ScrollReveal>
        <Tracker />
      </ScrollReveal>

      {/* What's next / waitlist */}
      <ScrollReveal>
        <WhatNext />
      </ScrollReveal>
    </>
  );
}
