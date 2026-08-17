"use client";

import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setSettings); }, []);

  const handleSave = async () => {
    if (!settings) return;
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) return <div className="text-sm text-muted-foreground">Loading...</div>;

  const fields: { key: keyof SiteSettings; label: string; multiline?: boolean }[] = [
    { key: "siteName", label: "Site Name" },
    { key: "siteDescription", label: "Site Description" },
    { key: "contactEmail", label: "Contact Email" },
    { key: "contactPhone", label: "Contact Phone" },
    { key: "contactAddress", label: "Contact Address" },
    { key: "twitterUrl", label: "Twitter URL" },
    { key: "linkedinUrl", label: "LinkedIn URL" },
    { key: "githubUrl", label: "GitHub URL" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Configure global site settings.</p>
        <button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Save className="w-3.5 h-3.5" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
      <div className="rounded-xl border border-white/5 bg-card p-6 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
            {f.multiline ? (
              <textarea value={settings[f.key]} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            ) : (
              <input type="text" value={settings[f.key]} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
