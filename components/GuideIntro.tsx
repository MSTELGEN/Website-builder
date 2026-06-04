export default function GuideIntro() {
  return (
    <section
      id="how-to-use"
      className="py-16 md:py-20 px-5 border-t border-paper/8"
      aria-label="How to use this guide"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-ember text-sm tracking-widest uppercase font-medium mb-4">
          Before you start
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-paper mb-8 leading-tight"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          This is an experiment,
          <br />
          not a cure.
        </h2>

        <div className="space-y-5 text-paper/70 leading-relaxed max-w-2xl">
          <p>
            Each night introduces one change to your environment or behaviour. That's deliberate —
            isolating one variable at a time lets you feel what actually moves the needle for{" "}
            <em>you</em>. Your sleep is not a generic problem with a generic fix.
          </p>
          <p>
            The science behind each ritual is well-grounded, but the effects vary by person. Some
            of these will feel transformative immediately. Some won't. That's useful data.
          </p>
          <p>
            The framing throughout is environment → physiology → nervous system. Better sleep is
            mostly about removing obstacles: too much heat, too much light, an always-on brain.
            Once the obstacles are out of the way, your body usually knows what to do.
          </p>
        </div>

        {/* What to expect timeline */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            {
              night: "By Night 3",
              expect:
                "Sleep onset may already be faster — temperature and phone cues compound quickly.",
            },
            {
              night: "By Night 5",
              expect:
                "Fewer mid-night wakes for most people. Alcohol and meal timing changes start showing in the second half.",
            },
            {
              night: "By Night 7",
              expect:
                "A clearer picture of which rituals actually matter for you. That's the real output of this week.",
            },
          ].map(({ night, expect }) => (
            <div
              key={night}
              className="rounded-xl border border-sage/15 bg-sage/[0.05] p-5"
            >
              <p className="text-sage text-sm font-medium mb-2">{night}</p>
              <p className="text-paper/60 text-sm leading-relaxed">{expect}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
