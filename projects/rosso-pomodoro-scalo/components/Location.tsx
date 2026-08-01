import { site, mapsUrl } from "@/lib/site";
import Reveal from "./Reveal";
import { MapPinIcon, ClockIcon, PhoneIcon, ArrowRightIcon } from "./Icons";

export default function Location() {
  return (
    <section id="dove-siamo" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Dove siamo</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-4xl">
            Vieni a trovarci allo Scalo
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          {/* Info */}
          <Reveal className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                <MapPinIcon width={22} height={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-espresso">Indirizzo</h3>
                <p className="mt-1 text-espresso/70">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city} ({site.address.country})
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-tomato hover:underline"
                >
                  Apri in Google Maps
                  <ArrowRightIcon width={16} height={16} />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                <ClockIcon width={22} height={22} />
              </span>
              <div className="w-full">
                <h3 className="font-display text-lg font-semibold text-espresso">Orari</h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span className="text-espresso/70">{h.days}</span>
                      <span
                        className={
                          "closed" in h && h.closed
                            ? "font-semibold text-tomato"
                            : "font-medium text-espresso"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href={site.phoneHref} className="btn-ghost justify-center">
              <PhoneIcon width={18} height={18} />
              Chiama: {site.phone}
            </a>
          </Reveal>

          {/* Mappa — card stilizzata che apre Google Maps */}
          <Reveal className="min-h-[340px]">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri ${site.legalName} in Google Maps`}
              className="group relative flex h-full min-h-[340px] items-center justify-center overflow-hidden rounded-3xl shadow-soft ring-1 ring-tomato/10"
            >
              {/* Base "mappa" con strade in puro CSS */}
              <div
                aria-hidden
                className="absolute inset-0 bg-parchment"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(58,22,7,0.06) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(58,22,7,0.06) 1px, transparent 1px)," +
                    "linear-gradient(35deg, transparent 47%, rgba(161,98,7,0.18) 47%, rgba(161,98,7,0.18) 50%, transparent 50%)," +
                    "linear-gradient(-20deg, transparent 62%, rgba(220,38,38,0.12) 62%, rgba(220,38,38,0.12) 64%, transparent 64%)",
                  backgroundSize: "38px 38px, 38px 38px, 100% 100%, 100% 100%",
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />

              {/* Marker */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tomato text-white shadow-soft transition-transform duration-200 group-hover:-translate-y-1">
                  <MapPinIcon width={30} height={30} />
                </span>
                <span className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-espresso shadow-card">
                  Apri la mappa in Google Maps
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
