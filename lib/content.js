import { supabase } from "@/lib/supabaseClient";

// Fallback content, gebruikt zolang Supabase nog niet is ingesteld of leeg is.
const FALLBACK = {
  hero_title: "Beauty by Nodiy",
  hero_subtitle: "Allround schoonheidssalon in Nieuwegein",
  about_text:
    "Beauty, schoonheid en verzorging zijn altijd al mijn grote passie geweest.",
  owner_name: "Shabana Osmany",
  anbos_nr: "28657",
  address: "Koekoekslaan 2B, 3435 CL, Nieuwegein",
  phone: "06 81517780",
  email: "shabana@beautybynodiy.nl",
};

export async function getSiteContent() {
  try {
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error || !data || data.length === 0) return FALLBACK;
    const map = { ...FALLBACK };
    for (const row of data) map[row.key] = row.value;
    return map;
  } catch {
    return FALLBACK;
  }
}

export async function getTreatments() {
  try {
    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// De originele volgorde waarin de categorieën op de site moeten staan
// (zoals aangeleverd), onafhankelijk van de alfabetische volgorde uit de database.
const CATEGORY_ORDER = [
  "Gezicht",
  "Medische pedicure",
  "Lichaam",
  "Verven",
  "Laser behandeling",
  "Laser pakketprijzen",
  "Elektrisch epileren",
];

export function groupByCategory(treatments) {
  const groups = {};
  for (const t of treatments) {
    if (!groups[t.category]) groups[t.category] = [];
    groups[t.category].push(t);
  }
  // Sorteer de categorieën op de vaste volgorde; onbekende categorieën (bv.
  // handmatig toegevoegd via het beheerpaneel) komen achteraan, alfabetisch.
  const known = CATEGORY_ORDER.filter((c) => groups[c]);
  const unknown = Object.keys(groups)
    .filter((c) => !CATEGORY_ORDER.includes(c))
    .sort();
  const orderedEntries = {};
  for (const key of [...known, ...unknown]) {
    orderedEntries[key] = groups[key];
  }
  return orderedEntries;
}
