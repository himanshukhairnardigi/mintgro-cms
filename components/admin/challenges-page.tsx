"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, X } from "lucide-react";
import { ChallengesData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function ChallengesPage() {
  const [data, setData] = useState<ChallengesData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/challenges")
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
      setData(copy as ChallengesData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/challenges", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "Challenges saved" });
  };

  const addProblem = () => {
    if (!data) return;
    setData({ ...data, problems: [...data.problems, ""] });
  };

  const removeProblem = (index: number) => {
    if (!data) return;
    setData({ ...data, problems: data.problems.filter((_, i) => i !== index) });
  };

  const addSolution = () => {
    if (!data) return;
    setData({ ...data, solutions: [...data.solutions, ""] });
  };

  const removeSolution = (index: number) => {
    if (!data) return;
    setData({ ...data, solutions: data.solutions.filter((_, i) => i !== index) });
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
          <h1 className="text-2xl font-bold text-foreground">Challenges Section</h1>
          <p className="text-muted-foreground mt-1">Manage problems and solutions content.</p>
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
            <label className="text-sm text-muted-foreground">Eyebrow</label>
            <input
              type="text"
              value={data.eyebrow}
              onChange={(e) => update("eyebrow", e.target.value)}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-red-400">Problems</h2>
            <button onClick={addProblem} className="btn-secondary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {data.problems.map((problem, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono shrink-0 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={problem}
                  onChange={(e) => {
                    const next = [...data.problems];
                    next[i] = e.target.value;
                    setData({ ...data, problems: next });
                  }}
                  placeholder="Problem statement"
                  className="input-modern flex-1"
                />
                <button onClick={() => removeProblem(i)} className="btn-ghost text-destructive p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-green-400">Solutions</h2>
            <button onClick={addSolution} className="btn-secondary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {data.solutions.map((solution, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono shrink-0 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={solution}
                  onChange={(e) => {
                    const next = [...data.solutions];
                    next[i] = e.target.value;
                    setData({ ...data, solutions: next });
                  }}
                  placeholder="Solution statement"
                  className="input-modern flex-1"
                />
                <button onClick={() => removeSolution(i)} className="btn-ghost text-destructive p-2">
                  <X className="w-4 h-4" />
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
