"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { IndustryData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

const ICON_OPTIONS = [
  "HeartPulse",
  "GraduationCap",
  "BriefcaseBusiness",
  "ShoppingBag",
  "Factory",
  "Building2",
  "Car",
  "Leaf",
  "Utensils",
  "Plane",
  "Wifi",
  "Shield",
] as const;

export default function IndustriesPage() {
  const [data, setData] = useState<IndustryData[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/industries")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load industries data");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const update = useCallback(
    (index: number, field: keyof IndustryData, value: string) => {
      if (!data) return;
      const next = [...data];
      next[index] = { ...next[index], [field]: value };
      setData(next);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/industries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Industries saved" });
    } catch (e) {
      setToast({ show: true, message: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const addIndustry = () => {
    if (!data) return;
    setData([
      ...data,
      { id: crypto.randomUUID(), icon: "Building2", name: "", desc: "" },
    ]);
  };

  const removeIndustry = (index: number) => {
    if (!data) return;
    setData(data.filter((_, i) => i !== index));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Industries</h1>
          <p className="text-muted-foreground mt-1">Manage industry cards shown on the site.</p>
        </div>
        <div className="self-start">
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((industry, i) => (
          <div key={industry.id} className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Industry {i + 1}</h3>
              <button onClick={() => removeIndustry(i)} className="btn-ghost text-destructive p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="text-xs text-muted-foreground block mb-1">Icon</label>
              <select
                value={industry.icon}
                onChange={(e) => update(i, "icon", e.target.value)}
                className="select-modern w-full"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label className="text-xs text-muted-foreground block mb-1">Name</label>
              <input
                type="text"
                value={industry.name}
                onChange={(e) => update(i, "name", e.target.value)}
                className="input-modern w-full"
              />
              <label className="text-xs text-muted-foreground block mb-1">Description</label>
              <input
                type="text"
                value={industry.desc}
                onChange={(e) => update(i, "desc", e.target.value)}
                className="input-modern w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={addIndustry} className="btn-secondary flex items-center gap-2 text-sm">
        <Plus className="w-4 h-4" />
        Add Industry
      </button>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
