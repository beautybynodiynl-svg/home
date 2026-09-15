import Link from "next/link";
import { IconLeaf, IconPin, IconPhone, IconMail } from "@/components/Icons";
import { TREATMENT_PAGES } from "@/lib/treatmentPages";

export default function Footer({ content }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sage-200/70 bg-sand-100">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-lg text-sage-800">
            <img src="/images/logo.png" alt="Beauty by Nodiy" className="h-10 w-10 object-contain" />
            Beauty by Nodiy
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">
            Allround schoonheidssalon in Nieuwegein. Persoonlijke aandacht, vakkundige behandelingen.
          </p>
        </div>

        <div className="text-sm text-ink/70">
          <p className="mb-3 font-medium text-sage-800">Behandelingen</p>
          <ul className="space-y-2.5">
            {TREATMENT_PAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/behandelingen/${p.slug}`} className="hover:text-sage-700">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/behandelingen-en-tarieven" className="text-sage-700 hover:text-sage-800">
                Alle tarieven →
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-ink/70">
          <p className="mb-3 font-medium text-sage-800">Contact</p>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
              <span>{content.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-sage-500" />
              <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`} className="hover:text-sage-700">
                {content.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 shrink-0 text-sage-500" />
              <a href={`mailto:${content.email}`} className="hover:text-sage-700">
                {content.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm text-ink/70">
          <p className="mb-3 font-medium text-sage-800">Openingsuren</p>
          <p className="text-ink/50">Bel of mail voor een afspraak — reageer meestal dezelfde dag.</p>
          <p className="mt-3 text-xs text-ink/40">Anbos-nr: {content.anbos_nr}</p>
        </div>
      </div>
      <div className="border-t border-sage-200/70 px-6 py-4 text-center text-xs text-ink/50">
        Copyright {year} © Beauty by Nodiy
      </div>
    </footer>
  );
}
