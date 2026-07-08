import { shop, openingHours } from "@/lib/shop";
import OpenStatus from "@/components/OpenStatus";
import OpeningHours from "@/components/OpeningHours";
import StickyCallBar from "@/components/StickyCallBar";
import Reveal from "@/components/Reveal";

const categories = [
  {
    emoji: "🍺",
    title: "Koud bier",
    desc: "Pils, speciaalbier & kratten — recht uit de koeling.",
    tag: "Altijd koud",
    color: "neon-amber",
  },
  {
    emoji: "🍷",
    title: "Wijn & sterke drank",
    desc: "Rood, wit, rosé, whisky, wodka, rum & likeuren.",
    tag: "18+",
    color: "neon-pink",
  },
  {
    emoji: "🥤",
    title: "Frisdrank & energy",
    desc: "Cola, ice tea, energydrinks en water — koud in de kast.",
    tag: "Ijskoud",
    color: "neon-cyan",
  },
  {
    emoji: "🥨",
    title: "Chips & borrelhap",
    desc: "Chips, nootjes, zoutjes en alles voor de avond.",
    tag: "Favoriet",
    color: "neon-lime",
  },
  {
    emoji: "🍫",
    title: "Snoep & chocolade",
    desc: "Repen, snoepzakken en die late trek naar iets zoets.",
    tag: "",
    color: "neon-magenta",
  },
  {
    emoji: "🚬",
    title: "Roken & gemak",
    desc: "Sigaretten, shag, aanstekers en kleine boodschappen.",
    tag: "18+",
    color: "neon-amber",
  },
  {
    emoji: "🍦",
    title: "IJs & diepvries",
    desc: "IJsjes en snacks uit de vriezer voor warme avonden.",
    tag: "",
    color: "neon-cyan",
  },
  {
    emoji: "🛒",
    title: "Vergeten boodschappen",
    desc: "Brood, melk, eieren — dat wat de supermarkt niet meer verkoopt.",
    tag: "Reddend",
    color: "neon-pink",
  },
];

const usps = [
  { icon: "🌙", title: "Elke avond tot laat", text: "Open als de rest dicht is — 7 dagen per week." },
  { icon: "📍", title: "In het centrum", text: "Stationsstraat, 5 min. lopen van het station." },
  { icon: "💳", title: "Pinnen & contant", text: "Betaal makkelijk met pin, contant of mobiel." },
  { icon: "🛵", title: "Snel geregeld", text: "Bel vooruit — dan ligt je bestelling klaar." },
];

