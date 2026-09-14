"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Inloggen mislukt. Controleer je e-mailadres en wachtwoord.");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sage-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-paper p-8 shadow-sm"
      >
        <h1 className="font-display text-2xl text-sage-800">Beheerpaneel</h1>
        <p className="mt-1 text-sm text-ink/60">Log in om de site te bewerken.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm text-ink/60">E-mailadres</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-[15px] focus:border-sage-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-ink/60">Wachtwoord</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-sage-200 px-4 py-2.5 text-[15px] focus:border-sage-500"
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-sage-700 px-6 py-2.5 text-sm font-medium text-paper hover:bg-sage-800 disabled:opacity-60"
        >
          {loading ? "Bezig…" : "Inloggen"}
        </button>
      </form>
    </main>
  );
}
