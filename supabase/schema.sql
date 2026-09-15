-- Beauty by Nodiy — Supabase schema
-- Plak dit volledige bestand in het Supabase dashboard onder "SQL Editor" > "New query" en klik Run.

-- 1) Site-content: kleine stukjes tekst die op de site staan (hero, over-mij, contactgegevens)
create table if not exists site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- 2) Behandelingen: alle rijen uit "Behandelingen en tarieven"
create table if not exists treatments (
  id uuid primary key default gen_random_uuid(),
  category text not null,        -- bv. 'Gezicht', 'Lichaam', 'Laser behandeling'
  name text not null,
  price text not null,           -- tekstveld, zodat "€ 55,00" of "Starttarief: € 15,-" allebei kunnen
  duration text,                 -- bv. "45 minuten"
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3) Contactformulier-inzendingen
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

-- Row Level Security aanzetten
alter table site_content enable row level security;
alter table treatments enable row level security;
alter table contact_messages enable row level security;

-- Iedereen mag de site-content en behandelingen LEZEN (dat is de openbare website)
create policy "Publiek kan site_content lezen" on site_content
  for select using (true);

create policy "Publiek kan treatments lezen" on treatments
  for select using (true);

-- Alleen ingelogde gebruikers (Shabana, via /admin) mogen content AANPASSEN
create policy "Ingelogde gebruikers kunnen site_content aanpassen" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Ingelogde gebruikers kunnen treatments aanpassen" on treatments
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Iedereen mag het contactformulier INSTUREN, maar niet lezen
create policy "Publiek kan contactformulier insturen" on contact_messages
  for insert with check (true);

create policy "Ingelogde gebruikers kunnen berichten lezen" on contact_messages
  for select using (auth.role() = 'authenticated');

create policy "Ingelogde gebruikers kunnen berichten bijwerken" on contact_messages
  for update using (auth.role() = 'authenticated');

