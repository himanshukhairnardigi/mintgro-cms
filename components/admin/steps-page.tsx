"use client";

import { useState, useEffect } from "react";
import type { StepData } from "@/lib/types";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function StepsPage() {
  const [data, setData] = useState<StepData[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/steps")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((d) => setData(d))
      .catch(() => setFetchError("Failed to load steps data"));
  }, []);

  const update = (path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)) as StepData[];
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

  const addStep = () => {
    setData((prev) => {
      if (!prev) return prev;
      return [
        ...prev,
        { id: uid(), icon: "Zap", step: String(prev.length + 1), title: "", desc: "" },
      ];
    });
  };

  const removeStep = (id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return prev.filter((s) => s.id !== id);
    });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/steps", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Steps saved" });
    } catch {
      setToast({ show: true, message: "Failed to save steps" });
    }
    setSaving(false);
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
          <h1 className="text-2xl font-bold text-foreground">Steps</h1>
          <p className="text-muted-foreground mt-1">Manage the step-by-step process section</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 self-start">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <div className="space-y-4">
          {data.map((step, i) => (
            <div key={step.id} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-background/50">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 flex-1">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Step</label>
                  <input
                    value={step.step}
                    onChange={(e) => update(`${i}.step`, e.target.value)}
                    className="input-modern w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Icon</label>
                  <input
                    value={step.icon}
                    onChange={(e) => update(`${i}.icon`, e.target.value)}
                    className="input-modern w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Title</label>
                  <input
                    value={step.title}
                    onChange={(e) => update(`${i}.title`, e.target.value)}
                    className="input-modern w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Description</label>
                  <input
                    value={step.desc}
                    onChange={(e) => update(`${i}.desc`, e.target.value)}
                    className="input-modern w-full"
                  />
                </div>
              </div>
              <button onClick={() => removeStep(step.id)} className="btn-ghost text-destructive mt-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addStep} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Step
        </button>
      </div>
    </div>
  );
}
