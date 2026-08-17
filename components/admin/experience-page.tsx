"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { ExperienceData } from "@/lib/types";

export default function ExperiencePage() {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/experience").then((r) => r.json()).then(setData);
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

  const addSidebar = () => setData({ ...data, sidebarItems: [...data.sidebarItems, "New item"] });
  const removeSidebar = (i: number) => setData({ ...data, sidebarItems: data.sidebarItems.filter((_, idx) => idx !== i) });
  const addStat = () => setData({ ...data, stats: [...data.stats, { label: "New", value: "0" }] });
  const removeStat = (i: number) => setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) });
  const addDevice = () => setData({ ...data, devices: [...data.devices, "New device"] });
  const removeDevice = (i: number) => setData({ ...data, devices: data.devices.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/experience", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Experience saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Experience</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the experience showcase section</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
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
          <textarea className="input-modern" rows={2} value={data.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Sidebar Items</h3>
            <button onClick={addSidebar} className="btn-secondary text-[10px]"><Plus className="w-3 h-3" /> Add</button>
          </div>
          {data.sidebarItems.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <input className="input-modern flex-1" value={item} onChange={(e) => { const c = [...data.sidebarItems]; c[i] = e.target.value; setData({ ...data, sidebarItems: c }); }} />
              <button onClick={() => removeSidebar(i)} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Stats</h3>
            <button onClick={addStat} className="btn-secondary text-[10px]"><Plus className="w-3 h-3" /> Add</button>
          </div>
          {data.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className="input-modern flex-1" value={s.label} onChange={(e) => { const c = [...data.stats]; c[i] = { ...c[i], label: e.target.value }; setData({ ...data, stats: c }); }} placeholder="Label" />
              <input className="input-modern w-24" value={s.value} onChange={(e) => { const c = [...data.stats]; c[i] = { ...c[i], value: e.target.value }; setData({ ...data, stats: c }); }} placeholder="Value" />
              <button onClick={() => removeStat(i)} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Devices</h3>
            <button onClick={addDevice} className="btn-secondary text-[10px]"><Plus className="w-3 h-3" /> Add</button>
          </div>
          {data.devices.map((d: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <input className="input-modern flex-1" value={d} onChange={(e) => { const c = [...data.devices]; c[i] = e.target.value; setData({ ...data, devices: c }); }} />
              <button onClick={() => removeDevice(i)} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
