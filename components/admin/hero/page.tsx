"use client";

import { useState, useEffect } from "react";
import { HeroData } from "@/lib/types";
import { Save } from "lucide-react";

export default function HeroPage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json()).then(setHero);
  }, []);

  const handleSave = async () => {
    if (!hero) return;
    await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hero) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!hero) return <div className="text-sm text-muted-foreground">Loading...</div>;

  const fields: { key: keyof HeroData; label: string; multiline?: boolean }[] = [
    { key: "badge", label: "Badge Text" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Gradient Subtitle" },
    { key: "description", label: "Description", multiline: true },
    { key: "ctaPrimary", label: "Primary CTA" },
    { key: "ctaSecondary", label: "Secondary CTA" },
    { key: "stat1Value", label: "Stat 1 Value" },
    { key: "stat1Label", label: "Stat 1 Label" },
    { key: "stat2Value", label: "Stat 2 Value" },
    { key: "stat2Label", label: "Stat 2 Label" },
    { key: "stat3Value", label: "Stat 3 Value" },
    { key: "stat3Label", label: "Stat 3 Label" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Edit the hero section content for your homepage.</p>
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
              <textarea value={hero[f.key]} onChange={(e) => setHero({ ...hero, [f.key]: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            ) : (
              <input type="text" value={hero[f.key]} onChange={(e) => setHero({ ...hero, [f.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
