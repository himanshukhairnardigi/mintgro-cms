"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { ExperienceData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function ExperiencePage() {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load experience data");
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
      setData(copy as ExperienceData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Experience saved" });
    } catch (e) {
      setToast({ show: true, message: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const addSidebarItem = () => {
    if (!data) return;
    setData({ ...data, sidebarItems: [...data.sidebarItems, ""] });
  };

  const removeSidebarItem = (index: number) => {
    if (!data) return;
    setData({ ...data, sidebarItems: data.sidebarItems.filter((_, i) => i !== index) });
  };

  const addStat = () => {
    if (!data) return;
    setData({ ...data, stats: [...data.stats, { label: "", value: "" }] });
  };

  const removeStat = (index: number) => {
    if (!data) return;
    setData({ ...data, stats: data.stats.filter((_, i) => i !== index) });
  };

  const addDevice = () => {
    if (!data) return;
    setData({ ...data, devices: [...data.devices, ""] });
  };

  const removeDevice = (index: number) => {
    if (!data) return;
    setData({ ...data, devices: data.devices.filter((_, i) => i !== index) });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Experience Section</h1>
          <p className="text-muted-foreground mt-1">Manage sidebar items, stats, and supported devices.</p>
        </div>
        <div className="self-start">
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>
        <div className="space-y-4">
          <label className="text-xs text-muted-foreground block mb-1">Eyebrow</label>
          <input
            type="text"
            value={data.eyebrow}
            onChange={(e) => update("eyebrow", e.target.value)}
            className="input-modern w-full"
          />
          <label className="text-xs text-muted-foreground block mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            className="input-modern w-full"
          />
          <label className="text-xs text-muted-foreground block mb-1">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="input-modern w-full resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Sidebar Items</h2>
            <button onClick={addSidebarItem} className="btn-secondary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {data.sidebarItems.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono shrink-0 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const next = [...data.sidebarItems];
                    next[i] = e.target.value;
                    setData({ ...data, sidebarItems: next });
                  }}
                  placeholder="Item label"
                  className="input-modern flex-1"
                />
                <button onClick={() => removeSidebarItem(i)} className="btn-ghost text-destructive p-2 self-end">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Stats</h2>
            <button onClick={addStat} className="btn-secondary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {data.stats.map((stat, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => update(`stats.${i}.label`, e.target.value)}
                  placeholder="Label"
                  className="input-modern flex-1"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => update(`stats.${i}.value`, e.target.value)}
                  placeholder="Value"
                  className="input-modern sm:w-28"
                />
                <button onClick={() => removeStat(i)} className="btn-ghost text-destructive p-2 self-end">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Devices</h2>
            <button onClick={addDevice} className="btn-secondary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {data.devices.map((device, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono shrink-0 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={device}
                  onChange={(e) => {
                    const next = [...data.devices];
                    next[i] = e.target.value;
                    setData({ ...data, devices: next });
                  }}
                  placeholder="Device name"
                  className="input-modern flex-1"
                />
                <button onClick={() => removeDevice(i)} className="btn-ghost text-destructive p-2 self-end">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
