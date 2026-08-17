"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { StepData } from "@/lib/types";

export default function StepsPage() {
  const [data, setData] = useState<StepData[]>([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/steps").then((r) => r.json()).then(setData);
  }, []);

  if (!data.length) return <div className="p-8 text-muted-foreground text-xs animate-pulse">Loading...</div>;

  const addStep = () => setData([...data, { id: `s${Date.now()}`, icon: "Rocket", step: String(data.length + 1).padStart(2, "0"), title: "New Step", desc: "Description" }]);
  const removeStep = (i: number) => setData(data.filter((_, idx) => idx !== i));
  const updateStep = (i: number, field: string, value: string) => {
    const c = [...data];
    c[i] = { ...c[i], [field]: value };
    setData(c);
  };

  const save = async () => {
    setSaving(true);
    await fetch("/api/steps", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Steps saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">How It Works — Steps</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the onboarding steps section</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addStep} className="btn-secondary"><Plus className="w-4 h-4" /> Add Step</button>
          <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>

      <div className="grid gap-4">
        {data.map((step, i) => (
          <div key={step.id} className="rounded-2xl border border-white/[0.06] bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Step {step.step}</span>
              <button onClick={() => removeStep(i)} className="btn-danger"><X className="w-4 h-4" /> Remove</button>
            </div>
            <div className="grid sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Step #</label>
                <input className="input-modern" value={step.step} onChange={(e) => updateStep(i, "step", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Icon</label>
                <input className="input-modern" value={step.icon} onChange={(e) => updateStep(i, "icon", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Title</label>
                <input className="input-modern" value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
                <input className="input-modern" value={step.desc} onChange={(e) => updateStep(i, "desc", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
