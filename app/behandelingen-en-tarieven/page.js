import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookTreatmentButton from "@/components/BookTreatmentButton";
import { getSiteContent, getTreatments, groupByCategory } from "@/lib/content";
import { IconFace, IconFoot, IconDroplet, IconSpark, IconLeaf } from "@/components/Icons";

export const revalidate = 60;

export const metadata = {
  title: "Behandelingen en tarieven — Beauty by Nodiy",
};

const CATEGORY_ICONS = {
  "Gezicht": IconFace,
  "Medische pedicure": IconFoot,
  "Lichaam": IconDroplet,
  "Verven": IconLeaf,
  "Laser behandeling": IconSpark,
  "Laser pakketprijzen": IconSpark,
  "Elektrisch epileren": IconSpark,
};

export default async function TreatmentsPage() {
  const [content, treatments] = await Promise.all([
    getSiteContent(),
    getTreatments(),
  ]);
  const groups = groupByCategory(treatments);
  const categories = Object.entries(groups);

  return (
    <>
      <Header phone={content.phone} />

      <main className="relative overflow-hidden">
        {/* zachte achtergrondrondjes, subtiel, alleen zichtbaar boven aan de pagina */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
          <span className="absolute -left-8 top-6 h-28 w-28 rounded-full bg-sage-200/50 animate-float-slow" />
          <span className="absolute right-10 top-2 h-16 w-16 rounded-full bg-sand-200/60 animate-float" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-16">
          <p className="mb-2 flex items-center gap-2 text-sm text-sage-600 animate-fade-up">
            <IconLeaf className="h-4 w-4" />
            Prijzen en behandelduur
          </p>
          <h1 className="font-display text-4xl text-sage-800 animate-fade-up [animation-delay:80ms]">
            Behandelingen en tarieven
          </h1>
          <p className="mt-3 max-w-lg text-ink/60 animate-fade-up [animation-delay:140ms]">
            Kies een categorie om te zien wat we doen en wat het kost. Alle prijzen zijn inclusief btw.
          </p>

          {/* Categorie-overzicht: sprong-links, super overzichtelijk op mobiel */}
          <nav className="mt-8 flex flex-wrap gap-2 animate-fade-up [animation-delay:180ms]">
            {categories.map(([category]) => {
              const Icon = CATEGORY_ICONS[category] || IconLeaf;
              return (
                <a
                  key={category}
                  href={`#${slugify(category)}`}
                  className="flex items-center gap-1.5 rounded-full border border-sage-200 bg-paper px-4 py-2 text-sm text-sage-800 transition-colors hover:border-sage-400 hover:bg-sage-100"
                >
                  <Icon className="h-4 w-4 text-sage-500" />
                  {category}
                </a>
              );
            })}
          </nav>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map(([category, items], i) => {
              const Icon = CATEGORY_ICONS[category] || IconLeaf;
              return (
                <section
                  key={category}
                  id={slugify(category)}
                  className="scroll-mt-24 rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-sage-100 transition-shadow animate-fade-up hover:shadow-md sm:p-7"
                  style={{ animationDelay: `${Math.min(i, 6) * 60 + 200}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl text-sage-800">{category}</h2>
                  </div>
                  <ul className="mt-4 divide-y divide-sage-100">
                    {items.map((item) => (
                      <li key={item.id} className="relative flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="text-[15px] text-ink">{item.name}</p>
                          {item.description && (
                            <p className="mt-0.5 text-xs text-ink/55">{item.description}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <div className="text-right">
                            <p className="font-display text-base text-sage-800">{item.price}</p>
                            {item.duration && (
                              <p className="text-xs text-ink/50">{item.duration}</p>
                            )}
                          </div>
                          <BookTreatmentButton treatmentName={item.name} price={item.price} whatsappNumber={content.whatsapp_number} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {treatments.length === 0 && (
            <p className="mt-10 text-ink/60">
              Er zijn nog geen behandelingen ingevuld. Voeg ze toe via het{" "}
              <a href="/admin" className="underline">
                beheerpaneel
              </a>
              .
            </p>
          )}
        </div>
      </main>

      <Footer content={content} />
    </>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
