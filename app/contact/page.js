import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { getSiteContent } from "@/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Contact — Beauty by Nodiy",
};

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <>
      <Header phone={content.phone} />

      <main className="mx-auto grid max-w-4xl gap-12 px-6 py-16 sm:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl text-sage-800">Contact</h1>
          <p className="mt-4 text-ink/70">
            Vragen? Stuur ons een bericht of bel ons.
          </p>

          <dl className="mt-8 space-y-4 text-[15px]">
            <div>
              <dt className="text-ink/50">Adres</dt>
              <dd className="text-ink">{content.address}</dd>
            </div>
            <div>
              <dt className="text-ink/50">Telefoon</dt>
              <dd>
                <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`} className="text-sage-700 hover:underline">
                  {content.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink/50">E-mail</dt>
              <dd>
                <a href={`mailto:${content.email}`} className="text-sage-700 hover:underline">
                  {content.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </main>

      <Footer content={content} />
    </>
  );
}
