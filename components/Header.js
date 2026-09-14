"use client";

import Link from "next/link";
import { useState } from "react";
import { IconLeaf } from "@/components/Icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/behandelingen-en-tarieven", label: "Behandelingen en tarieven" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ phone }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-sage-200/70 bg-sage-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <img src="/images/logo.png" alt="Beauty by Nodiy" className="h-14 w-14 object-contain" />
          <span className="hidden font-display text-lg tracking-tight text-sage-800 sm:inline">
            Beauty by Nodiy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 font-body text-[15px] text-sage-800 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-sage-600">
              {l.label}
            </Link>
          ))}
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
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 text-[15px] text-sage-800">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 transition-colors hover:bg-sage-100"
            >
              {l.label}
            </Link>
          ))}
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
