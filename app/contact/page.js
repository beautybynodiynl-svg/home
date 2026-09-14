import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { getSiteContent } from "@/lib/content";
import { IconPin, IconPhone, IconMail, IconLeaf } from "@/components/Icons";

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
          <p className="mb-2 flex items-center gap-2 text-sm text-sage-600">
            <IconLeaf className="h-4 w-4" />
            We horen graag van je
          </p>
          <h1 className="font-display text-4xl text-sage-800">Contact</h1>
          <p className="mt-4 text-ink/70">
            Vragen? Stuur ons een bericht of bel ons.
          </p>

          <dl className="mt-8 space-y-5 text-[15px]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <IconPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <dt className="text-xs text-ink/50">Adres</dt>
                <dd className="text-ink">{content.address}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <IconPhone className="h-4.5 w-4.5" />
              </div>
              <div>
                <dt className="text-xs text-ink/50">Telefoon</dt>
                <dd>
                  <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`} className="text-sage-700 hover:underline">
                    {content.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <IconMail className="h-4.5 w-4.5" />
              </div>
              <div>
                <dt className="text-xs text-ink/50">E-mail</dt>
                <dd>
                  <a href={`mailto:${content.email}`} className="text-sage-700 hover:underline">
                    {content.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-sage-100 sm:p-8">
          <ContactForm />
        </div>
      </main>

      <Footer content={content} />
    </>
  );
}
