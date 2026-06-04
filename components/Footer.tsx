import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 py-10 px-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p
            className="text-ember font-medium text-sm"
            style={{ fontFamily: "Fraunces, Georgia, serif", fontStyle: "italic" }}
          >
            Sleep research, decoded.
          </p>
          <p className="text-paper/40 text-xs mt-1">
            © {new Date().getFullYear()} ManyRituals
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
            <li>
              <Link href="/references" className="text-paper/40 hover:text-paper/70 text-xs transition-colors duration-200">
                References
              </Link>
            </li>
            <li>
              <a
                href="https://instagram.com/manyrituals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/40 hover:text-paper/70 text-xs transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-paper/30 text-xs max-w-xs">
          Your email is never sold. Every email has a one-click unsubscribe. This guide is for
          healthy adults; it is not medical advice.
        </p>
      </div>
    </footer>
  );
}
