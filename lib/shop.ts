// -----------------------------------------------------------------------------
// Avondwinkel Diouma — winkelgegevens
// Pas hier alles aan: adres, telefoon, openingstijden. De hele site leest hieruit.
// -----------------------------------------------------------------------------

export const shop = {
  name: "Avondwinkel Diouma",
  shortName: "Diouma",
  tagline: "De avondwinkel van Apeldoorn",
  city: "Apeldoorn",
  street: "Stationsstraat 289A",
  postcode: "7311 ME",
  addressFull: "Stationsstraat 289A, 7311 ME Apeldoorn",
  phone: "055 312 3490",
  phoneHref: "tel:+31553123490",
  whatsapp: "31553123490", // vervang door je mobiele WhatsApp-nummer indien beschikbaar
  email: "info@avondwinkel-apeldoorn.nl",
  mapsQuery: "Avondwinkel+Diouma+Stationsstraat+289+Apeldoorn",
} as const;

// Openingstijden — 0 = zondag ... 6 = zaterdag.
// null = gesloten. Pas aan naar jullie werkelijke tijden.
export type Hours = { open: string; close: string } | null;

export const openingHours: Record<number, Hours> = {
  1: { open: "16:00", close: "01:00" }, // maandag
  2: { open: "16:00", close: "01:00" }, // dinsdag
  3: { open: "16:00", close: "01:00" }, // woensdag
  4: { open: "16:00", close: "01:00" }, // donderdag
  5: { open: "16:00", close: "02:00" }, // vrijdag
  6: { open: "16:00", close: "02:00" }, // zaterdag
  0: { open: "16:00", close: "01:00" }, // zondag
};

export const dayNames = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
];

// Sluitingstijden na middernacht horen bij de vorige dag. Deze helper bepaalt
// of de winkel op dit moment open is (rekening houdend met tijden na 24:00).
export function getOpenState(now: Date): {
  open: boolean;
  closesAt?: string;
  opensDay?: string;
  opensAt?: string;
} {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Check of we nog binnen de openingstijd van gisteren vallen (na middernacht).
  const yDay = (now.getDay() + 6) % 7;
  const yh = openingHours[yDay];
  if (yh) {
    const close = toMin(yh.close);
    if (close < toMin(yh.open) && nowMin < close) {
      return { open: true, closesAt: yh.close };
    }
  }

  // Vandaag.
  const th = openingHours[now.getDay()];
  if (th) {
    const openM = toMin(th.open);
    const closeM = toMin(th.close);
    const overnight = closeM < openM;
    if (nowMin >= openM && (overnight || nowMin < closeM)) {
      return { open: true, closesAt: th.close };
    }
    if (nowMin < openM) {
      return { open: false, opensDay: "vandaag", opensAt: th.open };
    }
  }

  // Zoek de volgende dag met openingstijden.
  for (let i = 1; i <= 7; i++) {
    const d = (now.getDay() + i) % 7;
    const h = openingHours[d];
    if (h) {
      return {
        open: false,
        opensDay: i === 1 ? "morgen" : dayNames[d].toLowerCase(),
        opensAt: h.open,
      };
    }
  }
  return { open: false };
}
