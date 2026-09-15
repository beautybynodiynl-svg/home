import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { getSiteContent, getTreatments, groupByCategory } from "@/lib/content";
import { TREATMENT_PAGES, getTreatmentPage } from "@/lib/treatmentPages";
import { IconFace, IconDroplet, IconFoot, IconSpark, IconCheck, IconLeaf, IconStar } from "@/components/Icons";

export const revalidate = 60;

const PAGE_ICONS = { face: IconFace, spark: IconSpark, foot: IconFoot };

export async function generateStaticParams() {
  return TREATMENT_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const page = getTreatmentPage(params.slug);
  if (!page) return {};
  return {
    title: `${page.name} — Beauty by Nodiy Nieuwegein`,
    description: page.heroSubtitle,
  };
}

export default async function TreatmentPage({ params }) {
  const page = getTreatmentPage(params.slug);
  if (!page) notFound();

  const [content, allTreatments] = await Promise.all([getSiteContent(), getTreatments()]);
  const relevant = allTreatments.filter((t) => page.categories.includes(t.category));
  const grouped = groupByCategory(relevant);
  const Icon = PAGE_ICONS[page.icon] || IconStar;
  const otherPages = TREATMENT_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Header phone={content.phone} />

      <main>
        {/* Hero met zachte, geanimeerde pastelvorm op de achtergrond */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-sage-200/50 animate-float-slow" />
            <span className="absolute right-10 top-16 h-20 w-20 rounded-full bg-sand-200/60 animate-float" />
            <span className="absolute bottom-4 left-1/3 h-14 w-14 rounded-full bg-sage-300/40 animate-float-slow" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700 animate-fade-up">
              <Icon className="h-8 w-8" />
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-sage-600 animate-fade-up [animation-delay:80ms]">
              <IconLeaf className="h-4 w-4" />
              Behandelingen bij Beauty by Nodiy
            </p>
            <h1 className="mt-2 text-center font-display text-4xl text-sage-800 sm:text-5xl animate-fade-up [animation-delay:140ms]">
              {page.heroTitle}
            </h1>
            <p className="mt-5 text-center text-lg text-ink/70 animate-fade-up [animation-delay:200ms]">
              {page.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:260ms]">
              <a
                href={`tel:${(content.phone || "").replace(/\s/g, "")}`}
                className="rounded-full bg-sage-700 px-6 py-3 text-sm font-medium text-paper shadow-sm transition-colors hover:bg-sage-800"
              >
                Bel: {content.phone}
              </a>
              <a
                href="#tarieven"
                className="rounded-full border border-sage-700 px-6 py-3 text-sm font-medium text-sage-800 transition-colors hover:bg-sage-100"
              >
                Bekijk tarieven
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-sand-100">
          <div className="mx-auto max-w-2xl px-6 py-14">
            <p className="text-[16.5px] leading-[1.85] text-ink/80">{page.intro}</p>
          </div>
        </section>

        {/* Voor wie */}
        <section className="mx-auto max-w-2xl px-6 py-14">
          <h2 className="font-display text-2xl text-sage-800">Voor wie is dit?</h2>
          <ul className="mt-6 space-y-3.5">
            {page.forWho.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink/75">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Wat kun je verwachten */}
        <section className="bg-sage-100/60">
          <div className="mx-auto max-w-2xl px-6 py-14">
            <h2 className="font-display text-2xl text-sage-800">Wat kun je verwachten</h2>
            <ul className="mt-6 space-y-3.5">
              {page.whatToExpect.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink/75">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Hoe het werkt */}
        <section className="mx-auto max-w-2xl px-6 py-14">
          <h2 className="font-display text-2xl text-sage-800">Hoe het werkt</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {page.steps.map((s, i) => (
              <div key={s.title}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sage-300 font-display text-[15px] text-sage-700">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg text-sage-800">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink/65">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live prijzen uit Supabase */}
        {Object.keys(grouped).length > 0 && (
          <section id="tarieven" className="scroll-mt-20 bg-sand-100">
            <div className="mx-auto max-w-2xl px-6 py-14">
              <h2 className="font-display text-2xl text-sage-800">Tarieven</h2>
              <div className="mt-8 space-y-10">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    {Object.keys(grouped).length > 1 && (
                      <h3 className="font-display text-lg text-sage-700">{category}</h3>
                    )}
                    <ul className="mt-3 divide-y divide-sage-200/70">
                      {items.map((item) => (
                        <li key={item.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <div className="min-w-0">
                            <p className="text-[15px] text-ink">{item.name}</p>
                            {item.description && <p className="mt-0.5 text-xs text-ink/55">{item.description}</p>}
                          </div>
                          <div className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0 sm:text-right">
                            <p className="font-display text-base text-sage-800">{item.price}</p>
                            {item.duration && <p className="text-xs text-ink/50">{item.duration}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/behandelingen-en-tarieven" className="mt-8 inline-block text-sm text-sage-700 underline underline-offset-2">
                Bekijk alle behandelingen en tarieven →
              </Link>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mx-auto max-w-2xl px-6 py-14">
          <h2 className="font-display text-2xl text-sage-800">Veelgestelde vragen</h2>
          <div className="mt-6">
            <FaqAccordion items={page.faqs} />
          </div>
        </section>

        {/* Andere behandelingen */}
        {otherPages.length > 0 && (
          <section className="bg-sage-100/60">
            <div className="mx-auto max-w-2xl px-6 py-14">
              <h2 className="font-display text-lg text-sage-800">Ook interessant</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {otherPages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/behandelingen/${p.slug}`}
                    className="rounded-full border border-sage-300 px-5 py-2.5 text-[14.5px] text-sage-800 transition-colors hover:border-sage-500 hover:bg-sage-100"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Eind-CTA */}
      <section className="bg-sand-100">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-6 px-6 py-14">
          <h2 className="font-display text-2xl text-sage-800">Klaar voor een afspraak?</h2>
          <div className="flex flex-wrap gap-3.5">
            <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`} className="rounded-full bg-sage-700 px-6 py-3 text-sm font-medium text-paper hover:bg-sage-800">
              Bel: {content.phone}
            </a>
            <Link href="/contact" className="rounded-full border border-sage-700 px-6 py-3 text-sm font-medium text-sage-800 hover:bg-sage-100">
              Stuur een bericht
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer content={content} />
    </>
  );
}
