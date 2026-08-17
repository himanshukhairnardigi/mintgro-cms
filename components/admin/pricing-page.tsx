"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X, Star } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { PricingData } from "@/lib/types";

export default function PricingPage() {
  const [data, setData] = useState<PricingData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then(setData);
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

  const addTier = () => setData({ ...data, tiers: [...data.tiers, { id: `p${Date.now()}`, name: "New Tier", price: 0, priceLabel: "per user / month", desc: "Description", features: [], cta: "Get Started", popular: false }] });
  const removeTier = (i: number) => setData({ ...data, tiers: data.tiers.filter((_, idx) => idx !== i) });
  const addFeature = (tierIdx: number) => {
    const copy = JSON.parse(JSON.stringify(data));
    copy.tiers[tierIdx].features.push("New feature");
    setData(copy);
  };
  const removeFeature = (tierIdx: number, featIdx: number) => {
    const copy = JSON.parse(JSON.stringify(data));
    copy.tiers[tierIdx].features.splice(featIdx, 1);
    setData(copy);
  };

  const save = async () => {
    setSaving(true);
    await fetch("/api/pricing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Pricing saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Pricing Plans</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage pricing tiers, features, and the section header</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Section Header</h3>
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
          <textarea className="input-modern" rows={2} value={data.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={addTier} className="btn-secondary"><Plus className="w-4 h-4" /> Add Tier</button>
      </div>

      <div className="grid gap-6">
        {data.tiers.map((tier, ti) => (
          <div key={tier.id} className={`rounded-2xl border bg-card p-6 space-y-4 ${tier.popular ? "border-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.08)]" : "border-white/[0.06]"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">Tier {ti + 1}</span>
                {tier.popular && <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> Popular</span>}
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <input type="checkbox" checked={tier.popular} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].popular = e.target.checked; setData(c); }} className="accent-primary" />
                  Mark popular
                </label>
                <button onClick={() => removeTier(ti)} className="btn-danger"><X className="w-4 h-4" /> Remove</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Name</label>
                <input className="input-modern" value={tier.name} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].name = e.target.value; setData(c); }} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Price (null for custom)</label>
                <input className="input-modern" type="number" value={tier.price ?? ""} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].price = e.target.value === "" ? null : Number(e.target.value); setData(c); }} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Price Label</label>
                <input className="input-modern" value={tier.priceLabel} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].priceLabel = e.target.value; setData(c); }} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">CTA Text</label>
                <input className="input-modern" value={tier.cta} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].cta = e.target.value; setData(c); }} />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
              <input className="input-modern" value={tier.desc} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].desc = e.target.value; setData(c); }} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Features ({tier.features.length})</label>
                <button onClick={() => addFeature(ti)} className="btn-secondary text-[10px] py-1 px-2"><Plus className="w-3 h-3" /> Add</button>
              </div>
              {tier.features.map((feat: string, fi: number) => (
                <div key={fi} className="flex items-center gap-2">
                  <input className="input-modern flex-1" value={feat} onChange={(e) => { const c = JSON.parse(JSON.stringify(data)); c.tiers[ti].features[fi] = e.target.value; setData(c); }} />
                  <button onClick={() => removeFeature(ti, fi)} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
