"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { LogoBarData } from "@/lib/types";

export default function LogoBarPage() {
  const [data, setData] = useState<LogoBarData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/logobar").then((r) => r.json()).then(setData);
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

  const addLogo = () => setData({ ...data, logos: [...data.logos, { name: "New Logo" }] });
  const removeLogo = (i: number) => setData({ ...data, logos: data.logos.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/logobar", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Logo bar saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Logo Bar</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the trusted-by section with company logos</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Content</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Heading</label>
            <input className="input-modern" value={data.heading} onChange={(e) => update("heading", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Subtext</label>
            <input className="input-modern" value={data.subtext} onChange={(e) => update("subtext", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Logos ({data.logos.length})</h3>
          <button onClick={addLogo} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Logo</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <input className="input-modern flex-1" value={logo.name} onChange={(e) => { const c = [...data.logos]; c[i] = { name: e.target.value }; setData({ ...data, logos: c }); }} placeholder="Logo name" />
              <button onClick={() => removeLogo(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
