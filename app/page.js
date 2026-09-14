import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";
import { IconFace, IconDroplet, IconFoot, IconHeart, IconStar, IconClock, IconSpark } from "@/components/Icons";
import HeroVideo from "@/components/HeroVideo";
import { formatStory } from "@/lib/formatStory";

export const revalidate = 60;

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Header phone={content.phone} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Zwevende pastelgroene rondjes op de achtergrond */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-sage-200/60 blur-sm animate-float-slow" />
            <span className="absolute left-1/3 top-0 h-16 w-16 rounded-full bg-sand-200/70 animate-float" />
            <span className="absolute right-10 top-24 h-24 w-24 rounded-full bg-sage-300/50 animate-float-slow" style={{ animationDelay: "1.2s" }} />
            <span className="absolute bottom-10 left-16 h-10 w-10 rounded-full bg-sage-400/40 animate-float" style={{ animationDelay: "0.6s" }} />
            <span className="absolute bottom-24 right-1/3 h-14 w-14 rounded-full bg-sand-200/60 animate-float-slow" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm text-sage-600 animate-fade-up [animation-delay:0ms]">
                <IconStar className="h-4 w-4" />
                Allround schoonheidssalon
              </p>
              <h1 className="font-display text-4xl leading-[1.1] text-gradient-sage sm:text-5xl animate-fade-up [animation-delay:100ms]">
                {content.hero_title}
              </h1>
              <p className="mt-4 max-w-md text-lg text-ink/70 animate-fade-up [animation-delay:200ms]">
                {content.hero_subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-up [animation-delay:300ms]">
                <a
                  href={`tel:${(content.phone || "").replace(/\s/g, "")}`}
                  className="rounded-full bg-sage-700 px-6 py-3 text-sm font-medium text-paper shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sage-800 hover:shadow-md"
                >
                  Bel: {content.phone}
                </a>
                <Link
                  href="/behandelingen-en-tarieven"
                  className="rounded-full border border-sage-700 px-6 py-3 text-sm font-medium text-sage-800 transition-all hover:-translate-y-0.5 hover:bg-sage-100"
                >
                  Behandelingen en tarieven
                </Link>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm animate-fade-up [animation-delay:250ms]">
              <div
                className="h-full w-full overflow-hidden shadow-lg ring-4 ring-paper"
                style={{ borderRadius: "63% 37% 54% 46% / 43% 47% 53% 57%" }}
              >
                <HeroVideo />
              </div>
              {/* extra zwevende rondjes rond de video */}
              <span className="absolute -right-4 top-6 h-6 w-6 rounded-full bg-sand-200 animate-float" />
              <span className="absolute -left-3 bottom-10 h-8 w-8 rounded-full bg-sage-300/70 animate-float-slow" />
              <span className="absolute -bottom-4 right-10 h-10 w-10 rounded-full bg-sage-200/60 animate-float" style={{ animationDelay: "0.8s" }} />
            </div>
          </div>

          <svg
            className="relative block w-full text-sand-100"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M0,32 C360,0 1080,64 1440,24 L1440,60 L0,60 Z" />
          </svg>
        </section>

        {/* Diensten */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <ServiceCard
              icon={<IconFace className="h-7 w-7" />}
              title="Gezichtsbehandelingen"
              text="Van een basis gezichtsbehandeling tot aan micro dermabrasie en peeling. Dit is bij NoDiy mogelijk."
            />
            <ServiceCard
              icon={<IconSpark className="h-7 w-7" />}
              title="Lichaam"
              text="Laserontharing, harsen, kruidenpeeling en meer. Benieuwd? Bel voor de mogelijkheden bij NoDiy."
            />
            <ServiceCard
              icon={<IconFoot className="h-7 w-7" />}
              title="Medische pedicure"
              text="Vraag gerust naar de mogelijkheden. Bij een medische pedicure is intake verplicht."
            />
          </div>
        </section>

        {/* Waarom */}
        <section className="bg-sage-100/60">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="font-display text-2xl text-sage-800">Waarom Beauty by Nodiy</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <Feature
                icon={<IconHeart className="h-6 w-6" />}
                title="Persoonlijke aandacht"
                text="Elke behandeling begint met een goed gesprek — jouw wensen en huid staan centraal."
              />
              <Feature
                icon={<IconDroplet className="h-6 w-6" />}
                title="Vakkundig opgeleid"
                text="Gediplomeerd in huidverbetering, laserontharing, medische pedicure en visagie."
              />
              <Feature
                icon={<IconClock className="h-6 w-6" />}
                title="Dicht bij huis"
                text="Gevestigd in Nieuwegein, makkelijk te bereiken en snel een afspraak te plannen."
              />
            </div>
          </div>
        </section>

        {/* Over */}
        <section className="bg-sand-100">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="mb-2 flex items-center gap-2 text-sm text-sage-600 animate-fade-up">
              <IconHeart className="h-4 w-4" />
              Het verhaal achter de salon
            </p>
            <h2 className="font-display text-3xl text-sage-800 animate-fade-up [animation-delay:60ms]">
              Over Beauty by Nodiy
            </h2>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              {/* Foto in een zacht, organisch kader */}
              <div className="relative mx-auto w-full max-w-xs animate-fade-up [animation-delay:120ms] lg:sticky lg:top-24">
                <div className="pointer-events-none absolute -inset-4 -z-10">
                  <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
                    <path
                      fill="#CFE0C4"
                      d="M323,288Q296,376,199,349Q102,322,72,214Q42,106,140,72Q238,38,297,110Q356,182,323,288Z"
                    />
                  </svg>
                </div>
                <div className="overflow-hidden rounded-[2.5rem] shadow-lg ring-4 ring-paper">
                  <img
                    src="/images/shabana.webp"
                    alt="Shabana Osmany, eigenaresse van Beauty by Nodiy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-3 -right-3 h-9 w-9 rounded-full bg-sage-300/70 animate-float" />
                <span className="absolute -top-3 left-8 h-6 w-6 rounded-full bg-sand-200 animate-float-slow" />
              </div>

              <div className="animate-fade-up [animation-delay:180ms]">
                {(() => {
                  const { lead, paragraphs } = formatStory(content.about_text);
                  return (
                    <>
                      <p className="font-display text-2xl italic leading-snug text-sage-800">
                        {lead}
                      </p>
                      <div className="mt-5 max-w-[62ch] space-y-4 text-[16px] leading-[1.85] text-ink/75">
                        {paragraphs.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </>
                  );
                })()}
                <div className="mt-8 flex items-center gap-4 border-t border-sage-200 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 font-display text-lg text-sage-700">
                    {initials(content.owner_name)}
                  </div>
                  <div>
                    <p className="font-display text-lg text-sage-800">{content.owner_name}</p>
                    <p className="text-sm text-ink/50">Anbos-nr: {content.anbos_nr}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer content={content} />
    </>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-sage-100 transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-200">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-xl text-sage-800">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}

function initials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Feature({ icon, title, text }) {
  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-sage-600 shadow-sm">
        {icon}
      </div>
      <h3 className="mt-3 font-display text-lg text-sage-800">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink/65">{text}</p>
    </div>
  );
}
