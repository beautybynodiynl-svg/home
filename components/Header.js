import Link from "next/link";

export default function Header({ phone }) {
  return (
    <header className="border-b border-sage-200/70">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-display text-xl tracking-tight text-sage-800">
          Beauty by Nodiy
        </Link>

        <nav className="flex items-center gap-6 font-body text-[15px] text-sage-800">
          <Link href="/" className="hover:text-sage-600">
            Home
          </Link>
          <Link href="/behandelingen-en-tarieven" className="hover:text-sage-600">
            Behandelingen en tarieven
          </Link>
          <Link href="/contact" className="hover:text-sage-600">
            Contact
          </Link>
        </nav>

        <a
          href={`tel:${(phone || "").replace(/\s/g, "")}`}
          className="rounded-full bg-sage-700 px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-sage-800"
        >
          Bel: {phone}
        </a>
      </div>
    </header>
  );
}
