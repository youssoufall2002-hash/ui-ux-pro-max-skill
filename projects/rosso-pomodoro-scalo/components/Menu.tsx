import { menu } from "@/lib/menu";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { StarIcon, ArrowRightIcon } from "./Icons";

export default function Menu() {
  return (
    <section id="menu" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="label flex items-center justify-center gap-3 text-brick">
            <StarIcon width={14} height={14} />
            La Carta
            <StarIcon width={14} height={14} />
          </p>
          <h2 className="mt-3 font-display text-5xl uppercase text-bottle sm:text-6xl">
            Le nostre pizze
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body italic text-ink/70">
            Stesso impasto, stesso forno a legna. Un menù d&apos;esempio: chiedi sempre le
            proposte del giorno.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {menu.map((category, ci) => (
            <Reveal key={category.id} delay={ci * 60} className="break-inside-avoid">
              {/* Testata categoria */}
              <div className="mb-6 flex items-center gap-4 border-b-2 border-ink pb-3">
                <span className="seal h-11 w-11 shrink-0 bg-mustard text-ink font-display text-lg">
                  {ci + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none text-brick">
                    {category.title}
                  </h3>
                  {category.note && (
                    <p className="mt-1 font-body text-sm italic text-ink/60">{category.note}</p>
                  )}
                </div>
              </div>

              <ul className="space-y-5">
                {category.pizzas.map((pizza) => (
                  <li key={pizza.name}>
                    <div className="flex items-end">
                      <h4 className="font-cond text-lg font-semibold uppercase tracking-wide text-ink">
                        {pizza.name}
                        {pizza.signature && (
                          <StarIcon
                            width={14}
                            height={14}
                            className="ml-2 inline-block text-mustard-dark"
                          />
                        )}
                      </h4>
                      <span className="leader" aria-hidden />
                      <span className="font-display text-xl text-bottle">{pizza.price}</span>
                    </div>
                    <p className="mt-1 max-w-md font-body text-sm italic leading-relaxed text-ink/65">
                      {pizza.ingredients}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Banner finale */}
        <Reveal className="mt-16 border-2 border-ink bg-bottle px-6 py-9 text-center text-cream shadow-cardRed sm:px-12">
          <p className="mx-auto max-w-xl font-body text-lg italic">
            Antipasti napoletani, fritti, dolci fatti in casa e vini campani ti aspettano a tavola.
          </p>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mustard mt-6"
          >
            Chiedi il menù completo
            <ArrowRightIcon width={18} height={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
