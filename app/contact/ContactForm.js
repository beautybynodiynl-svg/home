"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-sage-100 p-6 text-sage-800">
        <p className="font-display text-lg">Bedankt voor je bericht!</p>
        <p className="mt-2 text-sm text-sage-700">
          We nemen zo snel mogelijk contact met je op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Je naam">
        <input
          required
          type="text"
          value={form.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-sage-200 bg-paper px-4 py-3 text-[15px] focus:border-sage-500"
        />
      </Field>
      <Field label="Je e-mailadres">
        <input
          required
          type="email"
          value={form.email}
          onChange={update("email")}
          className="w-full rounded-lg border border-sage-200 bg-paper px-4 py-3 text-[15px] focus:border-sage-500"
        />
      </Field>
      <Field label="Onderwerp">
        <input
          type="text"
          value={form.subject}
          onChange={update("subject")}
          className="w-full rounded-lg border border-sage-200 bg-paper px-4 py-3 text-[15px] focus:border-sage-500"
        />
      </Field>
      <Field label="Je bericht (optioneel)">
        <textarea
          rows={4}
          value={form.message}
          onChange={update("message")}
          className="w-full rounded-lg border border-sage-200 bg-paper px-4 py-3 text-[15px] focus:border-sage-500"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-sage-700 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-sage-800 disabled:opacity-60"
      >
        {status === "sending" ? "Bezig met versturen…" : "Verstuur bericht"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons direct.
        </p>
      )}
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-ink/60">{label}</span>
      {children}
    </label>
  );
}
