"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { IndustryData } from "@/lib/types";

const iconOptions = ["HeartPulse", "GraduationCap", "BriefcaseBusiness", "ShoppingBag", "Factory", "Building2", "Car", "Leaf", "Utensils", "Plane", "Wifi", "Shield"];

export default function IndustriesPage() {
  const [data, setData] = useState<IndustryData[]>([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/industries").then((r) => r.json()).then(setData);
  }, []);

  if (!data.length) return <div className="p-8 text-muted-foreground text-xs animate-pulse">Loading...</div>;

  const addIndustry = () => setData([...data, { id: `i${Date.now()}`, icon: "Building2", name: "New Industry", desc: "Description" }]);
  const removeIndustry = (i: number) => setData(data.filter((_, idx) => idx !== i));
  const updateIndustry = (i: number, field: string, value: string) => {
    const c = [...data];
    c[i] = { ...c[i], [field]: value };
    setData(c);
  };

  const save = async () => {
    setSaving(true);
    await fetch("/api/industries", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Industries saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Industries</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage industry cards shown on the website</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addIndustry} className="btn-secondary"><Plus className="w-4 h-4" /> Add Industry</button>
          <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>

      <div className="grid gap-4">
        {data.map((ind, i) => (
          <div key={ind.id} className="rounded-2xl border border-white/[0.06] bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Industry {i + 1}</span>
              <button onClick={() => removeIndustry(i)} className="btn-danger"><X className="w-4 h-4" /> Remove</button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Icon</label>
                <select className="select-modern" value={ind.icon} onChange={(e) => updateIndustry(i, "icon", e.target.value)}>
                  {iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Name</label>
                <input className="input-modern" value={ind.name} onChange={(e) => updateIndustry(i, "name", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
                <input className="input-modern" value={ind.desc} onChange={(e) => updateIndustry(i, "desc", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
