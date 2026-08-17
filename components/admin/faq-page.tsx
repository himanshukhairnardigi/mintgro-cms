"use client";

import { useState, useEffect } from "react";
import type { FAQData, FAQItem } from "@/lib/types";
import { Plus, Trash2, Save, Loader2, ChevronDown } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function FAQPage() {
  const [data, setData] = useState<FAQData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const update = (path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)) as FAQData;
      let obj: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        obj = (obj[key] as Record<string, unknown>) ?? {};
      }
      const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[lastKey] = value;
      return next;
    });
  };

  const addItem = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: [...prev.items, { id: uid(), question: "", answer: "" }],
      };
    });
  };

  const removeItem = (id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, items: prev.items.filter((item) => item.id !== id) };
    });
  };

  const addCtaButton = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ctaButtons: [...prev.ctaButtons, { label: "", href: "#", style: "primary" as const }],
      };
    });
  };

  const removeCtaButton = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ctaButtons: [...prev.ctaButtons] };
      next.ctaButtons.splice(index, 1);
      return next;
    });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "FAQ saved" });
  };

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, message: "" }), 2500);
    return () => clearTimeout(t);
  }, [toast.show]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-emerald-500/90 backdrop-blur text-white px-5 py-3 text-sm font-medium shadow-lg animate-fade-up">
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">FAQ</h1>
          <p className="text-muted-foreground mt-1">Manage frequently asked questions</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 self-start">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Section Header</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Eyebrow</label>
            <input value={data.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} className="input-modern w-full" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Title</label>
            <input value={data.title} onChange={(e) => update("title", e.target.value)} className="input-modern w-full" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <input value={data.description} onChange={(e) => update("description", e.target.value)} className="input-modern w-full" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Questions</h2>
        <div className="space-y-3">
          {data.items.map((item: FAQItem) => {
            const isOpen = expanded === item.id;
            return (
              <div key={item.id} className="rounded-xl border border-white/[0.06] bg-background/50 overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground truncate">
                    {item.question || "Untitled question"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="btn-ghost text-destructive p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-up">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Question</label>
                      <input
                        value={item.question}
                        onChange={(e) => update(`items.${data.items.findIndex((q) => q.id === item.id)}.question`, e.target.value)}
                        className="input-modern w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => update(`items.${data.items.findIndex((q) => q.id === item.id)}.answer`, e.target.value)}
                        className="input-modern w-full min-h-[100px] resize-y"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={addItem} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">CTA Buttons</h2>
        <div className="space-y-3">
          {data.ctaButtons.map((btn, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={btn.label}
                onChange={(e) => update(`ctaButtons.${i}.label`, e.target.value)}
                className="input-modern flex-1"
                placeholder="Label"
              />
              <input
                value={btn.href}
                onChange={(e) => update(`ctaButtons.${i}.href`, e.target.value)}
                className="input-modern flex-1"
                placeholder="Href"
              />
              <select
                value={btn.style}
                onChange={(e) => update(`ctaButtons.${i}.style`, e.target.value)}
                className="select-modern w-32"
              >
                <option value="primary">Primary</option>
                <option value="light">Light</option>
              </select>
              <button onClick={() => removeCtaButton(i)} className="btn-ghost text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addCtaButton} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Button
        </button>
      </div>
    </div>
  );
}
