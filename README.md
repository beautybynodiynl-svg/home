# Beauty by Nodiy — nieuwe website

Een nieuwe, moderne website voor Beauty by Nodiy, gebouwd met Next.js, Supabase (backend/database) en klaar om te hosten op Vercel. Alle teksten, behandelingen en prijzen zijn straks aan te passen via een eigen beheerpaneel op `/admin` — geen developer meer nodig.

Deze handleiding is geschreven voor iemand zonder programmeerervaring. Volg de stappen op volgorde.

## Wat je gaat doen (in het kort)

1. Een gratis Supabase-project aanmaken (de database)
2. De tabellen aanmaken met het meegeleverde SQL-bestand
3. Een inlogaccount aanmaken voor het beheerpaneel
4. De website naar GitHub zetten
5. De website hosten via Vercel (gratis)

---

## Stap 1 — Supabase-project aanmaken

1. Ga naar **[supabase.com](https://supabase.com)** en maak een gratis account aan (kan met je Google-account).
2. Klik op **New project**.
3. Kies een naam, bijvoorbeeld `beauty-by-nodiy`, en een sterk database-wachtwoord (bewaar dit ergens veilig).
4. Kies een regio dicht bij Nederland, bijvoorbeeld **Frankfurt (eu-central-1)**.
5. Klik op **Create new project** en wacht tot deze klaar is (ca. 1-2 minuten).

## Stap 2 — Database-tabellen aanmaken

1. Ga in het Supabase-dashboard naar **SQL Editor** (in het menu links).
2. Klik op **New query**.
3. Open het bestand `supabase/schema.sql` uit dit project, kopieer de hele inhoud, en plak dit in de SQL Editor.
4. Klik op **Run**. Als het goed is zie je "Success. No rows returned" — dan zijn de tabellen en de bestaande teksten/behandelingen aangemaakt.

## Stap 3 — Een inlogaccount maken voor het beheerpaneel

1. Ga naar **Authentication** > **Users** in het Supabase-menu.
2. Klik op **Add user** > **Create new user**.
3. Vul het e-mailadres in waarmee je wilt inloggen (bijvoorbeeld `shabana@beautybynodiy.nl`) en een wachtwoord.
4. Vink **Auto Confirm User** aan, zodat je direct kan inloggen.
5. Klik op **Create user**.

Dit e-mailadres en wachtwoord gebruik je straks om in te loggen op `jouwsite.nl/admin`.

## Stap 4 — API-sleutels ophalen

1. Ga naar **Project Settings** (tandwiel-icoon) > **API**.
2. Kopieer de **Project URL** en de **anon public key** — deze heb je zo nodig.

## Stap 5 — Project naar GitHub zetten

1. Maak (indien nodig) een gratis account op **[github.com](https://github.com)**.
2. Maak een nieuwe, lege repository aan, bijvoorbeeld `beauty-by-nodiy`.
3. Upload de bestanden uit dit project naar die repository (via de GitHub-website kan dat met "Upload files", of via git als je dat kent).

## Stap 6 — Hosten op Vercel

1. Ga naar **[vercel.com](https://vercel.com)** en maak een gratis account (inloggen met GitHub kan direct).
2. Klik op **Add New** > **Project**, en kies de GitHub-repository die je net hebt aangemaakt.
3. Bij **Environment Variables**, voeg twee variabelen toe:
   - `NEXT_PUBLIC_SUPABASE_URL` → plak hier de Project URL uit stap 4
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → plak hier de anon public key uit stap 4
4. Klik op **Deploy**. Na ongeveer een minuut is de site live op een adres als `beauty-by-nodiy.vercel.app`.

## Stap 7 — Eigen domein koppelen (beautybynodiy.nl)

1. Ga in Vercel naar je project > **Settings** > **Domains**.
2. Voeg `beautybynodiy.nl` toe.
3. Vercel laat zien welke DNS-instellingen je moet aanpassen bij je domeinregistrar (waar je het domein hebt gekocht/beheert). Meestal gaat het om het aanpassen van een A-record of CNAME-record.
4. Na het aanpassen kan het tot enkele uren duren voordat het domein overal werkt.

---

## De site beheren (dagelijks gebruik)

Ga naar **jouwsite.nl/admin**, log in met het account uit stap 3, en je komt in het beheerpaneel met drie tabbladen:

- **Teksten** — de titel op de homepage, de "over mij"-tekst, adresgegevens, telefoonnummer en e-mailadres
- **Behandelingen** — hier kun je behandelingen toevoegen, aanpassen (naam, prijs, duur, omschrijving) of verwijderen
- **Berichten** — hier zie je alle berichten die binnenkomen via het contactformulier

Wijzigingen zijn direct zichtbaar op de website (het kan tot 1 minuut duren voor de wijziging zichtbaar is, door caching).

---

## Lokaal ontwikkelen (optioneel, alleen nodig als je zelf verder wilt bouwen)

```bash
npm install
cp .env.local.example .env.local
# vul .env.local in met je Supabase-gegevens
npm run dev
```

De site draait dan op `http://localhost:3000`.

---

## Projectstructuur

```
app/
  page.js                          → Homepage
  behandelingen-en-tarieven/       → Behandelingen & tarieven
  contact/                         → Contactpagina + formulier
  admin/                           → Login + beheerpaneel
components/                        → Header, Footer
lib/                                → Supabase-verbinding en data-functies
supabase/schema.sql                → Database-structuur + startdata
```
