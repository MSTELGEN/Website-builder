export default function MedicalDisclaimer() {
  return (
    <aside
      className="mx-auto max-w-5xl px-5 mb-4"
      aria-label="Medical disclaimer"
    >
      <div className="rounded-xl border border-paper/12 bg-paper/[0.04] px-6 py-5">
        <h2 className="text-xs uppercase tracking-widest text-paper/40 font-medium mb-3">
          A note on when this guide is not enough
        </h2>
        <p className="text-paper/50 text-sm leading-relaxed max-w-3xl">
          This guide is designed for healthy adults with ordinary sleep difficulties. If you have
          symptoms of{" "}
          <strong className="text-paper/70">sleep apnoea</strong> (loud snoring, gasping awake,
          partner reports you stop breathing),{" "}
          <strong className="text-paper/70">perimenopause-related sleep disruption</strong>,{" "}
          <strong className="text-paper/70">clinical insomnia</strong> (six or more weeks of
          significant difficulty), or{" "}
          <strong className="text-paper/70">anxiety or mood disorders</strong> affecting sleep —
          please see a clinician first. These rituals may still help alongside professional
          support, but they are not a substitute for it. Nothing in this guide is medical advice.
        </p>
      </div>
    </aside>
  );
}
