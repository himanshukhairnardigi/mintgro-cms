"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, X } from "lucide-react";
import { PersonalizationData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function PersonalizationPage() {
  const [data, setData] = useState<PersonalizationData | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/personalization")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load personalization data");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const update = useCallback(
    (path: string, value: unknown) => {
      if (!data) return;
      const copy = JSON.parse(JSON.stringify(data));
      const keys = path.split(".");
      let obj: Record<string, unknown> = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]] as Record<string, unknown>;
      obj[keys[keys.length - 1]] = value;
      setData(copy as PersonalizationData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/personalization", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Personalization saved" });
    } catch (e) {
      setToast({ show: true, message: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (!data) return;
    setData({
      ...data,
      features: [
        ...data.features,
        { id: crypto.randomUUID(), icon: "", title: "", description: "" },
      ],
    });
  };

  const removeFeature = (index: number) => {
    if (!data) return;
    setData({ ...data, features: data.features.filter((_, i) => i !== index) });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="shimmer w-48 h-8 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Personalization</h1>
          <p className="text-muted-foreground mt-1">Manage personalization content and feature cards.</p>
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
            <label className="text-sm text-muted-foreground">Category Label</label>
            <input
              type="text"
              value={data.categoryLabel}
              onChange={(e) => update("categoryLabel", e.target.value)}
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
              rows={3}
              className="input-modern w-full resize-none"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Features</h2>
          <button onClick={addFeature} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-4">
          {data.features.map((feature, i) => (
            <div key={feature.id} className="rounded-xl border border-white/[0.04] bg-background/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Feature {i + 1}</span>
                <button onClick={() => removeFeature(i)} className="btn-ghost text-destructive p-1.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Icon</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => update(`features.${i}.icon`, e.target.value)}
                    placeholder="Icon name"
                    className="input-modern w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => update(`features.${i}.title`, e.target.value)}
                    placeholder="Title"
                    className="input-modern w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => update(`features.${i}.description`, e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="input-modern w-full resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
