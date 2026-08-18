"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { ChallengesData } from "@/lib/types";
import Toast from "@/components/admin/Toast";

export default function ChallengesPage() {
  const [data, setData] = useState<ChallengesData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/challenges")
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
      setData(copy as ChallengesData);
    },
    [data]
  );

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/challenges", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Challenges saved" });
    } catch {
      setError("Failed to save data");
    } finally {
      setSaving(false);
    }
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

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

  if (error) return <div className="p-8 text-destructive text-sm">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Challenges Section</h1>
          <p className="text-muted-foreground mt-1">Manage problems and solutions content.</p>
        </div>
        <div className="self-start">
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Content</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Eyebrow</label>
            <input
              type="text"
              value={data.eyebrow}
              onChange={(e) => update("eyebrow", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              className="input-modern w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Description</label>
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
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
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
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
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
