"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { IconFace, IconSpark, IconFoot, IconStar } from "@/components/Icons";

const TREATMENT_LINKS = [
  { href: "/behandelingen/gezichtsbehandelingen", label: "Gezichtsbehandelingen", icon: IconFace },
  { href: "/behandelingen/lichaam", label: "Lichaam", icon: IconSpark },
  { href: "/behandelingen/medische-pedicure", label: "Medische pedicure", icon: IconFoot },
  { href: "/behandelingen-en-tarieven", label: "Tarieven", icon: IconStar },
];

export default function Header({ phone }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef(null);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function closeDropdownDelayed() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-sage-200/70 bg-sage-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
        >
          <img src="/images/logo.png" alt="Beauty by Nodiy" className="h-20 w-20 object-contain" />
          <span className="hidden font-display text-xl tracking-tight text-sage-800 sm:inline">
            Beauty by Nodiy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 font-body text-base text-sage-800 md:flex">
          <Link href="/" className="transition-colors hover:text-sage-600">
            Home
          </Link>

          {/* Behandelingen en tarieven — met dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdownDelayed}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              className="flex items-center gap-1.5 transition-colors hover:text-sage-600"
            >
              Behandelingen en tarieven
              <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-all duration-150 ${
                dropdownOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl bg-paper py-2 shadow-lg ring-1 ring-sage-100">
                {TREATMENT_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-[15px] text-sage-800 transition-colors hover:bg-sage-100"
                  >
                    <l.icon className="h-4 w-4 text-sage-500" />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className="transition-colors hover:text-sage-600">
            Contact
          </Link>
        </nav>

        <a
          href={`tel:${(phone || "").replace(/\s/g, "")}`}
          className="hidden rounded-full bg-sage-700 px-5 py-2 text-sm font-medium text-paper shadow-sm transition-colors hover:bg-sage-800 md:inline-block"
        >
          Bel: {phone}
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-sage-800 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-sage-200/70 bg-sage-50 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 text-[15px] text-sage-800">
          <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 transition-colors hover:bg-sage-100">
            Home
          </Link>

          <p className="mt-2 px-2 text-xs font-medium uppercase tracking-wide text-sage-500">Behandelingen en tarieven</p>
          {TREATMENT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-sage-100"
            >
              <l.icon className="h-4 w-4 text-sage-500" />
              {l.label}
            </Link>
          ))}

          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-lg px-2 py-2.5 transition-colors hover:bg-sage-100">
            Contact
          </Link>

          <a
            href={`tel:${(phone || "").replace(/\s/g, "")}`}
            className="mt-2 rounded-full bg-sage-700 px-5 py-2.5 text-center text-sm font-medium text-paper"
          >
            Bel: {phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
