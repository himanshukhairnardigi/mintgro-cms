"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { ChallengesData } from "@/lib/types";

export default function ChallengesPage() {
  const [data, setData] = useState<ChallengesData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/challenges").then((r) => r.json()).then(setData);
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

  const addItem = (key: "problems" | "solutions") => setData({ ...data, [key]: [...data[key], "New item"] });
  const removeItem = (key: "problems" | "solutions", i: number) => setData({ ...data, [key]: data[key].filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/challenges", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Challenges saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Challenges</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage the problems and solutions section</p>
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
          <textarea className="input-modern" rows={2} value={data.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-red-400">Problems ({data.problems.length})</h3>
            <button onClick={() => addItem("problems")} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          {data.problems.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-4">{i + 1}</span>
              <input className="input-modern flex-1" value={item} onChange={(e) => { const c = [...data.problems]; c[i] = e.target.value; setData({ ...data, problems: c }); }} />
              <button onClick={() => removeItem("problems", i)} className="btn-danger p-2"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">Solutions ({data.solutions.length})</h3>
            <button onClick={() => addItem("solutions")} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          {data.solutions.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-4">{i + 1}</span>
              <input className="input-modern flex-1" value={item} onChange={(e) => { const c = [...data.solutions]; c[i] = e.target.value; setData({ ...data, solutions: c }); }} />
              <button onClick={() => removeItem("solutions", i)} className="btn-danger p-2"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
