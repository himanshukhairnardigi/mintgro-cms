"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, X } from "lucide-react";
import { HeroData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function HeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const update = useCallback(
    (path: string, value: unknown) => {
      if (!data) return;
      const copy = JSON.parse(JSON.stringify(data));
      const keys = path.split(".");
      let obj: Record<string, unknown> = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]] as Record<string, unknown>;
      obj[keys[keys.length - 1]] = value;
      setData(copy as HeroData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "Hero saved" });
  };

  const addBadge = () => {
    if (!data) return;
    setData({ ...data, trustBadges: [...data.trustBadges, ""] });
  };

  const removeBadge = (index: number) => {
    if (!data) return;
    setData({ ...data, trustBadges: data.trustBadges.filter((_, i) => i !== index) });
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="shimmer w-48 h-8 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Manage your hero content, call-to-actions, and trust badges.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Eyebrow</label>
            <input
              type="text"
              value={data.eyebrow}
              onChange={(e) => update("eyebrow", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              className="input-modern w-full resize-none"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Call-to-Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Primary CTA</h3>
            <input
              type="text"
              value={data.ctaPrimary.label}
              onChange={(e) => update("ctaPrimary.label", e.target.value)}
              placeholder="Label"
              className="input-modern w-full"
            />
            <input
              type="text"
              value={data.ctaPrimary.href}
              onChange={(e) => update("ctaPrimary.href", e.target.value)}
              placeholder="Href"
              className="input-modern w-full"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Secondary CTA</h3>
            <input
              type="text"
              value={data.ctaSecondary.label}
              onChange={(e) => update("ctaSecondary.label", e.target.value)}
              placeholder="Label"
              className="input-modern w-full"
            />
            <input
              type="text"
              value={data.ctaSecondary.href}
              onChange={(e) => update("ctaSecondary.href", e.target.value)}
              placeholder="Href"
              className="input-modern w-full"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Trust Badges</h2>
          <button onClick={addBadge} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Badge
          </button>
        </div>
        <div className="space-y-3">
          {data.trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={badge}
                onChange={(e) => {
                  const next = [...data.trustBadges];
                  next[i] = e.target.value;
                  setData({ ...data, trustBadges: next });
                }}
                placeholder="Badge text"
                className="input-modern flex-1"
              />
              <button onClick={() => removeBadge(i)} className="btn-ghost text-destructive p-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
