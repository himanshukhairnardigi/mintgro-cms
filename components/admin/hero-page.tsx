"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { HeroData } from "@/lib/types";

export default function HeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json()).then(setData);
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

  const addBadge = () => setData({ ...data, trustBadges: [...data.trustBadges, "New badge"] });
  const removeBadge = (i: number) => setData({ ...data, trustBadges: data.trustBadges.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Hero saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Hero Section</h2>
          <p className="text-xs text-muted-foreground mt-1">Edit the main hero content, CTAs, and trust badges</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Content</h3>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Eyebrow</label>
          <input className="input-modern" value={data.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
          <input className="input-modern" value={data.title} onChange={(e) => update("title", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
          <textarea className="input-modern" rows={3} value={data.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Call-to-Actions</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Primary Label</label>
            <input className="input-modern" value={data.ctaPrimary.label} onChange={(e) => update("ctaPrimary.label", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Primary Href</label>
            <input className="input-modern" value={data.ctaPrimary.href} onChange={(e) => update("ctaPrimary.href", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Secondary Label</label>
            <input className="input-modern" value={data.ctaSecondary.label} onChange={(e) => update("ctaSecondary.label", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Secondary Href</label>
            <input className="input-modern" value={data.ctaSecondary.href} onChange={(e) => update("ctaSecondary.href", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Trust Badges</h3>
          <button onClick={addBadge} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Badge</button>
        </div>
        <div className="space-y-2">
          {data.trustBadges.map((badge: string, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <input className="input-modern flex-1" value={badge} onChange={(e) => { const c = [...data.trustBadges]; c[i] = e.target.value; setData({ ...data, trustBadges: c }); }} />
              <button onClick={() => removeBadge(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
