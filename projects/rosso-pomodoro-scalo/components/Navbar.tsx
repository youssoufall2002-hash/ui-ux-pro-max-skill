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

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href="#top"
      className="group flex items-center gap-3"
      aria-label={`${site.name} ${site.place} — home`}
    >
      <span className="seal h-11 w-11 bg-brick text-cream text-[0.6rem] font-bold leading-[0.9]">
        <span>
          RP<br />1998
        </span>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-xl uppercase ${dark ? "text-cream" : "text-bottle"}`}
        >
          {site.name}
        </span>
        <span className="mt-0.5 block font-cond text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-brick">
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 shadow-[0_2px_0_0_#0E3B2E] backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-3">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {links.slice(0, 3).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-cond text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:text-brick"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#prenota" className="btn-primary">
            Prenota
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-cream text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi il menù" : "Apri il menù"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-y-2 border-ink bg-cream md:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/15 py-3 font-cond text-base font-semibold uppercase tracking-widest text-ink transition-colors hover:text-brick"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href={site.phoneHref} className="btn-primary w-full">
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
