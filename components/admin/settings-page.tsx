"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { SiteSettings } from "@/lib/types";

export default function SettingsPage() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="p-8 text-muted-foreground text-xs animate-pulse">Loading...</div>;

  const update = (field: string, value: string) => setData({ ...data, [field]: value });

  const save = async () => {
    setSaving(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast({ show: true, message: "Settings saved" });
  };

  const reset = async () => {
    if (!confirm("Reset all data to defaults? This cannot be undone.")) return;
    setResetting(true);
    await fetch("/api/settings", { method: "DELETE" });
    const fresh = await fetch("/api/settings").then((r) => r.json());
    setData(fresh);
    setResetting(false);
    setToast({ show: true, message: "Data reset to defaults" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Settings</h2>
          <p className="text-xs text-muted-foreground mt-1">Global site configuration</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} disabled={resetting} className="btn-danger"><RotateCcw className="w-4 h-4" /> {resetting ? "Resetting..." : "Reset All Data"}</button>
          <button onClick={save} disabled={saving} className="btn-primary"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-5">
        <h3 className="text-sm font-semibold">General</h3>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Site Name</label>
          <input className="input-modern" value={data.siteName} onChange={(e) => update("siteName", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Site Description</label>
          <input className="input-modern" value={data.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Contact Email</label>
          <input className="input-modern" type="email" value={data.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
