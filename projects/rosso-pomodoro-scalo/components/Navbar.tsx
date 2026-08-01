"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { MenuIcon, CloseIcon, PhoneIcon } from "./Icons";

const links = [
  { href: "#menu", label: "Menù" },
  { href: "#storia", label: "Storia" },
  { href: "#dove-siamo", label: "Dove siamo" },
  { href: "#prenota", label: "Prenota" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${className}`} aria-label={`${site.name} ${site.place} — home`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tomato text-white shadow-soft transition-transform duration-200 group-hover:scale-105">
        <span className="font-display text-xl font-bold leading-none">RP</span>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-espresso">{site.name}</span>
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {site.place}
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-3">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm font-semibold text-espresso/80">
            {links.slice(0, 3).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="cursor-pointer transition-colors hover:text-tomato">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#prenota" className="btn-primary">
            Prenota un tavolo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-tomato/25 bg-white/70 text-espresso md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi il menù" : "Apri il menù"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-tomato/10 bg-cream/98 backdrop-blur-md md:hidden">
          <ul className="container-page flex flex-col gap-1 py-4 text-base font-semibold text-espresso">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-tomato/10 hover:text-tomato"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a href={site.phoneHref} className="btn-ghost w-full">
                <PhoneIcon width={18} height={18} />
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
