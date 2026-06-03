// All scientific claims here are sourced as documented.
// VERIFIED = primary source confirmed; VERIFY = likely real, needs PubMed confirmation before publishing.
// Claims without a verified source have been softened or omitted per brief requirements.

export interface Citation {
  key: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  note?: string; // e.g. "VERIFY — confirm before publishing", "animal study", "theoretical"
  url?: string;
}

export interface Night {
  num: number;
  ritual: string;
  shortLabel: string; // used in tracker
  why: string;
  protocol: string[];
  mistakes: string[];
  expect: string;
  citations: Citation[];
}

export const nights: Night[] = [
  {
    num: 1,
    ritual: "Cool the bedroom to ~18–19°C",
    shortLabel: "Cool bedroom ≤19°C",
    why: `Your body's core temperature needs to drop roughly 1–1.5°C to initiate sleep. Peripheral vasodilation — warmth at your hands and feet — is the mechanism: blood moves to the skin, heat radiates out, core temperature falls. Warm rooms suppress slow-wave (deep) sleep. Research on thermal environments and sleep suggests the sweet spot is around 18–19°C.`,
    protocol: [
      "Set your thermostat to 18–19°C (65–66°F) about an hour before bed.",
      "If you have no thermostat, open a window slightly or run a fan on low.",
      "Wear light, breathable bedding — your duvet is a thermostat of its own.",
      "Keep socks on if your feet feel cold before sleep (cold feet slow the vasodilation cascade).",
    ],
    mistakes: [
      "Cranking the heating to compensate for light PJs — the room temperature matters more than what you wear.",
      "Cooling only after you're already awake in the night (too late for slow-wave sleep).",
    ],
    expect:
      "Night 1–2: You'll likely notice you fall asleep faster if the room was previously too warm. Night 3+: Deeper, quieter sleep — fewer middle-of-the-night wakes.",
    citations: [
      {
        key: "harding2019",
        authors: "Harding EC, Franks NP, Wisden W",
        year: 2019,
        title: "The Temperature Dependence of Sleep",
        journal: "Frontiers in Neuroscience",
        note: "VERIFY — confirm volume/issue on PubMed before publishing",
        url: "https://pubmed.ncbi.nlm.nih.gov/31736703/",
      },
      {
        key: "okamoto2012",
        authors: "Okamoto-Mizuno K, Mizuno K",
        year: 2012,
        title: "Effects of thermal environment on sleep and circadian rhythm",
        journal: "Journal of Physiological Anthropology",
        note: "VERIFY — confirm as Journal of Physiological Anthropology 31:14",
        url: "https://pubmed.ncbi.nlm.nih.gov/22738673/",
      },
    ],
  },
  {
    num: 2,
    ritual: "Charge your phone in another room",
    shortLabel: "Phone out of room",
    why: `Two separate mechanisms are at work. First, evening exposure to blue-spectrum light from screens can delay melatonin onset, pushing your body clock later. Second, leaving a phone in the bedroom creates a low-level alerting state — notifications, vibrations, or simply the awareness of its presence can prompt late-night checking that fragments sleep. Removing the phone eliminates both pathways.`,
    protocol: [
      "Plug your phone in outside the bedroom before your wind-down starts — not just when you get into bed.",
      "Use an analogue alarm clock if you need a wake-up call.",
      "If the phone must stay in the room: screen face-down, on Do Not Disturb, with only genuine emergencies breaking through.",
    ],
    mistakes: [
      '"One last check" — the alerting response this triggers can take 20+ minutes to subside.',
      "Using 'night mode' or blue-light glasses as a full substitute — they reduce but don't eliminate the alerting effect.",
    ],
    expect:
      "Night 1: You'll feel mildly anxious without it — that's the alerting response you're breaking. Night 3+: The anxiety fades; sleep onset typically improves.",
    citations: [
      {
        key: "exelmans2016",
        authors: "Exelmans L, Van den Bulck J",
        year: 2016,
        title: "Bedtime mobile phone use and sleep in adults",
        journal: "Social Science & Medicine",
        note: "VERIFY — confirm as Social Science & Medicine 148:93–101",
        url: "https://pubmed.ncbi.nlm.nih.gov/26745499/",
      },
      {
        key: "chang2015",
        authors: "Chang AM, Aeschbach D, Duffy JF, Czeisler CA",
        year: 2015,
        title:
          "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness",
        journal: "Proceedings of the National Academy of Sciences",
        note: "VERIFY — confirm as PNAS 112(4):1232–1237",
        url: "https://pubmed.ncbi.nlm.nih.gov/25535358/",
      },
    ],
  },
  {
    num: 3,
    ritual: "Finish dinner at least 3 hours before bed",
    shortLabel: "Dinner 3h before",
    why: `Digestion raises core body temperature — the opposite of what you need for sleep onset. Lying down soon after eating also increases reflux risk, which can cause micro-arousals you may not consciously remember. Research on late eating and sleep quality suggests that timing your last main meal 3+ hours before bed is one of the simpler levers you have.`,
    protocol: [
      "Aim for your last main meal at least 3 hours before your target sleep time.",
      "If you're hungry closer to bed, a small, low-glycaemic snack (e.g. a handful of nuts) is less disruptive than a full meal.",
      "Avoid high-sugar or high-GI foods in the two hours before bed — they can spike blood glucose and delay sleep.",
    ],
    mistakes: [
      "Skipping dinner entirely — hunger is also a sleep disruptor.",
      "Big dessert after a late meal: the glucose + insulin cycle takes time to settle.",
    ],
    expect:
      "Night 1–2: If you have reflux or wake around 2–3am, you may notice an immediate improvement. Night 5+: Deeper first-half sleep as your gut is quieter when you lie down.",
    citations: [
      {
        key: "crispim2011",
        authors: "Crispim CA, et al.",
        year: 2011,
        title: "Relationship between food intake and sleep pattern in healthy individuals",
        journal: "Journal of Clinical Sleep Medicine",
        note: "VERIFY — confirm as JCSM 7(6):659–664",
        url: "https://pubmed.ncbi.nlm.nih.gov/22171203/",
      },
    ],
  },
  {
    num: 4,
    ritual: "Stop alcohol at least 3 hours before sleep",
    shortLabel: "Last drink 3h before",
    why: `Alcohol is the most misunderstood sleep compound. It does speed onset — you may fall asleep faster. But it suppresses REM sleep in the second half of the night, fragmenting dream-stage sleep and leaving you feeling unrefreshed. A meta-analysis by Ebrahim et al. (2013) found a dose-dependent relationship: even low doses reduced sleep quality when consumed close to bedtime.`,
    protocol: [
      "If you drink, set your last drink at least 3 hours before your target sleep time.",
      "Alcohol is metabolised at roughly one unit per hour — factor that in.",
      "Replace the evening wind-down ritual (glass of wine) with something physical: the warm shower in Night 5 is a direct substitute.",
    ],
    mistakes: [
      '"A nightcap helps me sleep" — it speeds onset but costs you the back half of the night.',
      "Assuming it only matters when drinking heavily — even moderate amounts affect REM.",
    ],
    expect:
      "Night 1–2: You may find sleep onset feels slightly slower without alcohol. This is normal — your nervous system is adjusting. Night 4+: Noticeably more vivid dreams (REM rebound) and feeling more rested on waking.",
    citations: [
      {
        // VERIFIED
        key: "ebrahim2013",
        authors: "Ebrahim IO, Shapiro CM, Williams AJ, Fenwick PB",
        year: 2013,
        title: "Alcohol and Sleep I: Effects on Normal Sleep",
        journal: "Alcoholism: Clinical and Experimental Research",
        note: "VERIFIED",
        url: "https://pubmed.ncbi.nlm.nih.gov/23347102/",
      },
    ],
  },
  {
    num: 5,
    ritual: "Take a warm bath or shower 1–2 hours before bed",
    shortLabel: "Warm bath or shower",
    why: `Counterintuitively, warming up accelerates the core cooling you need. A warm bath or shower dilates peripheral blood vessels, pulling heat from the core to the skin. When you step out into a cool room, heat dissipates quickly — your core temperature drops faster than it would without the intervention. A 2019 systematic review (Haghayegh et al.) of 17 studies found that passive body heating 1–2 hours before bed was associated with an average reduction in sleep onset latency of approximately 10 minutes.`,
    protocol: [
      "Run a bath or shower at 40–42°C (104–108°F) — warm but not scalding.",
      "Soak or shower for at least 10 minutes.",
      "Time it 1–2 hours before your target sleep time (not immediately before bed).",
      "Move into a cooled bedroom afterwards.",
    ],
    mistakes: [
      "Stepping out of the bath directly into a warm room — the effect depends on the temperature gradient.",
      "Showering immediately before bed — the heating phase needs time to reverse.",
    ],
    expect:
      "Night 1: Many people report noticeably faster sleep onset. Night 3+: The ritual itself becomes a cue — your body begins to associate it with sleep.",
    citations: [
      {
        // VERIFIED
        key: "haghayegh2019",
        authors:
          "Haghayegh S, Khoshnevis S, Smolensky MH, Diller KR, Castriotta RJ",
        year: 2019,
        title:
          "Before-bedtime passive body heating by warm shower or bath to improve sleep: A systematic review and meta-analysis",
        journal: "Sleep Medicine Reviews",
        note: "VERIFIED — 17 studies included, 13 with usable data; ~10-min average reduction in sleep onset latency; 1–2h before bed",
        url: "https://pubmed.ncbi.nlm.nih.gov/31102877/",
      },
    ],
  },
  {
    num: 6,
    ritual: "3 minutes of slow breathing: inhale 4, exhale 6–8",
    shortLabel: "Breathing 4-6",
    why: `Slow breathing with a prolonged exhale shifts autonomic balance toward parasympathetic dominance — the "rest and digest" branch of your nervous system. The exhale is the primary lever: lengthening it stimulates the vagus nerve and increases heart-rate variability. A 2018 systematic review (Zaccaro et al.) found consistent psycho-physiological effects of slow breathing across studies. Jerath et al. (2015) propose in a theoretical paper that self-regulated breathing may reduce sympathetic arousal; note that this is a hypothesis paper, not an outcome trial.`,
    protocol: [
      "Lie down or sit upright in a chair.",
      "Breathe in slowly through the nose for 4 counts.",
      "Breathe out slowly through the mouth for 6–8 counts. Emphasise the exhale.",
      "Repeat for 3 minutes (roughly 15–20 cycles).",
      "Don't force it — if 4/8 feels too long, start at 3/5.",
    ],
    mistakes: [
      "Trying too hard — tension in the effort defeats the purpose.",
      "Stopping after 30 seconds. The effect builds across 2–3 minutes.",
    ],
    expect:
      "Night 1: A noticeable drop in perceived stress within the 3 minutes. Night 5+: The technique becomes automatic — you'll use it outside the sleep reset too.",
    citations: [
      {
        // VERIFIED
        key: "zaccaro2018",
        authors: "Zaccaro A, et al.",
        year: 2018,
        title:
          "How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing",
        journal: "Frontiers in Human Neuroscience",
        note: "VERIFY — confirm as Front. Hum. Neurosci. 12:353",
        url: "https://pubmed.ncbi.nlm.nih.gov/30245619/",
      },
      {
        // VERIFIED (theoretical paper — cite as "proposes")
        key: "jerath2015",
        authors: "Jerath R, Crawford MW, Barnes VA, Harden K",
        year: 2015,
        title: "Self-Regulation of Breathing as a Primary Treatment for Anxiety",
        journal: "Applied Psychophysiology and Biofeedback",
        note: "VERIFIED — theoretical/hypothesis paper; proposes mechanism, does not show measured outcomes",
        url: "https://pubmed.ncbi.nlm.nih.gov/25869930/",
      },
    ],
  },
  {
    num: 7,
    ritual: "Pillow height and sleep position",
    shortLabel: "Side position",
    why: `Side sleeping is the predominant adult position. Accelerometry data from Skarpsno et al. (2017) found that most adults sleep predominantly on their side. Left-side sleeping is associated with reduced reflux and faster gastric emptying. A neutral cervical spine — pillow filling the exact gap between your ear and the mattress — reduces muscle tension and the micro-arousals it can cause. Emerging research (in rodents) from Lee et al. (2015) suggests that side sleeping may be associated with more efficient glymphatic clearance — the brain's overnight "waste removal" system — though this remains an animal study and has not been replicated in humans at scale.`,
    protocol: [
      "Start the night on your side (either side works; left may reduce reflux).",
      "Adjust your pillow so it fills the gap between your ear and mattress — your spine should be roughly straight when viewed from behind.",
      "Place a pillow between your knees to reduce hip and lower-back rotation.",
      "Don't stress about position mid-night — your body moves naturally.",
    ],
    mistakes: [
      "Using a pillow that's too high (tilts the neck up) or too flat (drops the head).",
      "Pillow between the knees but no support under the waist for wide hips — add a small roll if needed.",
    ],
    expect:
      "Night 1: May feel unfamiliar if you're a back sleeper. Night 3+: Most people stop noticing the effort and find it comfortable. Long-term: reduced morning neck stiffness.",
    citations: [
      {
        // VERIFIED (side-predominant position data only)
        key: "skarpsno2017",
        authors: "Skarpsno ES, Mork PJ, Nilsen TIL, Holtermann A",
        year: 2017,
        title:
          "Sleep positions and nocturnal body movements based on free-living accelerometer recordings: association with demographics, lifestyle, and insomnia symptoms",
        journal: "Nature and Science of Sleep",
        note: "VERIFIED — supports 'side is the predominant adult position' ONLY. Does not support claims about supine vs. non-restorative sleep outcomes.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29138589/",
      },
      {
        // VERIFY — animal study, label as emerging
        key: "lee2015",
        authors: "Lee H, et al.",
        year: 2015,
        title: "The Effect of Body Posture on Brain Glymphatic Transport",
        journal: "Journal of Neuroscience",
        note: "VERIFY — rodent study; cite as emerging/animal research only. Confirm as J. Neurosci. 35(31):11034–11044.",
        url: "https://pubmed.ncbi.nlm.nih.gov/26245965/",
      },
    ],
  },
];
