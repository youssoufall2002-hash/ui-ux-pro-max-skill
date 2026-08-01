import { site, mapsUrl } from "@/lib/site";
import { Logo } from "./Navbar";
import { InstagramIcon, PhoneIcon, MailIcon, MapPinIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-tomato/10 bg-cream py-14">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-espresso/65">
            La vera pizza napoletana allo Scalo di Milano. Forno a legna, impasto a lunga
            lievitazione, ingredienti campani.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-tomato/10 text-tomato transition-colors hover:bg-tomato hover:text-white"
            aria-label="Seguici su Instagram"
          >
            <InstagramIcon width={20} height={20} />
          </a>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-espresso">Contatti</h3>
          <ul className="mt-4 space-y-3 text-sm text-espresso/70">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-tomato">
                <PhoneIcon width={16} height={16} />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-tomato">
                <MailIcon width={16} height={16} />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-tomato"
              >
                <MapPinIcon width={16} height={16} />
                <span>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-espresso">Orari</h3>
          <ul className="mt-4 space-y-2 text-sm text-espresso/70">
            {site.hours.map((h) => (
              <li key={h.days} className="flex flex-col">
                <span className="font-medium text-espresso">{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col items-center justify-between gap-2 border-t border-tomato/10 pt-6 text-xs text-espresso/50 sm:flex-row">
        <p>
          © {year} {site.legalName}. Tutti i diritti riservati.
        </p>
        <p>P.IVA 00000000000 · Sito realizzato con cura.</p>
      </div>
    </footer>
  );
}
