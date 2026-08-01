import { site } from "@/lib/site";
import { ArrowRightIcon, FlameIcon, WheatIcon, LeafIcon } from "./Icons";

const highlights = [
  { icon: WheatIcon, label: "Impasto a 24h" },
  { icon: FlameIcon, label: "Forno a legna" },
  { icon: LeafIcon, label: "Ingredienti DOP" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Sfondo caldo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-tomato/10 blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <FlameIcon width={16} height={16} />
            Pizzeria napoletana · dal 1998
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-espresso sm:text-5xl lg:text-6xl">
            La vera pizza napoletana,
            <span className="text-tomato"> nel cuore dello Scalo</span> di Milano.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/75">
            Impasto a lunga lievitazione, cotto nel forno a legna. Pomodoro San Marzano,
            mozzarella di bufala campana e la passione di Napoli, serviti allo Scalo.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#prenota" className="btn-primary">
              Prenota un tavolo
              <ArrowRightIcon width={18} height={18} />
            </a>
            <a href="#menu" className="btn-ghost">
              Guarda il menù
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {highlights.map((h) => (
              <li key={h.label} className="flex items-center gap-2.5 text-sm font-semibold text-espresso/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-tomato shadow-card">
                  <h.icon width={18} height={18} />
                </span>
                {h.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: "pizza" costruita in CSS, nessuna immagine esterna richiesta */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <PizzaVisual />
        </div>
      </div>
    </section>
  );
}

/** Illustrazione decorativa di una pizza margherita, in puro CSS/SVG. */
function PizzaVisual() {
  return (
    <div className="relative h-full w-full animate-fade-up">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-tomato/20 blur-2xl" />
      <div className="absolute inset-4 rounded-full bg-[#E8B872] shadow-soft ring-8 ring-[#D9A65B]/60">
        {/* Salsa */}
        <div className="absolute inset-6 rounded-full bg-tomato shadow-inner">
          {/* Mozzarella + basilico */}
          {[
            { t: "18%", l: "30%", c: "#FBF3E2", s: 34 },
            { t: "26%", l: "62%", c: "#FBF3E2", s: 28 },
            { t: "55%", l: "22%", c: "#FBF3E2", s: 30 },
            { t: "60%", l: "58%", c: "#FBF3E2", s: 36 },
            { t: "40%", l: "44%", c: "#FBF3E2", s: 26 },
            { t: "72%", l: "40%", c: "#FBF3E2", s: 24 },
            { t: "30%", l: "20%", c: "#4D7C2F", s: 16 },
            { t: "50%", l: "70%", c: "#4D7C2F", s: 16 },
            { t: "70%", l: "60%", c: "#4D7C2F", s: 14 },
            { t: "20%", l: "50%", c: "#4D7C2F", s: 14 },
          ].map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                top: b.t,
                left: b.l,
                width: b.s,
                height: b.s * 0.82,
                background: b.c,
                boxShadow: "0 2px 6px rgba(58,22,7,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Badge "Cotta nel forno a legna" */}
      <div className="absolute -bottom-2 -left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tomato/10 text-tomato">
          <FlameIcon width={18} height={18} />
        </span>
        <span className="text-sm font-semibold text-espresso">
          Cotta nel<br />forno a legna
        </span>
      </div>
    </div>
  );
}
