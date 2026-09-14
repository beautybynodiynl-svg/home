"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const CONTENT_FIELDS = [
  { key: "hero_title", label: "Titel op de homepage", type: "text" },
  { key: "hero_subtitle", label: "Ondertitel op de homepage", type: "text" },
  { key: "about_text", label: "Over-mij tekst", type: "textarea" },
  { key: "owner_name", label: "Naam eigenaar", type: "text" },
  { key: "anbos_nr", label: "Anbos-nummer", type: "text" },
  { key: "address", label: "Adres", type: "text" },
  { key: "phone", label: "Telefoonnummer", type: "text" },
  { key: "email", label: "E-mailadres", type: "text" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("teksten");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  if (checking) {
    return <p className="p-8 text-ink/50">Bezig met laden…</p>;
  }

  return (
    <main className="min-h-screen bg-sage-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl text-sage-800">Beheerpaneel</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-sage-300 px-4 py-2 text-sm text-sage-800 hover:bg-sage-100"
          >
            Uitloggen
          </button>
        </div>

        <div className="mt-8 flex gap-2 border-b border-sage-200">
          {["teksten", "behandelingen", "berichten"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize ${
                tab === t
                  ? "border-b-2 border-sage-700 text-sage-800"
                  : "text-ink/50 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "teksten" && <ContentEditor />}
          {tab === "behandelingen" && <TreatmentsEditor />}
          {tab === "berichten" && <MessagesList />}
        </div>
      </div>
    </main>
  );
}

function SavedBadge({ visible }) {
  if (!visible) return null;
  return <span className="ml-3 text-sm text-sage-600">Opgeslagen ✓</span>;
}

function ContentEditor() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [savedKey, setSavedKey] = useState("");

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, value")
      .then(({ data }) => {
        const map = {};
        (data || []).forEach((row) => (map[row.key] = row.value));
        setValues(map);
        setLoading(false);
      });
  }, []);

  async function saveField(key) {
    await supabase
      .from("site_content")
      .upsert({ key, value: values[key] || "", updated_at: new Date().toISOString() });
    setSavedKey(key);
    setTimeout(() => setSavedKey(""), 2000);
  }

  if (loading) return <p className="text-ink/50">Bezig met laden…</p>;

  return (
    <div className="space-y-8">
      {CONTENT_FIELDS.map((field) => (
        <div key={field.key} className="rounded-2xl bg-paper p-6">
          <label className="mb-2 block text-sm font-medium text-ink/70">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              rows={8}
              value={values[field.key] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.key]: e.target.value }))
              }
              className="w-full rounded-lg border border-sage-200 px-4 py-3 text-[15px] focus:border-sage-500"
            />
          ) : (
            <input
              type="text"
              value={values[field.key] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.key]: e.target.value }))
              }
              className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-[15px] focus:border-sage-500"
            />
          )}
          <div className="mt-3 flex items-center">
            <button
              onClick={() => saveField(field.key)}
              className="rounded-full bg-sage-700 px-5 py-2 text-sm font-medium text-paper hover:bg-sage-800"
            >
              Opslaan
            </button>
            <SavedBadge visible={savedKey === field.key} />
          </div>
        </div>
      ))}
    </div>
  );
}

const EMPTY_TREATMENT = {
  category: "",
  name: "",
  price: "",
  duration: "",
  description: "",
  sort_order: 0,
};

function TreatmentsEditor() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState(EMPTY_TREATMENT);

  async function load() {
    const { data } = await supabase
      .from("treatments")
      .select("*")
      .order("category")
      .order("sort_order");
    setTreatments(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function updateLocal(id, field, value) {
    setTreatments((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  async function saveRow(row) {
    await supabase
      .from("treatments")
      .update({
        category: row.category,
        name: row.name,
        price: row.price,
        duration: row.duration,
        description: row.description,
        sort_order: row.sort_order,
      })
      .eq("id", row.id);
  }

  async function deleteRow(id) {
    if (!confirm("Deze behandeling verwijderen?")) return;
    await supabase.from("treatments").delete().eq("id", id);
    load();
  }

  async function addRow() {
    if (!newItem.category || !newItem.name) return;
    await supabase.from("treatments").insert({
      ...newItem,
      sort_order: Number(newItem.sort_order) || 0,
    });
    setNewItem(EMPTY_TREATMENT);
    load();
  }

  if (loading) return <p className="text-ink/50">Bezig met laden…</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-paper p-6">
        <h2 className="font-display text-lg text-sage-800">
          Nieuwe behandeling toevoegen
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Categorie (bv. Gezicht)"
            value={newItem.category}
            onChange={(e) => setNewItem((v) => ({ ...v, category: e.target.value }))}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Naam behandeling"
            value={newItem.name}
            onChange={(e) => setNewItem((v) => ({ ...v, name: e.target.value }))}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Prijs (bv. € 55,00)"
            value={newItem.price}
            onChange={(e) => setNewItem((v) => ({ ...v, price: e.target.value }))}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Duur (bv. 45 minuten)"
            value={newItem.duration}
            onChange={(e) => setNewItem((v) => ({ ...v, duration: e.target.value }))}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Omschrijving (optioneel)"
            value={newItem.description}
            onChange={(e) => setNewItem((v) => ({ ...v, description: e.target.value }))}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm sm:col-span-2"
          />
        </div>
        <button
          onClick={addRow}
          className="mt-4 rounded-full bg-sage-700 px-5 py-2 text-sm font-medium text-paper hover:bg-sage-800"
        >
          Toevoegen
        </button>
      </div>

      <div className="space-y-3">
        {treatments.map((row) => (
          <div key={row.id} className="rounded-2xl bg-paper p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={row.category}
                onChange={(e) => updateLocal(row.id, "category", e.target.value)}
                className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
              />
              <input
                value={row.name}
                onChange={(e) => updateLocal(row.id, "name", e.target.value)}
                className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
              />
              <input
                value={row.price}
                onChange={(e) => updateLocal(row.id, "price", e.target.value)}
                className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
              />
              <input
                value={row.duration || ""}
                onChange={(e) => updateLocal(row.id, "duration", e.target.value)}
                className="rounded-lg border border-sage-200 px-3 py-2 text-sm"
              />
              <input
                value={row.description || ""}
                onChange={(e) => updateLocal(row.id, "description", e.target.value)}
                className="rounded-lg border border-sage-200 px-3 py-2 text-sm sm:col-span-2"
              />
            </div>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => saveRow(row)}
                className="rounded-full bg-sage-700 px-4 py-1.5 text-sm text-paper hover:bg-sage-800"
              >
                Opslaan
              </button>
              <button
                onClick={() => deleteRow(row.id)}
                className="rounded-full border border-red-300 px-4 py-1.5 text-sm text-red-700 hover:bg-red-50"
              >
                Verwijderen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setMessages(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-ink/50">Bezig met laden…</p>;
  if (messages.length === 0)
    return <p className="text-ink/50">Nog geen berichten binnengekomen.</p>;

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id} className="rounded-2xl bg-paper p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-medium text-ink">{m.name}</p>
            <p className="text-xs text-ink/40">
              {new Date(m.created_at).toLocaleString("nl-NL")}
            </p>
          </div>
          <p className="text-sm text-sage-700">{m.email}</p>
          {m.subject && <p className="mt-2 text-sm text-ink/70">Onderwerp: {m.subject}</p>}
          {m.message && <p className="mt-1 text-sm text-ink/70">{m.message}</p>}
        </div>
      ))}
    </div>
  );
}