-- Startcontent invullen (de huidige teksten van de salon)
insert into site_content (key, value) values
  ('hero_title', 'Beauty by Nodiy'),
  ('hero_subtitle', 'Allround schoonheidssalon in Nieuwegein'),
  ('about_text', 'Beauty, schoonheid en verzorging zijn altijd al mijn grote passie geweest. Na jarenlang met kinderen te hebben gewerkt, besloot ik mijn hart te volgen en van mijn passie mijn beroep te maken. In 2013 startte ik de opleiding tot schoonheidsspecialiste aan het Beauty College van ROC Midden Nederland.

Al snel voelde ik me helemaal thuis in de wereld van beauty en huidverzorging. Naast mijn opleiding heb ik daarom verschillende aanvullende cursussen gevolgd om mijn kennis en vaardigheden verder uit te breiden. Zo heb ik diploma''s behaald voor onder andere specialisatie huidverbetering, specialisatie elektrisch ontharen / laserontharing, medische pedicure en visagie.

Tijdens mijn studie liep ik stage bij een schoonheidssalon, waar ik na mijn stage nog vier jaar ben blijven werken als schoonheidsspecialiste. In deze periode heb ik veel ervaring opgedaan en een fijne, trouwe klantenkring opgebouwd.

Na verloop van tijd besloot ik mijn droom waar te maken en mijn eigen salon te starten: Beauty by Nodiy. De naam van mijn salon is een combinatie van de namen van mijn twee zoontjes, Noah en Diyar.

Ik doe mijn werk met ontzettend veel plezier. Het mooiste aan mijn werk vind ik het contact met mensen: elke dag leer ik nieuwe persoonlijkheden kennen en ontstaan er fijne gesprekken tijdens de behandelingen.

Je bent van harte welkom om een keer langs te komen in mijn salon!'),
  ('owner_name', 'Shabana Osmany'),
  ('anbos_nr', '28657'),
  ('address', 'Koekoekslaan 2B, 3435 CL, Nieuwegein'),
  ('phone', '06 81517780'),
  ('whatsapp_number', '31681517780'),
  ('email', 'shabana@beautybynodiy.nl')
on conflict (key) do nothing;

-- Startbehandelingen invullen
insert into treatments (category, name, price, duration, description, sort_order) values
  ('Gezicht', 'Gezichtsbehandeling basis', '€ 55,00', '45 minuten', 'Reiniging, verwijderen onzuiverheden en masker', 1),
  ('Gezicht', 'Deepcleansing behandeling', '€ 60,00', '60 minuten', null, 2),
  ('Gezicht', 'Micro dermabrasie', '€ 65,00', '60 minuten', 'Reiniging, vapozone, verwijderen onzuiverheden, micro dermabrasie en masker', 3),
  ('Gezicht', 'Micro needling (dermapen)', '€ 85,00', '60 minuten', 'Reiniging, micro-needling, verkoelend masker en dagverzorging', 4),
  ('Gezicht', 'Ado Peeling', '€ 80,00', '60 minuten', 'Reiniging, vapozone, verwijderen onzuiverheden, peeling, masker en dagverzorging', 5),
  ('Gezicht', 'Micro dermabrasie + dermapen', '€ 95,00', '60 minuten', 'Reiniging, vapozone, verwijderen onzuiverheden, micro dermabrasie, dermapen en masker', 6),
  ('Gezicht', 'Micro dermabrasie + biopeeling', '€ 95,00', '70 minuten', 'Reiniging, vapozone, verwijderen onzuiverheden, micro dermabrasie, biopeeling', 7),
  ('Gezicht', 'Dermaplanning', '€ 70,00', '60 minuten', 'Reinigen, onzuiverheden verwijderen, dermaplanning, masker en dagverzorging', 8),
  ('Gezicht', 'Collageendraden + Dermapen', '€ 130,00', '75 minuten', 'Reinigen, onzuiverheden verwijderen, dermapen, collageendraden, masker en dagverzorging', 9),
  ('Gezicht', 'Hydrafacial', '€ 70,00', '60 minuten', 'Reinigen, onzuiverheden verwijderen, hydrafacial, masker en dagverzorging', 10),
  ('Gezicht', 'Oxygeneo', '€ 120,00', '55 minuten', 'Reinigen, onzuiverheden verwijderen, oxygeneo, masker en dagverzorging', 11),

  ('Medische pedicure', '1e consult (intake verplicht)', '€ 50,00', '45 minuten', null, 1),
  ('Medische pedicure', 'Medische pedicure behandeling', '€ 40,00', '30 minuten', null, 2),

  ('Lichaam', 'Harsen bovenlip', '€ 10,00', '15 minuten', null, 1),
  ('Lichaam', 'Harsen wenkbrauwen', '€ 15,00', '15 minuten', null, 2),
  ('Lichaam', 'Harsen bikinilijn of oksels', '€ 20,00', '20 minuten', null, 3),
  ('Lichaam', 'Harsen armen', '€ 30,00', '30 minuten', null, 4),
  ('Lichaam', 'Harsen onder- of bovenbeen', '€ 40,00', '30 minuten', null, 5),
  ('Lichaam', 'Harsen gezicht', '€ 25,00', '30 minuten', null, 6),
  ('Lichaam', 'Harsen Braziliaanse wax', '€ 45,00', '30 minuten', null, 7),
  ('Lichaam', 'Harsen hele benen', '€ 40,00', '40 minuten', null, 8),

  ('Verven', 'Verven wimpers of wenkbrauwen', '€ 15,00', '20 minuten', null, 1),
  ('Verven', 'Verven wimpers en wenkbrauwen', '€ 25,00', '20 minuten', null, 2),

  ('Laser behandeling', 'Tussen wenkbrauwen', '€ 10,00', '10 minuten', null, 1),
  ('Laser behandeling', 'Bakkebaarden', '€ 30,00', '15 minuten', null, 2),
  ('Laser behandeling', 'Bovenlip', '€ 30,00', '15 minuten', null, 3),
  ('Laser behandeling', 'Bovenlip en kin', '€ 40,00', '15 minuten', null, 4),
  ('Laser behandeling', 'Gezicht', '€ 75,00', '30 minuten', null, 5),
  ('Laser behandeling', 'Bovenarmen', '€ 90,00', '40 minuten', null, 6),
  ('Laser behandeling', 'Onderarmen', '€ 90,00', '40 minuten', null, 7),
  ('Laser behandeling', 'Hele armen', '€ 130,00', '45 minuten', null, 8),
  ('Laser behandeling', 'Oksels', '€ 65,00', '15 minuten', null, 9),
  ('Laser behandeling', 'Bikinilijn', '€ 60,00', '15 minuten', null, 10),
  ('Laser behandeling', 'Bikinilijn groot', '€ 100,00', '30 minuten', null, 11),
  ('Laser behandeling', 'Onderbenen', '€ 100,00', '30 minuten', null, 12),
  ('Laser behandeling', 'Bovenbenen', '€ 100,00', '30 minuten', null, 13),
  ('Laser behandeling', 'Hele benen', '€ 150,00', '40 minuten', null, 14),
  ('Laser behandeling', 'Buik', '€ 80,00', '30 minuten', null, 15),
  ('Laser behandeling', 'Billen', '€ 80,00', '30 minuten', null, 16),
  ('Laser behandeling', 'Hele rug', '€ 100,00', '30 minuten', null, 17),
  ('Laser behandeling', 'Hele lichaam', '€ 500,00', '120 minuten', null, 18),

  ('Laser pakketprijzen', 'Benen, bikinilijn, oksels en bovenlip', '€ 250,00', '60 minuten', null, 1),
  ('Laser pakketprijzen', 'Armen, oksels en bovenlip', '€ 200,00', '50 minuten', null, 2),
  ('Laser pakketprijzen', 'Onderbenen, bikinilijn, oksels en bovenlip', '€ 200,00', '15 minuten', null, 3),

  ('Elektrisch epileren', 'Starttarief', '€ 15,00', null, null, 1),
  ('Elektrisch epileren', 'Per minuut', '€ 2,00', null, null, 2)
on conflict do nothing;
