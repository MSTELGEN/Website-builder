# Avondwinkel Diouma — Apeldoorn

Een high-converting, mobiel-eerste landingspagina voor **Avondwinkel Diouma**, de
avondwinkel in het centrum van Apeldoorn. Gebouwd met **Next.js (App Router) +
TypeScript + Tailwind CSS**, met een duidelijke neon "night shop"-uitstraling.

## Wat de site doet

- **Neon night-shop sfeer** — donkere achtergrond, gloeiende signage, marquee-strip.
- **Live open/dicht-indicator** — leest de openingstijden en toont of de winkel *nu*
  open is (inclusief sluitingstijden na middernacht).
- **Conversie-gericht** — grote "Bel & bestel"-knoppen overal, plus een vaste
  bel-balk onderin op mobiel.
- **Assortiment** — bier, wijn & sterke drank, frisdrank & energy, chips & snacks,
  snoep, roken & gemak, ijs en vergeten boodschappen.
- **Openingstijden** met de huidige dag gemarkeerd.
- **Locatie** met adres, route-knop en een zelfstandige (netwerkvrije) kaartpaneel.
- **SEO** — Nederlandse metadata + `LocalBusiness` JSON-LD structured data voor Google.

## Gegevens aanpassen

Alle winkelgegevens staan op één plek: **`lib/shop.ts`**.

- **Adres, telefoon, e-mail** — bovenin het `shop`-object.
- **Openingstijden** — in `openingHours` (`0` = zondag … `6` = zaterdag; `null` =
  gesloten). De live-indicator en de tabel lezen hier automatisch uit.
- **Assortiment / teksten** — in `app/page.tsx` (arrays `categories`, `usps`, `marquee`).

> De telefoon- en openingstijdgegevens zijn ingevuld op basis van openbare bronnen.
> Controleer ze en pas ze aan naar de werkelijke tijden voordat je live gaat.

## Lokaal draaien

```bash
npm install
npm run dev      # → http://localhost:3000
```

## Bouwen

```bash
npm run build
npm run start
```

## Deployen naar Vercel

1. Push de repo naar GitHub.
2. In Vercel: **Add New Project** → importeer de repo → deploy.
   Er zijn **geen** environment variables nodig.

## Structuur

| Bestand | Rol |
|---|---|
| `lib/shop.ts` | Winkelgegevens + open/dicht-logica (pas hier alles aan) |
| `app/page.tsx` | De volledige landingspagina |
| `app/layout.tsx` | Fonts, metadata, nav + footer |
| `components/OpenStatus.tsx` | Live "nu open / gesloten"-badge |
| `components/OpeningHours.tsx` | Openingstijdentabel met dag-highlight |
| `components/StickyCallBar.tsx` | Vaste bel-balk onderin (mobiel) |
| `components/Nav.tsx` / `Footer.tsx` | Navigatie en footer |
| `components/Reveal.tsx` | Scroll-reveal animatie |
