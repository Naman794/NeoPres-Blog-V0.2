"use client";

import { useEffect, useState } from "react";

import { supabaseClient } from "@/lib/supabaseClient";

interface AdSlot {
  key: string;
  label: string;
  is_enabled: boolean;
  html: string | null;
  image_url: string | null;
  target_url: string | null;
}

const emptySlot: AdSlot = {
  key: "",
  label: "",
  is_enabled: true,
  html: "",
  image_url: "",
  target_url: "",
};

const AdSlotsManager = () => {
  const [slots, setSlots] = useState<AdSlot[]>([]);
  const [form, setForm] = useState<AdSlot>(emptySlot);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = async () => {
    const { data } = await supabaseClient
      .from("ad_slots")
      .select("key, label, is_enabled, html, image_url, target_url")
      .order("updated_at", { ascending: false });
    setSlots(data ?? []);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSubmit = async () => {
    setError(null);
    const { error: upsertError } = await supabaseClient.from("ad_slots").upsert(form);
    if (upsertError) {
      setError(upsertError.message);
      return;
    }
    setForm(emptySlot);
    fetchSlots();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Key
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={form.key}
              onChange={(event) => setForm({ ...form, key: event.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Label
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={form.label}
              onChange={(event) => setForm({ ...form, label: event.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Image URL
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={form.image_url ?? ""}
              onChange={(event) => setForm({ ...form, image_url: event.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Target URL
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={form.target_url ?? ""}
              onChange={(event) => setForm({ ...form, target_url: event.target.value })}
            />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.is_enabled}
            onChange={(event) => setForm({ ...form, is_enabled: event.target.checked })}
          />
          Enabled
        </label>
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            HTML
          </label>
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            rows={4}
            value={form.html ?? ""}
            onChange={(event) => setForm({ ...form, html: event.target.value })}
          />
        </div>
        <button
          className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          type="button"
          onClick={handleSubmit}
        >
          Save slot
        </button>
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {slots.map((slot) => (
          <div key={slot.key} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {slot.key}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">{slot.label}</p>
            <p className="mt-1 text-xs text-slate-500">
              {slot.is_enabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSlotsManager;
