import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Header phone={content.phone} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="font-display text-4xl leading-[1.1] text-sage-800 sm:text-5xl">
                {content.hero_title}
              </h1>
              <p className="mt-4 max-w-md text-lg text-ink/70">
                {content.hero_subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`tel:${(content.phone || "").replace(/\s/g, "")}`}
                  className="rounded-full bg-sage-700 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-sage-800"
                >
                  Bel: {content.phone}
                </a>
                <Link
                  href="/behandelingen-en-tarieven"
                  className="rounded-full border border-sage-700 px-6 py-3 text-sm font-medium text-sage-800 transition-colors hover:bg-sage-100"
                >
                  Behandelingen en tarieven
                </Link>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  fill="#CFE0C4"
                  d="M320.5,290.5Q291,381,193.5,347Q96,313,68,213.5Q40,114,135,73.5Q230,33,296,102.5Q362,172,320.5,290.5Z"
                />
                <path
                  fill="#8FB582"
                  opacity="0.55"
                  d="M270,260Q246,320,175,300Q104,280,100,205Q96,130,166,110Q236,90,268,155Q300,220,270,260Z"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-2xl italic text-sage-800">
                Nieuwegein
              </span>
            </div>
          </div>
        </section>

        {/* Diensten */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 sm:grid-cols-3">
            <ServiceCard
              title="Gezichtsbehandelingen"
              text="Van een basis gezichtsbehandeling tot aan micro dermabrasie en peeling. Dit is bij NoDiy mogelijk."
            />
            <ServiceCard
              title="Lichaam"
              text="Laserontharing, harsen, kruidenpeeling en meer. Benieuwd? Bel voor de mogelijkheden bij NoDiy."
            />
            <ServiceCard
              title="Medische pedicure"
              text="Vraag gerust naar de mogelijkheden. Bij een medische pedicure is intake verplicht."
            />
          </div>
        </section>

        {/* Over */}
        <section className="bg-sand-100">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-display text-3xl text-sage-800">
              Over Beauty by Nodiy
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/80">
              {content.about_text.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 font-display italic text-sage-700">
              {content.owner_name}
            </p>
            <p className="mt-1 text-sm text-ink/50">Anbos-nr: {content.anbos_nr}</p>
          </div>
        </section>
      </main>

      <Footer content={content} />
    </>
  );
}

function ServiceCard({ title, text }) {
  return (
    <div className="border-t-2 border-sage-300 pt-5">
      <h3 className="font-display text-xl text-sage-800">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}
