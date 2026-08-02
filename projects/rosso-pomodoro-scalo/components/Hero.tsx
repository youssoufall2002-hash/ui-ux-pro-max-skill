import { site } from "@/lib/site";
import { ArrowRightIcon, StarIcon } from "./Icons";

const tickerItems = [
  "Pizza Napoletana",
  "Forno a Legna",
  "Impasto 24h",
  "Mozzarella di Bufala DOP",
  "Scalo · Milano",
  "Dal 1998",
];

export default function Hero() {
  return (
    <section id="top" className="px-4 pt-24 pb-0 sm:px-6 sm:pt-28">
      {/* Pannello manifesto */}
      <div className="container-page">
        <div className="relative border-2 border-ink bg-bottle text-cream shadow-cardRed">
          {/* Cornice interna */}
          <div className="pointer-events-none absolute inset-2 border border-cream/30" />

          <div className="relative grid gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="label flex items-center gap-3 text-mustard">
                <StarIcon width={14} height={14} />
                Vera Pizzeria Napoletana
                <StarIcon width={14} height={14} />
              </p>

              <h1 className="mt-5 font-display text-[3.2rem] uppercase leading-[0.92] sm:text-7xl lg:text-[5.4rem]">
                <span className="block">La vera pizza</span>
                <span className="block text-mustard">napoletana</span>
                <span className="block">
                  allo <span className="text-brick">Scalo</span>
                </span>
              </h1>

              <p className="mt-6 max-w-lg font-body text-lg italic leading-relaxed text-cream/85">
                Impasto a lunga lievitazione, cotto nel forno a legna. I sapori di Napoli,
                serviti nel cuore di Milano.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#prenota" className="btn-mustard">
                  Prenota un tavolo
                  <ArrowRightIcon width={18} height={18} />
                </a>
                <a href="#menu" className="btn-outline text-cream">
                  Guarda il menù
                </a>
              </div>
            </div>

            {/* Timbro / bollo */}
            <div className="relative mx-auto hidden lg:block">
              <div className="rays animate-spin-slow absolute inset-0 rounded-full opacity-70" />
              <div className="seal relative mx-auto h-52 w-52 flex-col gap-1 bg-bottle text-mustard">
                <span className="font-cond text-xs font-semibold tracking-[0.3em]">Dal</span>
                <span className="font-display text-6xl leading-none text-cream">1998</span>
                <span className="font-cond text-[0.7rem] font-semibold tracking-[0.25em]">
                  Forno a Legna
                </span>
                <span className="mt-1 flex gap-1 text-brick">
                  <StarIcon width={12} height={12} />
                  <StarIcon width={12} height={12} />
                  <StarIcon width={12} height={12} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Striscia a scorrimento */}
      <div className="mt-6 overflow-hidden border-y-2 border-ink bg-brick py-3">
        <div className="animate-ticker flex w-max whitespace-nowrap">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center" aria-hidden={rep === 1}>
              {tickerItems.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-6 font-display text-lg uppercase tracking-wide text-cream">
                    {item}
                  </span>
                  <StarIcon width={14} height={14} className="text-mustard" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
