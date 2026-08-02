import { site, mapsUrl } from "@/lib/site";
import { Logo } from "./Navbar";
import { InstagramIcon, PhoneIcon, MailIcon, MapPinIcon, StarIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-cream py-14">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-body text-sm italic leading-relaxed text-ink/70">
            La vera pizza napoletana allo Scalo di Milano. Forno a legna, impasto a lunga
            lievitazione, ingredienti campani.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="seal mt-5 inline-flex h-11 w-11 bg-brick text-cream transition-transform hover:-translate-y-0.5"
            aria-label="Seguici su Instagram"
          >
            <InstagramIcon width={20} height={20} />
          </a>
        </div>

        <div>
          <h3 className="font-cond text-sm font-semibold uppercase tracking-[0.2em] text-brick">
            Contatti
          </h3>
          <ul className="mt-4 space-y-3 font-body text-sm text-ink/75">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-brick">
                <PhoneIcon width={16} height={16} />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-brick">
                <MailIcon width={16} height={16} />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-brick"
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
          <h3 className="font-cond text-sm font-semibold uppercase tracking-[0.2em] text-brick">
            Orari
          </h3>
          <ul className="mt-4 space-y-2 font-body text-sm text-ink/75">
            {site.hours.map((h) => (
              <li key={h.days} className="flex flex-col">
                <span className="font-cond font-medium uppercase tracking-wide text-ink">
                  {h.days}
                </span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col items-center justify-between gap-2 border-t-2 border-ink/15 pt-6 font-cond text-xs uppercase tracking-wide text-ink/55 sm:flex-row">
        <p className="flex items-center gap-2">
          <StarIcon width={12} height={12} className="text-brick" />© {year} {site.legalName}
        </p>
        <p>P.IVA 00000000000</p>
      </div>
    </footer>
  );
}
