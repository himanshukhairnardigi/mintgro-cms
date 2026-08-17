"use client";

import { useState, useEffect } from "react";
import type { SiteSettings } from "@/lib/types";
import { Save, Loader2, RotateCcw } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

export default function SettingsPage() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((d) => setData(d))
      .catch(() => setFetchError("Failed to load settings"));
  }, []);

  const update = (path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)) as SiteSettings;
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
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Settings saved" });
    } catch {
      setToast({ show: true, message: "Failed to save settings" });
    }
    setSaving(false);
  };

  const reset = async () => {
    if (!confirm("Reset all data to defaults? This cannot be undone.")) return;
    setResetting(true);
    try {
      await fetch("/api/settings", { method: "DELETE" });
      const fresh = await fetch("/api/settings").then((r) => {
        if (!r.ok) throw new Error("Failed to reset");
        return r.json();
      });
      setData(fresh);
      setToast({ show: true, message: "Data reset to defaults" });
    } catch {
      setToast({ show: true, message: "Failed to reset data" });
    }
    setResetting(false);
  };

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, message: "" }), 2500);
    return () => clearTimeout(t);
  }, [toast.show]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        {fetchError ? (
          <p className="text-destructive text-sm">{fetchError}</p>
        ) : (
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        )}
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
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage site settings and data</p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Site Name</label>
            <input
              value={data.siteName}
              onChange={(e) => update("siteName", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Site Description</label>
            <input
              value={data.siteDescription}
              onChange={(e) => update("siteDescription", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Contact Email</label>
            <input
              type="email"
              value={data.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="input-modern w-full"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
        <p className="text-sm text-muted-foreground">
          Reset all data to factory defaults. This action is irreversible.
        </p>
        <button
          onClick={reset}
          disabled={resetting}
          className="btn-danger flex items-center gap-2"
        >
          {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
          Reset All Data
        </button>
      </div>
    </div>
  );
}
