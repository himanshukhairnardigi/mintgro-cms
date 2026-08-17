"use client";

import { useState, useEffect } from "react";
import type { PricingData } from "@/lib/types";
import { Plus, Trash2, Save, Loader2, Star } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function PricingPage() {
  const [data, setData] = useState<PricingData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const update = (path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)) as PricingData;
      let obj: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        obj = (obj[key] as Record<string, unknown>) ?? {};
      }
      const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[lastKey] = value;
      return next;
    });
  };

  const addTier = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tiers: [
          ...prev.tiers,
          { id: uid(), name: "", price: 0, priceLabel: "/month", desc: "", features: [], cta: "Get Started", popular: false },
        ],
      };
    });
  };

  const removeTier = (id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, tiers: prev.tiers.filter((t) => t.id !== id) };
    });
  };

  const addFeature = (tierIndex: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev)) as PricingData;
      next.tiers[tierIndex].features.push("");
      return next;
    });
  };

  const removeFeature = (tierIndex: number, featIndex: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev)) as PricingData;
      next.tiers[tierIndex].features.splice(featIndex, 1);
      return next;
    });
  };

  const updateFeature = (tierIndex: number, featIndex: number, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev)) as PricingData;
      next.tiers[tierIndex].features[featIndex] = value;
      return next;
    });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "Pricing saved" });
  };

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, message: "" }), 2500);
    return () => clearTimeout(t);
  }, [toast.show]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-emerald-500/90 backdrop-blur text-white px-5 py-3 text-sm font-medium shadow-lg animate-fade-up">
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pricing</h1>
          <p className="text-muted-foreground mt-1">Manage pricing tiers and section header</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 self-start">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Section Header</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Eyebrow</label>
            <input value={data.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} className="input-modern w-full" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Title</label>
            <input value={data.title} onChange={(e) => update("title", e.target.value)} className="input-modern w-full" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <input value={data.description} onChange={(e) => update("description", e.target.value)} className="input-modern w-full" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.tiers.map((tier, ti) => (
          <div key={tier.id} className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-foreground">Tier {ti + 1}</h3>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tier.popular}
                    onChange={(e) => update(`tiers.${ti}.popular`, e.target.checked)}
                    className="rounded border-white/20"
                  />
                  Popular
                </label>
                <button onClick={() => removeTier(tier.id)} className="btn-ghost text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Name</label>
                <input value={tier.name} onChange={(e) => update(`tiers.${ti}.name`, e.target.value)} className="input-modern w-full" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Price</label>
                {tier.price === null ? (
                  <div className="input-modern w-full bg-muted/30 text-muted-foreground">Custom</div>
                ) : (
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => {
                      const val = e.target.value === "" ? null : Number(e.target.value);
                      update(`tiers.${ti}.price`, val);
                    }}
                    className="input-modern w-full"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Price Label</label>
                <input value={tier.priceLabel} onChange={(e) => update(`tiers.${ti}.priceLabel`, e.target.value)} className="input-modern w-full" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Description</label>
                <input value={tier.desc} onChange={(e) => update(`tiers.${ti}.desc`, e.target.value)} className="input-modern w-full" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">CTA</label>
                <input value={tier.cta} onChange={(e) => update(`tiers.${ti}.cta`, e.target.value)} className="input-modern w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs text-muted-foreground">Features</label>
              {tier.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <input
                    value={feat}
                    onChange={(e) => updateFeature(ti, fi, e.target.value)}
                    className="input-modern flex-1"
                  />
                  <button onClick={() => removeFeature(ti, fi)} className="btn-ghost text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button onClick={() => addFeature(ti)} className="btn-ghost text-sm flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Feature
              </button>
            </div>
          </div>
        ))}
        <button onClick={addTier} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Tier
        </button>
      </div>
    </div>
  );
}
