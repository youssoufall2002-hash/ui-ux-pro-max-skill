"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import {
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  InstagramIcon,
  ArrowRightIcon,
} from "./Icons";

const inputBase =
  "mt-1.5 w-full rounded-xl border border-tomato/20 bg-white px-4 py-3 text-espresso outline-none transition-colors placeholder:text-espresso/40 focus:border-tomato focus:ring-2 focus:ring-tomato/20";

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
      value: "Scrivici su WhatsApp",
      href: `https://wa.me/${site.whatsapp}`,
    },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: InstagramIcon, label: "Instagram", value: "@rossopomodoroscalomilano", href: site.instagram },
  ];

  return (
    <section id="prenota" className="scroll-mt-20 bg-espresso py-20 text-cream sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Testo + contatti */}
        <div>
          <span className="eyebrow text-tomato-light">Prenotazioni</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Prenota il tuo tavolo
          </h2>
          <p className="mt-4 max-w-md text-cream/75">
            Compila il modulo e invia la richiesta direttamente su WhatsApp, oppure contattaci come
            preferisci. Ti confermiamo noi la disponibilità.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-white/5 px-4 py-3 transition-colors hover:border-tomato/50 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tomato/20 text-tomato-light">
                    <c.icon width={20} height={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-cream/50">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-semibold">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-cream p-6 text-espresso shadow-soft sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="text-sm font-semibold">
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
              <label htmlFor="guests" className="text-sm font-semibold">
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
              <label htmlFor="date" className="text-sm font-semibold">
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
              <label htmlFor="time" className="text-sm font-semibold">
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
              <label htmlFor="note" className="text-sm font-semibold">
                Note <span className="font-normal text-espresso/50">(facoltativo)</span>
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
            Invia richiesta su WhatsApp
            <ArrowRightIcon width={18} height={18} />
          </button>
          <p className="mt-3 text-center text-xs text-espresso/55">
            Si aprirà WhatsApp con il messaggio già pronto. La prenotazione è valida solo dopo la
            nostra conferma.
          </p>
        </form>
      </div>
    </section>
  );
}
