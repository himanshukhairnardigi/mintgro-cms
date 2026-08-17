"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { HeaderData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function HeaderPage() {
  const [data, setData] = useState<HeaderData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/header")
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
      setData(copy as HeaderData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/header", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Header saved" });
    } catch {
      setError("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const addNavLink = () => {
    if (!data) return;
    setData({
      ...data,
      navLinks: [...data.navLinks, { label: "", href: "", hasDropdown: false }],
    });
  };

  const removeNavLink = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      navLinks: data.navLinks.filter((_, i) => i !== index),
    });
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  if (error) return <div className="p-8 text-destructive text-sm">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Header / Navigation</h1>
          <p className="text-muted-foreground mt-1">Manage your site logo, navigation links, and CTA button.</p>
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
        <h2 className="text-lg font-semibold text-foreground">Logo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Logo Text</label>
            <input
              type="text"
              value={data.logo.text}
              onChange={(e) => update("logo.text", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Tagline</label>
            <input
              type="text"
              value={data.logo.tagline}
              onChange={(e) => update("logo.tagline", e.target.value)}
              className="input-modern w-full"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Navigation Links</h2>
          <button onClick={addNavLink} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>
        <div className="space-y-3">
          {data.navLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={link.label}
                onChange={(e) => update(`navLinks.${i}.label`, e.target.value)}
                placeholder="Label"
                className="input-modern flex-1"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => update(`navLinks.${i}.href`, e.target.value)}
                placeholder="Href"
                className="input-modern flex-1"
              />
              <label className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <input
                  type="checkbox"
                  checked={link.hasDropdown}
                  onChange={(e) => update(`navLinks.${i}.hasDropdown`, e.target.checked)}
                  className="rounded border-border"
                />
                Dropdown
              </label>
              <button onClick={() => removeNavLink(i)} className="btn-ghost text-destructive p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">CTA Button</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Button Label</label>
            <input
              type="text"
              value={data.ctaButton.label}
              onChange={(e) => update("ctaButton.label", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Button Href</label>
            <input
              type="text"
              value={data.ctaButton.href}
              onChange={(e) => update("ctaButton.href", e.target.value)}
              className="input-modern w-full"
            />
          </div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
