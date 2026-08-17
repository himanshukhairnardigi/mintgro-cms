"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { HeroData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function HeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load data"));
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
    setError(null);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Hero saved" });
    } catch {
      setError("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const addBadge = () => {
    if (!data) return;
    setData({ ...data, trustBadges: [...data.trustBadges, ""] });
  };

  const removeBadge = (index: number) => {
    if (!data) return;
    setData({ ...data, trustBadges: data.trustBadges.filter((_, i) => i !== index) });
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  if (error) return <div className="p-8 text-destructive text-sm">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Manage your hero content, call-to-actions, and trust badges.</p>
        </div>
        <div className="self-start">
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Eyebrow</label>
            <input
              type="text"
              value={data.eyebrow}
              onChange={(e) => update("eyebrow", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Description</label>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
