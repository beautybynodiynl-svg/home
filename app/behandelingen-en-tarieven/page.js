import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent, getTreatments, groupByCategory } from "@/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Behandelingen en tarieven — Beauty by Nodiy",
};

export default async function TreatmentsPage() {
  const [content, treatments] = await Promise.all([
    getSiteContent(),
    getTreatments(),
  ]);
  const groups = groupByCategory(treatments);

  return (
    <>
      <Header phone={content.phone} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl text-sage-800">
          Behandelingen en tarieven
        </h1>

        <div className="mt-12 space-y-14">
          {Object.entries(groups).map(([category, items]) => (
            <section key={category}>
              <h2 className="font-display text-2xl text-sage-700">{category}</h2>
              <ul className="mt-5 divide-y divide-sage-200/70">
                {items.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                    <div>
                      <p className="text-[16px] text-ink">{item.name}</p>
                      {item.description && (
                        <p className="mt-1 text-sm text-ink/60">{item.description}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-lg text-sage-800">{item.price}</p>
                      {item.duration && (
                        <p className="text-sm text-ink/50">{item.duration}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {treatments.length === 0 && (
            <p className="text-ink/60">
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
