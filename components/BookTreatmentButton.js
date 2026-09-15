"use client";

import { useState } from "react";

function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20l1.2-3.6A8 8 0 1 1 8.6 19L4 20Z" />
      <circle cx="9" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function BookTreatmentButton({ treatmentName, price, whatsappNumber }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const lines = [
      "Hallo Beauty by Nodiy,",
      "",
      `Ik wil graag een afspraak aanvragen voor: ${treatmentName}${price ? ` (${price})` : ""}`,
      "",
      `Naam: ${name}`,
      `Telefoonnummer: ${phone}`,
      "",
      "Kunnen jullie mij een geschikt moment doorgeven?",
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const number = (whatsappNumber || "").replace(/[^\d]/g, "");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    setOpen(false);
    setName("");
    setPhone("");
  }

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Vraag afspraak aan voor ${treatmentName} via WhatsApp`}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          open ? "bg-sage-700 text-paper" : "bg-sage-100 text-sage-600 hover:bg-sage-200"
        }`}
      >
        <IconWhatsapp className="h-4 w-4" />
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute right-6 z-10 mt-2 w-64 rounded-xl bg-paper p-4 shadow-lg ring-1 ring-sage-100 sm:w-72"
        >
          <p className="text-xs text-ink/60">Afspraak aanvragen voor</p>
          <p className="text-[13.5px] font-medium text-sage-800">{treatmentName}</p>
          <input
            required
            type="text"
            placeholder="Je naam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3 w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
          <input
            required
            type="tel"
            placeholder="Telefoonnummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-sage-700 px-4 py-2 text-sm font-medium text-paper hover:bg-sage-800"
          >
            <IconWhatsapp className="h-4 w-4" />
            Aanvragen via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
