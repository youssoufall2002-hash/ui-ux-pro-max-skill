"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import {
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  InstagramIcon,
  ArrowRightIcon,
  StarIcon,
} from "./Icons";

const inputBase =
  "mt-1.5 w-full border-2 border-ink bg-cream px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brick focus:bg-white";

export default function Reservations() {
  const [form, setForm] = useState({
    name: "",
    guests: "2",
    date: "",
    time: "",
    note: "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message =
      `Ciao ${site.name} ${site.place}! Vorrei prenotare un tavolo.\n` +
      `• Nome: ${form.name || "-"}\n` +
      `• Persone: ${form.guests}\n` +
      `• Data: ${form.date || "-"}\n` +
      `• Ora: ${form.time || "-"}` +
      (form.note ? `\n• Note: ${form.note}` : "");
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contacts = [
    { icon: PhoneIcon, label: "Telefono", value: site.phone, href: site.phoneHref },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Scrivici ora",
      href: `https://wa.me/${site.whatsapp}`,
    },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: "@rossopomodoroscalomilano",
      href: site.instagram,
    },
  ];

  return (
    <section id="prenota" className="scroll-mt-20 border-t-2 border-ink bg-bottle-dark py-20 text-cream sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="label flex items-center gap-3 text-mustard">
            <StarIcon width={14} height={14} />
            Prenotazioni
          </p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] sm:text-6xl">
            Prenota il<span className="block text-mustard">tuo tavolo</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-lg italic text-cream/80">
            Compila il modulo e invia la richiesta su WhatsApp, oppure contattaci come preferisci.
            Ti confermiamo noi la disponibilità.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 border-2 border-cream/25 bg-bottle px-4 py-3 transition-colors hover:border-mustard"
                >
                  <span className="seal h-10 w-10 shrink-0 bg-mustard text-ink">
                    <c.icon width={20} height={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-cond text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                      {c.label}
                    </span>
                    <span className="block truncate font-cond text-sm font-medium">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupon / modulo */}
        <form
          onSubmit={handleSubmit}
          className="border-2 border-ink bg-paper p-6 text-ink shadow-cardRed sm:p-8"
        >
          <div className="mb-5 flex items-center justify-between border-b-2 border-dashed border-ink/30 pb-3">
            <span className="font-display text-xl uppercase text-brick">Prenotazione</span>
            <span className="font-cond text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              N° ____
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="font-cond text-sm font-semibold uppercase tracking-wide">
                Nome e cognome
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Mario Rossi"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="guests" className="font-cond text-sm font-semibold uppercase tracking-wide">
                Persone
              </label>
              <select id="guests" value={form.guests} onChange={update("guests")} className={inputBase}>
                {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="font-cond text-sm font-semibold uppercase tracking-wide">
                Data
              </label>
              <input
                id="date"
                type="date"
                required
                value={form.date}
                onChange={update("date")}
                className={inputBase}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="time" className="font-cond text-sm font-semibold uppercase tracking-wide">
                Orario
              </label>
              <input
                id="time"
                type="time"
                required
                value={form.time}
                onChange={update("time")}
                className={inputBase}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="note" className="font-cond text-sm font-semibold uppercase tracking-wide">
                Note <span className="text-ink/50">(facoltativo)</span>
              </label>
              <textarea
                id="note"
                rows={3}
                value={form.note}
                onChange={update("note")}
                placeholder="Allergie, seggiolone, tavolo all'aperto…"
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full">
            <WhatsAppIcon width={18} height={18} />
            Invia su WhatsApp
            <ArrowRightIcon width={18} height={18} />
          </button>
          <p className="mt-3 text-center font-body text-xs italic text-ink/60">
            Si aprirà WhatsApp con il messaggio già pronto. La prenotazione è valida solo dopo la
            nostra conferma.
          </p>
        </form>
      </div>
    </section>
  );
}
