import { shop } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 pb-28 pt-14 sm:px-6 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl leading-none tracking-wide text-white">
            Avond<span className="neon-pink">winkel</span> Diouma
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Jouw avondwinkel in het centrum van Apeldoorn. Bier, drank, frisdrank, chips en
            snacks — elke avond tot laat open.
          </p>
        </div>

        <div className="text-sm">
          <h2 className="font-display text-xl tracking-wide text-neon-cyan">Contact</h2>
          <ul className="mt-3 space-y-2 text-white/70">
            <li>{shop.addressFull}</li>
            <li>
              <a href={shop.phoneHref} className="hover:text-white">
                {shop.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${shop.email}`} className="hover:text-white">
                {shop.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h2 className="font-display text-xl tracking-wide text-neon-cyan">Snel naar</h2>
          <ul className="mt-3 space-y-2 text-white/70">
            <li><a href="#assortiment" className="hover:text-white">Assortiment</a></li>
            <li><a href="#openingstijden" className="hover:text-white">Openingstijden</a></li>
            <li><a href="#bezorgen" className="hover:text-white">Bezorgen</a></li>
            <li><a href="#locatie" className="hover:text-white">Locatie & route</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {shop.name}. Alle rechten voorbehouden.</p>
        <p>
          Verkoop van alcohol alleen vanaf 18 jaar. Geen 18, geen alcohol —{" "}
          <span className="text-white/60">legitimatie verplicht.</span>
        </p>
      </div>
    </footer>
  );
}
