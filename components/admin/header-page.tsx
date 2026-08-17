"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { HeaderData } from "@/lib/types";

export default function HeaderPage() {
  const [data, setData] = useState<HeaderData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/header").then((r) => r.json()).then(setData);
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

  const addNav = () => setData({ ...data, navLinks: [...data.navLinks, { label: "New Link", href: "/", hasDropdown: false }] });
  const removeNav = (i: number) => setData({ ...data, navLinks: data.navLinks.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/header", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Header saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Header / Navigation</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage your site logo and navigation links</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Logo</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Logo Text</label>
            <input className="input-modern" value={data.logo.text} onChange={(e) => update("logo.text", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Tagline</label>
            <input className="input-modern" value={data.logo.tagline} onChange={(e) => update("logo.tagline", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Navigation Links</h3>
          <button onClick={addNav} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Link</button>
        </div>
        <div className="space-y-3">
          {data.navLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <input className="input-modern flex-1" value={link.label} onChange={(e) => { const c = [...data.navLinks]; c[i] = { ...c[i], label: e.target.value }; setData({ ...data, navLinks: c }); }} placeholder="Label" />
              <input className="input-modern flex-1" value={link.href} onChange={(e) => { const c = [...data.navLinks]; c[i] = { ...c[i], href: e.target.value }; setData({ ...data, navLinks: c }); }} placeholder="Href" />
              <label className="flex items-center gap-2 text-[10px] text-muted-foreground whitespace-nowrap">
                <input type="checkbox" checked={link.hasDropdown} onChange={(e) => { const c = [...data.navLinks]; c[i] = { ...c[i], hasDropdown: e.target.checked }; setData({ ...data, navLinks: c }); }} className="accent-primary" />
                Dropdown
              </label>
              <button onClick={() => removeNav(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">CTA Button</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Button Label</label>
            <input className="input-modern" value={data.ctaButton.label} onChange={(e) => update("ctaButton.label", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Button Href</label>
            <input className="input-modern" value={data.ctaButton.href} onChange={(e) => update("ctaButton.href", e.target.value)} />
          </div>
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
