"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X, ChevronDown } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { FAQData } from "@/lib/types";

export default function FAQPage() {
  const [data, setData] = useState<FAQData | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faq").then((r) => r.json()).then(setData);
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

  const addItem = () => setData({ ...data, items: [...data.items, { id: `q${Date.now()}`, question: "New question?", answer: "Answer here." }] });
  const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  const addCta = () => setData({ ...data, ctaButtons: [...data.ctaButtons, { label: "New", href: "/", style: "primary" }] });
  const removeCta = (i: number) => setData({ ...data, ctaButtons: data.ctaButtons.filter((_, idx) => idx !== i) });

  const save = async () => {
    setSaving(true);
    await fetch("/api/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "FAQ saved" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">FAQ</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage frequently asked questions and CTA buttons</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">Section Header</h3>
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

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Questions ({data.items.length})</h3>
          <button onClick={addItem} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Question</button>
        </div>
        {data.items.map((item, i) => (
          <div key={item.id} className="rounded-xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="text-xs font-medium">{item.question}</span>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeItem(i); }} className="btn-danger p-1.5"><X className="w-3.5 h-3.5" /></button>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === item.id ? "rotate-180" : ""}`} />
              </div>
            </button>
            {expanded === item.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/[0.04] pt-3">
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Question</label>
                  <input className="input-modern" value={item.question} onChange={(e) => { const c = [...data.items]; c[i] = { ...c[i], question: e.target.value }; setData({ ...data, items: c }); }} />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Answer</label>
                  <textarea className="input-modern" rows={3} value={item.answer} onChange={(e) => { const c = [...data.items]; c[i] = { ...c[i], answer: e.target.value }; setData({ ...data, items: c }); }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">CTA Buttons</h3>
          <button onClick={addCta} className="btn-secondary text-[10px]"><Plus className="w-3.5 h-3.5" /> Add Button</button>
        </div>
        {data.ctaButtons.map((btn, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <input className="input-modern flex-1" value={btn.label} onChange={(e) => { const c = [...data.ctaButtons]; c[i] = { ...c[i], label: e.target.value }; setData({ ...data, ctaButtons: c }); }} placeholder="Label" />
            <input className="input-modern flex-1" value={btn.href} onChange={(e) => { const c = [...data.ctaButtons]; c[i] = { ...c[i], href: e.target.value }; setData({ ...data, ctaButtons: c }); }} placeholder="Href" />
            <select className="select-modern w-32" value={btn.style} onChange={(e) => { const c = [...data.ctaButtons]; c[i] = { ...c[i], style: e.target.value as "primary" | "light" }; setData({ ...data, ctaButtons: c }); }}>
              <option value="primary">Primary</option>
              <option value="light">Light</option>
            </select>
            <button onClick={() => removeCta(i)} className="btn-danger p-2"><X className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
