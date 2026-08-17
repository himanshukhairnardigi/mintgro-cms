"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { CRMFeatureData } from "@/lib/types";

export default function CRMPage() {
  const [data, setData] = useState<CRMFeatureData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/crm").then((r) => r.json()).then(setData);
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

  const addFeature = () => setData({ ...data, featureList: [...data.featureList, { icon: "Star", label: "New feature" }] });
  const removeFeature = (i: number) => setData({ ...data, featureList: data.featureList.filter((_, idx) => idx !== i) });
  const addStat = () => setData({ ...data, dashboardStats: [...data.dashboardStats, { label: "New", value: "0" }] });
  const removeStat = (i: number) => setData({ ...data, dashboardStats: data.dashboardStats.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/crm", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "CRM settings saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">CRM & Features</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the CRM spotlight section and feature list</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Section Content</h3>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Badge</label>
          <input className="input-modern" value={data.badge} onChange={(e) => update("badge", e.target.value)} />
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

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">CRM Spotlight</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Category Label</label>
            <input className="input-modern" value={data.categoryLabel} onChange={(e) => update("categoryLabel", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Feature Title</label>
            <input className="input-modern" value={data.featureTitle} onChange={(e) => update("featureTitle", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Feature Description</label>
          <textarea className="input-modern" rows={2} value={data.featureDescription} onChange={(e) => update("featureDescription", e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Feature List ({data.featureList.length})</h3>
          <button onClick={addFeature} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Feature</button>
        </div>
        {data.featureList.map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <input className="input-modern w-32" value={f.icon} onChange={(e) => { const c = [...data.featureList]; c[i] = { ...c[i], icon: e.target.value }; setData({ ...data, featureList: c }); }} placeholder="Icon name" />
            <input className="input-modern flex-1" value={f.label} onChange={(e) => { const c = [...data.featureList]; c[i] = { ...c[i], label: e.target.value }; setData({ ...data, featureList: c }); }} placeholder="Label" />
            <button onClick={() => removeFeature(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Dashboard Stats ({data.dashboardStats.length})</h3>
          <button onClick={addStat} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Stat</button>
        </div>
        {data.dashboardStats.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <input className="input-modern flex-1" value={s.label} onChange={(e) => { const c = [...data.dashboardStats]; c[i] = { ...c[i], label: e.target.value }; setData({ ...data, dashboardStats: c }); }} placeholder="Label" />
            <input className="input-modern w-32" value={s.value} onChange={(e) => { const c = [...data.dashboardStats]; c[i] = { ...c[i], value: e.target.value }; setData({ ...data, dashboardStats: c }); }} placeholder="Value" />
            <button onClick={() => removeStat(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
