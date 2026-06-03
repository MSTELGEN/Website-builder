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
            className="text-5xl md:text-7xl font-light leading-none text-paper mb-6"
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

          {/* Email capture */}
          <div className="max-w-lg">
            <EmailCapture variant="hero" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-paper/30 text-sm">
              Or scroll down to read right now — no email required.
            </p>
            <a
              href="/print"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-paper/20 hover:border-paper/40 px-4 py-2 text-sm text-paper/55 hover:text-paper/80 transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3.5 1h7v3.5H3.5zM2.5 4.5h9a1.5 1.5 0 011.5 1.5v3.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 011 9.5V6a1.5 1.5 0 011.5-1.5zM3.5 9h7v3h-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <circle cx="10" cy="7.2" r="0.6" fill="currentColor" />
              </svg>
              Download PDF
            </a>
          </div>
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
