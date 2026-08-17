"use client";

import { useState, useEffect } from "react";
import type { CTASectionData } from "@/lib/types";
import { Save, Loader2 } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

export default function CTAPage() {
  const [data, setData] = useState<CTASectionData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/cta")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const update = (path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)) as CTASectionData;
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

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/cta", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "CTA saved" });
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
          <h1 className="text-2xl font-bold text-foreground">CTA Section</h1>
          <p className="text-muted-foreground mt-1">Manage the call-to-action section</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 self-start">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Eyebrow</label>
            <input value={data.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} className="input-modern w-full" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Title</label>
            <input value={data.title} onChange={(e) => update("title", e.target.value)} className="input-modern w-full" />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              className="input-modern w-full min-h-[80px] resize-y"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">CTAs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Primary</h3>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Label</label>
              <input
                value={data.ctaPrimary.label}
                onChange={(e) => update("ctaPrimary.label", e.target.value)}
                className="input-modern w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Href</label>
              <input
                value={data.ctaPrimary.href}
                onChange={(e) => update("ctaPrimary.href", e.target.value)}
                className="input-modern w-full"
              />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Secondary</h3>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Label</label>
              <input
                value={data.ctaSecondary.label}
                onChange={(e) => update("ctaSecondary.label", e.target.value)}
                className="input-modern w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Href</label>
              <input
                value={data.ctaSecondary.href}
                onChange={(e) => update("ctaSecondary.href", e.target.value)}
                className="input-modern w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
