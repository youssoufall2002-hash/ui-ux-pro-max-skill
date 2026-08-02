import Reveal from "./Reveal";
import { WheatIcon, FlameIcon, LeafIcon, StarIcon } from "./Icons";

const pillars = [
  {
    icon: WheatIcon,
    title: "L'impasto",
    text: "Lievitazione lenta di 24 ore: cornicione alto, leggero e digeribile.",
  },
  {
    icon: FlameIcon,
    title: "Forno a legna",
    text: "Oltre 450°C, cottura in 90 secondi. Morbida dentro, profumata fuori.",
  },
  {
    icon: LeafIcon,
    title: "Ingredienti DOP",
    text: "San Marzano, bufala campana, basilico fresco e olio EVO.",
  },
];

export default function About() {
  return (
    <section id="storia" className="scroll-mt-20 border-y-2 border-ink bg-bottle py-20 text-cream sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="label flex items-center gap-3 text-mustard">
            <StarIcon width={14} height={14} />
            La nostra storia
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] sm:text-6xl">
            Napoli incontra
            <span className="block text-mustard">lo Scalo</span>
          </h2>
          <div className="mt-6 space-y-4 font-body text-cream/85">
            <p>
              Rosso Pomodoro nasce dall&apos;amore per la vera pizza napoletana. Allo Scalo di
              Milano portiamo lo stesso gesto di sempre: le mani nella farina, il rispetto dei
              tempi di lievitazione e la fiamma viva del forno a legna.
            </p>
            <p className="italic text-cream/70">
              Tra il legno e il verde delle nostre insegne, ritrovi i sapori autentici del Sud in
              un quartiere che guarda al futuro. Qui la pizza si fa con il cuore.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex items-start gap-4 border-2 border-ink bg-cream p-5 text-ink shadow-cardRed">
                <span className="seal h-12 w-12 shrink-0 bg-brick text-cream">
                  <p.icon width={22} height={22} />
                </span>
                <div>
                  <h3 className="font-cond text-lg font-semibold uppercase tracking-wide text-brick">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-body text-sm italic leading-relaxed text-ink/70">
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
