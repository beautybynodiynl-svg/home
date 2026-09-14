export default function Footer({ content }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sage-200/70 bg-sand-100">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-lg text-sage-800">Beauty by Nodiy</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/70">
            {content.address}
          </p>
        </div>
        <div className="text-sm text-ink/70 sm:text-right">
          <p>
            <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`} className="hover:text-sage-700">
              {content.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${content.email}`} className="hover:text-sage-700">
              {content.email}
            </a>
          </p>
          <p className="mt-2 text-xs text-ink/50">Anbos-nr: {content.anbos_nr}</p>
        </div>
      </div>
      <div className="border-t border-sage-200/70 px-6 py-4 text-center text-xs text-ink/50">
        Copyright {year} © Beauty by Nodiy
      </div>
    </footer>
  );
}
