"use client";

import { useState, useEffect } from "react";
import { PricingTier, PricingFeature } from "@/lib/types";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";
import Modal from "@/components/admin/Modal";

export default function PricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<PricingTier | null>(null);
  const [form, setForm] = useState({ name: "", price: 0, desc: "", cta: "Start Free Trial", popular: false, features: [] as PricingFeature[] });
  const [featureLabel, setFeatureLabel] = useState("");

  useEffect(() => { fetch("/api/pricing").then((r) => r.json()).then(setTiers); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", price: 0, desc: "", cta: "Start Free Trial", popular: false, features: [] });
    setModal(true);
  };
  const openEdit = (tier: PricingTier) => {
    setEditing(tier);
    setForm({ name: tier.name, price: tier.price, desc: tier.desc, cta: tier.cta, popular: tier.popular, features: [...tier.features] });
    setModal(true);
  };

  const addFeature = () => {
    if (!featureLabel.trim()) return;
    setForm({ ...form, features: [...form.features, { label: featureLabel.trim(), included: true }] });
    setFeatureLabel("");
  };
  const toggleFeature = (idx: number) => {
    const updated = [...form.features];
    updated[idx] = { ...updated[idx], included: !updated[idx].included };
    setForm({ ...form, features: updated });
  };
  const removeFeature = (idx: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  const handleSave = async () => {
    let updated: PricingTier[];
    if (editing) { updated = tiers.map((t) => (t.id === editing.id ? { ...t, ...form } : t)); }
    else { updated = [...tiers, { id: `p${Date.now()}`, ...form }]; }
    setTiers(updated);
    await fetch("/api/pricing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = tiers.filter((t) => t.id !== id);
    setTiers(updated);
    await fetch("/api/pricing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{tiers.length} pricing tiers</p>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Tier
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <div key={tier.id} className={`rounded-xl border p-5 bg-card ${tier.popular ? "border-primary/40" : "border-white/5"}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold">{tier.name}</h4>
              {tier.popular && <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Popular</span>}
            </div>
            <div className="text-2xl font-bold mb-1">${tier.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
            <p className="text-xs text-muted-foreground mb-3">{tier.desc}</p>
            <div className="space-y-1.5 mb-4">
              {tier.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {f.included ? <Check className="w-3 h-3 text-primary" /> : <X className="w-3 h-3 text-muted-foreground/40" />}
                  <span className="text-[10px]">{f.label}</span>
                </div>
              ))}
              {tier.features.length > 4 && <span className="text-[10px] text-muted-foreground">+{tier.features.length - 4} more</span>}
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => openEdit(tier)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-white/10 text-xs text-muted-foreground"><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => handleDelete(tier.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-destructive/10 text-xs text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Tier" : "New Tier"} subtitle="Configure pricing plan details">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Price ($/mo)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
            <input type="text" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="accent-primary" />
            <label className="text-xs font-medium text-muted-foreground">Mark as popular</label>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Features</label>
            <div className="space-y-1.5 mb-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-1.5">
                  <span className="text-xs">{f.label}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleFeature(i)} className={`text-[10px] px-1.5 py-0.5 rounded ${f.included ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"}`}>{f.included ? "Yes" : "No"}</button>
                    <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive"><X className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={featureLabel} onChange={(e) => setFeatureLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFeature()} placeholder="Feature label..." className="flex-1 px-3 py-1.5 rounded-lg bg-input border border-white/5 text-xs focus:outline-none focus:border-primary/50" />
              <button onClick={addFeature} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs hover:bg-white/10">Add</button>
            </div>
          </div>
          <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> {editing ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
