"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { LogoBarData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function LogoBarPage() {
  const [data, setData] = useState<LogoBarData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/logobar")
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
      setData(copy as LogoBarData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/logobar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Logo bar saved" });
    } catch {
      setError("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const addLogo = () => {
    if (!data) return;
    setData({ ...data, logos: [...data.logos, { name: "" }] });
  };

  const removeLogo = (index: number) => {
    if (!data) return;
    setData({ ...data, logos: data.logos.filter((_, i) => i !== index) });
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  if (error) return <div className="p-8 text-destructive text-sm">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logo Bar</h1>
          <p className="text-muted-foreground mt-1">Manage heading, subtext, and partner logos.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Heading</label>
            <input
              type="text"
              value={data.heading}
              onChange={(e) => update("heading", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Subtext</label>
            <input
              type="text"
              value={data.subtext}
              onChange={(e) => update("subtext", e.target.value)}
              className="input-modern w-full"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Logos</h2>
          <button onClick={addLogo} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Logo
          </button>
        </div>
        <div className="space-y-3">
          {data.logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={logo.name}
                onChange={(e) => update(`logos.${i}.name`, e.target.value)}
                placeholder="Logo name"
                className="input-modern flex-1"
              />
              <button onClick={() => removeLogo(i)} className="btn-ghost text-destructive p-2">
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
