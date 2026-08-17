"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, X } from "lucide-react";
import { CRMFeatureData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function CRMPage() {
  const [data, setData] = useState<CRMFeatureData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/crm")
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
      setData(copy as CRMFeatureData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/crm", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "CRM section saved" });
  };

  const addFeatureItem = () => {
    if (!data) return;
    setData({ ...data, featureList: [...data.featureList, { icon: "", label: "" }] });
  };

  const removeFeatureItem = (index: number) => {
    if (!data) return;
    setData({ ...data, featureList: data.featureList.filter((_, i) => i !== index) });
  };

  const addStat = () => {
    if (!data) return;
    setData({ ...data, dashboardStats: [...data.dashboardStats, { label: "", value: "" }] });
  };

  const removeStat = (index: number) => {
    if (!data) return;
    setData({ ...data, dashboardStats: data.dashboardStats.filter((_, i) => i !== index) });
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
          <h1 className="text-2xl font-bold text-foreground">CRM Features</h1>
          <p className="text-muted-foreground mt-1">Manage CRM section content, features, and dashboard stats.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Section Content</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Badge</label>
            <input
              type="text"
              value={data.badge}
              onChange={(e) => update("badge", e.target.value)}
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
        <h2 className="text-lg font-semibold text-foreground">CRM Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="text-sm text-muted-foreground">Feature Title</label>
            <input
              type="text"
              value={data.featureTitle}
              onChange={(e) => update("featureTitle", e.target.value)}
              className="input-modern w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Feature Description</label>
          <textarea
            value={data.featureDescription}
            onChange={(e) => update("featureDescription", e.target.value)}
            rows={4}
            className="input-modern w-full resize-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Feature List</h2>
          <button onClick={addFeatureItem} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-3">
          {data.featureList.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={item.icon}
                onChange={(e) => update(`featureList.${i}.icon`, e.target.value)}
                placeholder="Icon name"
                className="input-modern w-40"
              />
              <input
                type="text"
                value={item.label}
                onChange={(e) => update(`featureList.${i}.label`, e.target.value)}
                placeholder="Label"
                className="input-modern flex-1"
              />
              <button onClick={() => removeFeatureItem(i)} className="btn-ghost text-destructive p-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Dashboard Stats</h2>
          <button onClick={addStat} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Stat
          </button>
        </div>
        <div className="space-y-3">
          {data.dashboardStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => update(`dashboardStats.${i}.label`, e.target.value)}
                placeholder="Label"
                className="input-modern flex-1"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => update(`dashboardStats.${i}.value`, e.target.value)}
                placeholder="Value"
                className="input-modern w-40"
              />
              <button onClick={() => removeStat(i)} className="btn-ghost text-destructive p-2">
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
