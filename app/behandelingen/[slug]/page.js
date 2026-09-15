import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { getSiteContent, getTreatments, groupByCategory } from "@/lib/content";
import { TREATMENT_PAGES, getTreatmentPage } from "@/lib/treatmentPages";
import { IconFace, IconDroplet, IconFoot, IconSpark, IconCheck, IconLeaf, IconStar, IconHeart } from "@/components/Icons";

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

function splitIntoParagraphs(text) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function TreatmentPage({ params }) {
  const page = getTreatmentPage(params.slug);
  if (!page) notFound();

  const [content, allTreatments] = await Promise.all([getSiteContent(), getTreatments()]);
  const relevant = allTreatments.filter((t) => page.categories.includes(t.category));
  const grouped = groupByCategory(relevant);
  const Icon = PAGE_ICONS[page.icon] || IconStar;
  const otherPages = TREATMENT_PAGES.filter((p) => p.slug !== page.slug);
  const [leadParagraph, ...restParagraphs] = splitIntoParagraphs(page.intro);

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

          <svg className="relative block w-full text-sand-100" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path fill="currentColor" d="M0,32 C360,0 1080,64 1440,24 L1440,60 L0,60 Z" />
          </svg>
        </section>

        {/* Intro — met organische blob-illustratie, zoals de "Over"-sectie op de homepage */}
        <section className="bg-sand-100">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="relative mx-auto w-full max-w-[260px] lg:sticky lg:top-24">
                <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
                  <path
                    fill="#CFE0C4"
                    d="M320.5,290.5Q291,381,193.5,347Q96,313,68,213.5Q40,114,135,73.5Q230,33,296,102.5Q362,172,320.5,290.5Z"
                  />
                  <path
                    fill="#8FB582"
                    opacity="0.5"
                    d="M270,260Q246,320,175,300Q104,280,100,205Q96,130,166,110Q236,90,268,155Q300,220,270,260Z"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-14 w-14 text-sage-800" />
                </div>
                <span className="absolute -right-2 top-4 h-6 w-6 rounded-full bg-sand-200 animate-float" />
                <span className="absolute -left-2 bottom-8 h-8 w-8 rounded-full bg-sage-300/70 animate-float-slow" />
              </div>

              <div>
                <p className="font-display text-xl italic leading-snug text-sage-800">{leadParagraph}</p>
                <div className="mt-5 max-w-[62ch] space-y-4 text-[15.5px] leading-[1.85] text-ink/75">
                  {restParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voor wie — icoon-kaartjes i.p.v. platte lijst */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-center gap-2.5">
            <IconHeart className="h-5 w-5 text-sage-500" />
            <h2 className="font-display text-2xl text-sage-800">Voor wie is dit?</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.forWho.map((t) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-sage-100">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <IconCheck className="h-3.5 w-3.5" />
                </div>
                <p className="text-[15px] text-ink/75">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wat kun je verwachten */}
        <section className="relative overflow-hidden bg-sage-100/60">
          <svg className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 text-sage-200/70" viewBox="0 0 200 200" aria-hidden="true">
            <path fill="currentColor" d="M141,7Q173,45,168,90Q163,135,124,159Q85,183,48,157Q11,131,17,85Q23,39,64,17Q105,-5,141,7Z" />
          </svg>
          <div className="relative mx-auto max-w-5xl px-6 py-16">
            <div className="flex items-center gap-2.5">
              <IconDroplet className="h-5 w-5 text-sage-500" />
              <h2 className="font-display text-2xl text-sage-800">Wat kun je verwachten</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {page.whatToExpect.map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-sage-100">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <IconCheck className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[15px] text-ink/75">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hoe het werkt — met verbindend gestippeld lijntje tussen de stappen */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl text-sage-800">Hoe het werkt</h2>
          <div className="relative mt-10">
            <svg
              className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-4 w-full sm:block"
              viewBox="0 0 600 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="60" y1="8" x2="540" y2="8" stroke="#AFC9A4" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
            </svg>
            <div className="relative grid gap-8 sm:grid-cols-3">
              {page.steps.map((s, i) => (
                <div key={s.title}>
                  <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-sage-300 bg-sand-100 font-display text-[15px] text-sage-700 sm:bg-paper">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-display text-lg text-sage-800">{s.title}</h3>
                  <p className="mt-1.5 text-[14.5px] text-ink/65">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live prijzen uit Supabase */}
        {Object.keys(grouped).length > 0 && (
          <section id="tarieven" className="scroll-mt-20 bg-sand-100">
            <div className="mx-auto max-w-2xl px-6 py-16">
              <h2 className="font-display text-2xl text-sage-800">Tarieven</h2>
              <div className="mt-8 space-y-6">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-sage-100 sm:p-7">
                    {Object.keys(grouped).length > 1 && (
                      <h3 className="font-display text-lg text-sage-700">{category}</h3>
                    )}
                    <ul className="mt-3 divide-y divide-sage-100">
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
        <section className="mx-auto max-w-2xl px-6 py-16">
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
