import Reveal from "./Reveal";
import { WheatIcon, FlameIcon, LeafIcon } from "./Icons";

const pillars = [
  {
    icon: WheatIcon,
    title: "L'impasto",
    text: "Farine selezionate e una lievitazione lenta di 24 ore, per un cornicione alto, leggero e digeribile.",
  },
  {
    icon: FlameIcon,
    title: "Il forno a legna",
    text: "Temperatura oltre i 450°C: la pizza cuoce in 90 secondi, mantenendo morbidezza e profumo.",
  },
  {
    icon: LeafIcon,
    title: "Gli ingredienti",
    text: "Pomodoro San Marzano, mozzarella di bufala campana DOP, basilico fresco e olio EVO.",
  },
];

export default function About() {
  return (
    <section id="storia" className="scroll-mt-20 bg-parchment/60 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="eyebrow">La nostra storia</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-4xl">
            Napoli incontra lo Scalo di Milano
          </h2>
          <div className="mt-6 space-y-4 text-espresso/75">
            <p>
              Rosso Pomodoro nasce dall&apos;amore per la vera pizza napoletana. Allo Scalo di Milano
              portiamo lo stesso gesto di sempre: le mani nella farina, il rispetto dei tempi di
              lievitazione e la fiamma viva del forno a legna.
            </p>
            <p>
              Un locale accogliente, tra il legno e il rosso pomodoro, dove ritrovare i sapori
              autentici del Sud in un quartiere che guarda al futuro. Che sia una cena tra amici o
              una serata in famiglia, qui la pizza si fa con il cuore.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-1">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-0.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                  <p.icon width={22} height={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-espresso">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-espresso/65">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
