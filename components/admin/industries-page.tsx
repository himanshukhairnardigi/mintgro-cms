"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, X } from "lucide-react";
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
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/industries")
      .then((r) => r.json())
      .then(setData);
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
    await fetch("/api/industries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "Industries saved" });
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

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="shimmer w-48 h-8 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Industries</h1>
          <p className="text-muted-foreground mt-1">Manage industry cards shown on the site.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="space-y-4">
        {data.map((industry, i) => (
          <div key={industry.id} className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Industry {i + 1}</h3>
              <button onClick={() => removeIndustry(i)} className="btn-ghost text-destructive p-2">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Icon</label>
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
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Name</label>
                <input
                  type="text"
                  value={industry.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  className="input-modern w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Description</label>
                <input
                  type="text"
                  value={industry.desc}
                  onChange={(e) => update(i, "desc", e.target.value)}
                  className="input-modern w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addIndustry} className="btn-secondary flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Industry
      </button>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