const marquee = [
  "Koud bier",
  "Wijn & sterke drank",
  "Chips & snacks",
  "Frisdrank & energy",
  "Snoep & chocolade",
  "Roken & gemak",
  "Tot laat open",
];

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-grid-glow px-4 pb-16 pt-28 sm:px-6"
        aria-label="Introductie"
      >
        {/* glowing city haze */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(91,140,255,0.12), transparent 45%), radial-gradient(circle at 85% 70%, rgba(255,46,136,0.14), transparent 45%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Apeldoorn · Stationsstraat
          </p>

          <h1 className="font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl md:text-8xl">
            <span className="neon-pink animate-flicker block">Avondwinkel</span>
            <span className="neon-cyan animate-flicker-slow mt-1 block">Diouma</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 sm:text-xl">
            Koud bier, drank, chips & snacks — <span className="text-white">tot diep in de nacht.</span>{" "}
            Als de supermarkt dicht is, zijn wij nog open.
          </p>

          <div className="mt-7 flex justify-center">
            <OpenStatus />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={shop.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-7 py-3.5 text-base font-bold text-white shadow-neon-pink transition-transform hover:scale-105 sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 011.5-3z" />
              </svg>
              Bel & bestel · {shop.phone}
            </a>
            <a
              href="#locatie"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-7 py-3.5 text-base font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/20 sm:w-auto"
            >
              📍 Route hierheen
            </a>
          </div>

          <p className="mt-6 text-sm text-white/40">
            {shop.addressFull} · 5 minuten lopen van Station Apeldoorn
          </p>
        </div>

        {/* Neon marquee strip */}
        <div className="relative mt-14 overflow-hidden border-y border-white/10 bg-white/[0.02] py-3">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...marquee, ...marquee].map((item, i) => (
              <span
                key={i}
                className="font-display text-xl tracking-widest text-white/80"
              >
                {item}
                <span className="mx-8 text-neon-pink">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- USP STRIP ---------------- */}
      <section className="border-b border-white/10 px-4 py-10 sm:px-6" aria-label="Waarom bij ons">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u, i) => (
            <Reveal key={u.title} delay={i * 60}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-2xl" aria-hidden="true">{u.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{u.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{u.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- ASSORTIMENT ---------------- */}
      <section id="assortiment" className="px-4 py-20 sm:px-6" aria-label="Assortiment">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon-pink">
                Ons assortiment
              </p>
              <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                Alles voor de <span className="neon-cyan">avond</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/60">
                Van een koud kratje tot chips voor op de bank. Loop binnen of bel je bestelling
                door — wij leggen het klaar.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 70}>
                <div className="neon-card group flex h-full flex-col p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl" aria-hidden="true">{c.emoji}</span>
                    {c.tag && (
                      <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-wide text-white">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-white/55">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Iets speciaals nodig? Bel{" "}
            <a href={shop.phoneHref} className="font-semibold text-neon-pink hover:underline">
              {shop.phone}
            </a>{" "}
            — grote kans dat we het hebben.
          </p>
        </div>
      </section>

      {/* ---------------- BEZORGEN / BESTELLEN ---------------- */}
      <section
        id="bezorgen"
        className="relative overflow-hidden px-4 py-20 sm:px-6"
        aria-label="Bestellen en bezorgen"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,46,136,0.1), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <div className="neon-card overflow-hidden p-8 sm:p-12">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-neon-lime">
                    Bellen · bestellen · klaarleggen
                  </p>
                  <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                    Bel je bestelling door
                  </h2>
                  <p className="mt-4 max-w-md text-white/60">
                    Geen zin om te wachten? Bel vooruit met je bestelling, dan ligt alles voor je
                    klaar als je binnenloopt. Snel, makkelijk en zonder gedoe.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    <li className="flex items-center gap-2"><Check /> Bestelling klaar bij aankomst</li>
                    <li className="flex items-center gap-2"><Check /> Pinnen of contant betalen</li>
                    <li className="flex items-center gap-2"><Check /> Vraag naar bezorging in de buurt</li>
                  </ul>
                </div>
                <div className="w-full md:w-auto">
                  <a
                    href={shop.phoneHref}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-8 py-4 text-lg font-bold text-white shadow-neon-pink transition-transform hover:scale-105"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 011.5-3z" />
                    </svg>
                    {shop.phone}
                  </a>
                  <p className="mt-3 text-center text-xs text-white/40">
                    Tijdens openingstijden bereikbaar
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- OPENINGSTIJDEN ---------------- */}
      <section id="openingstijden" className="px-4 py-20 sm:px-6" aria-label="Openingstijden">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                Openingstijden
              </p>
              <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                Open als je ons <span className="neon-pink">nodig hebt</span>
              </h2>
              <p className="mt-4 text-white/60">
                Wij draaien door als de rest van Apeldoorn de deuren sluit. In het weekend blijven
                we extra lang open.
              </p>
              <div className="mt-6">
                <OpenStatus />
              </div>
              <p className="mt-4 text-xs text-white/40">
                Openingstijden kunnen op feestdagen afwijken. Twijfel je? Bel even:{" "}
                <a href={shop.phoneHref} className="text-neon-pink hover:underline">{shop.phone}</a>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="neon-card p-3 sm:p-4">
              <OpeningHours />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- LOCATIE ---------------- */}
      <section id="locatie" className="px-4 py-20 sm:px-6" aria-label="Locatie">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon-lime">
                Vind ons
              </p>
              <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                Midden in <span className="neon-cyan">Apeldoorn</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/60">
                Aan de Stationsstraat, vlak bij de Markt en het stadhuis — en maar 5 minuten lopen
                vanaf het station.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="neon-card flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-5 text-sm">
                  <InfoRow icon="📍" label="Adres">
                    {shop.street}<br />{shop.postcode} {shop.city}
                  </InfoRow>
                  <InfoRow icon="📞" label="Telefoon">
                    <a href={shop.phoneHref} className="text-neon-pink hover:underline">{shop.phone}</a>
                  </InfoRow>
                  <InfoRow icon="✉️" label="E-mail">
                    <a href={`mailto:${shop.email}`} className="hover:underline break-all">{shop.email}</a>
                  </InfoRow>
                  <InfoRow icon="🚉" label="Bereikbaarheid">
                    5 min. lopen van Station Apeldoorn · centrum
                  </InfoRow>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${shop.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                >
                  🧭 Open in Google Maps
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={80}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${shop.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bekijk de route naar Avondwinkel Diouma in Google Maps"
                className="group relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 lg:h-full"
              >
                {/* Stylised street grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #0d1326 0%, #0a0f1f 100%)",
                    backgroundImage:
                      "linear-gradient(rgba(91,140,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.14) 1px, transparent 1px)",
                    backgroundSize: "44px 44px, 44px 44px",
                  }}
                />
                {/* Diagonal 'main road' */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1/4 rotate-[24deg]"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, transparent 0 60px, rgba(40,224,255,0.10) 60px 66px)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 45%, rgba(255,46,136,0.22), transparent 55%)",
                  }}
                />
                {/* Glowing pin */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-neon-pink/60 bg-night/70 text-3xl shadow-neon-pink transition-transform group-hover:scale-110">
                    📍
                  </span>
                  <p className="mt-4 font-display text-2xl tracking-wide text-white">
                    {shop.name}
                  </p>
                  <p className="text-sm text-white/60">{shop.street} · {shop.city}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-5 py-2 text-sm font-semibold text-neon-cyan">
                    🧭 Bekijk route
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="px-4 pb-20 sm:px-6" aria-label="Kom langs">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neon-pink/30 bg-gradient-to-b from-neon-pink/10 to-transparent p-10 text-center sm:p-14">
            <h2 className="font-display text-5xl tracking-wide sm:text-6xl">
              <span className="neon-pink">Trek gekregen?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Loop binnen of bel je bestelling door. Wij staan voor je klaar tot laat in de nacht.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={shop.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-8 py-4 text-lg font-bold text-white shadow-neon-pink transition-transform hover:scale-105 sm:w-auto"
              >
                📞 Bel {shop.phone}
              </a>
              <a
                href="#openingstijden"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
              >
                🕒 Bekijk openingstijden
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <StickyCallBar />

      {/* Structured data — Local Business voor Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
    </>
  );
}

function Check() {
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-neon-lime/20 text-neon-lime" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function InfoRow({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{label}</p>
        <p className="mt-0.5 text-white/80">{children}</p>
      </div>
    </div>
  );
}

function localBusinessJsonLd() {
  const dayMap: Record<number, string> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const hoursSpec = Object.entries(openingHours)
    .filter(([, h]) => h)
    .map(([day, h]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayMap[Number(day)]}`,
      opens: h!.open,
      closes: h!.close,
    }));

  return {
    "@context": "https://schema.org",
    "@type": ["ConvenienceStore", "LiquorStore"],
    name: shop.name,
    description:
      "Avondwinkel in het centrum van Apeldoorn met koud bier, wijn, sterke drank, frisdrank, chips en snacks — elke avond tot laat open.",
    telephone: shop.phone,
    email: shop.email,
    url: "https://avondwinkel-apeldoorn.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.street,
      postalCode: shop.postcode,
      addressLocality: shop.city,
      addressCountry: "NL",
    },
    areaServed: "Apeldoorn",
    openingHoursSpecification: hoursSpec,
  };
}
