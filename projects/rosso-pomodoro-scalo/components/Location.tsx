import { site, mapsUrl } from "@/lib/site";
import Reveal from "./Reveal";
import { MapPinIcon, ClockIcon, PhoneIcon, ArrowRightIcon, StarIcon } from "./Icons";

export default function Location() {
  return (
    <section id="dove-siamo" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="label flex items-center justify-center gap-3 text-brick">
            <StarIcon width={14} height={14} />
            Dove siamo
            <StarIcon width={14} height={14} />
          </p>
          <h2 className="mt-3 font-display text-5xl uppercase text-bottle sm:text-6xl">
            Vieni a trovarci
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <Reveal className="flex flex-col gap-5">
            <div className="flex items-start gap-4 border-2 border-ink bg-paper p-6 shadow-card">
              <span className="seal h-11 w-11 shrink-0 bg-brick text-cream">
                <MapPinIcon width={22} height={22} />
              </span>
              <div>
                <h3 className="font-cond text-lg font-semibold uppercase tracking-wide text-brick">
                  Indirizzo
                </h3>
                <p className="mt-1 font-body text-ink/75">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city} ({site.address.country})
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-cond text-sm font-semibold uppercase tracking-wide text-bottle hover:text-brick"
                >
                  Apri in Google Maps
                  <ArrowRightIcon width={16} height={16} />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-2 border-ink bg-paper p-6 shadow-card">
              <span className="seal h-11 w-11 shrink-0 bg-mustard text-ink">
                <ClockIcon width={22} height={22} />
              </span>
              <div className="w-full">
                <h3 className="font-cond text-lg font-semibold uppercase tracking-wide text-brick">
                  Orari
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex items-end font-body text-sm">
                      <span className="text-ink/75">{h.days}</span>
                      <span className="leader" aria-hidden />
                      <span
                        className={
                          "closed" in h && h.closed
                            ? "font-cond font-semibold uppercase tracking-wide text-brick"
                            : "font-cond font-medium text-ink"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href={site.phoneHref} className="btn-primary">
              <PhoneIcon width={18} height={18} />
              Chiama: {site.phone}
            </a>
          </Reveal>

          {/* Mappa stilizzata */}
          <Reveal className="min-h-[340px]">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri ${site.legalName} in Google Maps`}
              className="group relative flex h-full min-h-[340px] items-center justify-center overflow-hidden border-2 border-ink shadow-cardRed"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-bottle"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(242,232,207,0.10) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(242,232,207,0.10) 1px, transparent 1px)," +
                    "linear-gradient(35deg, transparent 47%, rgba(232,185,58,0.55) 47%, rgba(232,185,58,0.55) 50%, transparent 50%)," +
                    "linear-gradient(-20deg, transparent 62%, rgba(242,232,207,0.35) 62%, rgba(242,232,207,0.35) 64%, transparent 64%)",
                  backgroundSize: "40px 40px, 40px 40px, 100% 100%, 100% 100%",
                }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="seal h-16 w-16 bg-brick text-cream transition-transform duration-200 group-hover:-translate-y-1">
                  <MapPinIcon width={28} height={28} />
                </span>
                <span className="mt-4 border-2 border-ink bg-mustard px-5 py-2.5 font-cond text-sm font-semibold uppercase tracking-wide text-ink">
                  Apri la mappa
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
