import { menu } from "@/lib/menu";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { FlameIcon, ArrowRightIcon } from "./Icons";

export default function Menu() {
  return (
    <section id="menu" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Il Menù</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-4xl">
            Le nostre pizze
          </h2>
          <p className="mt-4 text-espresso/70">
            Ogni pizza nasce dallo stesso impasto a lunga lievitazione e dallo stesso forno a legna.
            Un menù di esempio: chiedici sempre le proposte del giorno.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16">
          {menu.map((category) => (
            <div key={category.id}>
              <Reveal className="mb-7 flex flex-wrap items-baseline justify-between gap-2 border-b border-tomato/15 pb-4">
                <h3 className="font-display text-2xl font-semibold text-tomato">{category.title}</h3>
                {category.note && (
                  <p className="text-sm italic text-espresso/60">{category.note}</p>
                )}
              </Reveal>

              <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
                {category.pizzas.map((pizza, i) => (
                  <Reveal key={pizza.name} delay={i * 50}>
                    <li className="group flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-lg font-semibold text-espresso">
                            {pizza.name}
                          </h4>
                          {pizza.signature && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                              <FlameIcon width={12} height={12} />
                              Firma
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-espresso/65">
                          {pizza.ingredients}
                        </p>
                      </div>
                      <div
                        className="mt-1 whitespace-nowrap font-display text-lg font-bold text-tomato"
                        aria-label={`Prezzo ${pizza.price}`}
                      >
                        {pizza.price}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-14 rounded-3xl bg-espresso px-6 py-10 text-center text-cream sm:px-12">
          <p className="mx-auto max-w-xl text-lg">
            Abbiamo anche antipasti napoletani, fritti, dolci fatti in casa e una carta di vini campani.
          </p>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-6 bg-tomato text-white hover:bg-tomato-light hover:-translate-y-0.5"
          >
            Chiedi il menù completo
            <ArrowRightIcon width={18} height={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
