"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { PersonalizationData } from "@/lib/types";

export default function PersonalizationPage() {
  const [data, setData] = useState<PersonalizationData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/personalization").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="p-8 text-muted-foreground text-xs animate-pulse">Loading...</div>;

  const update = (path: string, value: unknown) => {
    const copy = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let obj = copy;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setData(copy);
  };

  const addFeature = () => setData({ ...data, features: [...data.features, { id: `pf${Date.now()}`, icon: "Sparkles", title: "New Feature", description: "Description" }] });
  const removeFeature = (i: number) => setData({ ...data, features: data.features.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/personalization", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Personalization saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Personalization</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the personalization features section</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Content</h3>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Category Label</label>
          <input className="input-modern" value={data.categoryLabel} onChange={(e) => update("categoryLabel", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
          <input className="input-modern" value={data.title} onChange={(e) => update("title", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
          <textarea className="input-modern" rows={2} value={data.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Features ({data.features.length})</h3>
          <button onClick={addFeature} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Feature</button>
        </div>
        {data.features.map((f, i) => (
          <div key={f.id} className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Feature {i + 1}</span>
              <button onClick={() => removeFeature(i)} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Icon</label>
                <input className="input-modern" value={f.icon} onChange={(e) => { const c = [...data.features]; c[i] = { ...c[i], icon: e.target.value }; setData({ ...data, features: c }); }} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Title</label>
                <input className="input-modern" value={f.title} onChange={(e) => { const c = [...data.features]; c[i] = { ...c[i], title: e.target.value }; setData({ ...data, features: c }); }} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
                <input className="input-modern" value={f.description} onChange={(e) => { const c = [...data.features]; c[i] = { ...c[i], description: e.target.value }; setData({ ...data, features: c }); }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
