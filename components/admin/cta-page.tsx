"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { CTASectionData } from "@/lib/types";

export default function CTAPage() {
  const [data, setData] = useState<CTASectionData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cta").then((r) => r.json()).then(setData);
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

  const save = async () => {
    setSaving(true);
    await fetch("/api/cta", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "CTA section saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">CTA / Contact Section</h2>
          <p className="text-xs text-muted-foreground mt-1">Edit the final call-to-action section</p>
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

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
