"use client";

import { useState, useEffect } from "react";
import type { Subscriber } from "@/lib/types";
import { Plus, Trash2, Save, Loader2, Mail } from "lucide-react";

interface Toast {
  show: boolean;
  message: string;
}

export default function SubscribersPage() {
  const [data, setData] = useState<Subscriber[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>({ show: false, message: "" });
  const [newEmail, setNewEmail] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/subscribers")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((d) => setData(d))
      .catch(() => setFetchError("Failed to load subscribers"));
  }, []);

  const addSubscriber = async () => {
    if (!newEmail.trim()) return;
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add subscriber");
      const sub: Subscriber = await res.json();
      const updated = data ? [...data, sub] : [sub];
      setData(updated);
      setNewEmail("");
      setToast({ show: true, message: "Subscriber added" });
      await fetch("/api/subscribers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch {
      setToast({ show: true, message: "Failed to add subscriber" });
    }
  };

  const removeSubscriber = async (id: string) => {
    const updated = data ? data.filter((s) => s.id !== id) : [];
    setData(updated);
    try {
      const res = await fetch("/api/subscribers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Subscriber removed" });
    } catch {
      setToast({ show: true, message: "Failed to save after removal" });
    }
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/subscribers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setToast({ show: true, message: "Subscribers saved" });
    } catch {
      setToast({ show: true, message: "Failed to save subscribers" });
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
    <div className="space-y-6 animate-fade-up">
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-emerald-500/90 backdrop-blur text-white px-5 py-3 text-sm font-medium shadow-lg animate-fade-up">
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subscribers</h1>
          <p className="text-muted-foreground mt-1">Manage newsletter subscribers</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 self-start">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Add Subscriber</h2>
        <div className="flex items-center gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubscriber()}
            placeholder="email@example.com"
            className="input-modern flex-1"
          />
          <button onClick={addSubscriber} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Subscribers ({data.length})</h2>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No subscribers yet.</p>
        ) : (
          <div className="space-y-2">
            {data.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-background/50 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-foreground">{sub.email}</span>
                    <span className="text-xs text-muted-foreground ml-3">
                      {new Date(sub.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeSubscriber(sub.id)} className="btn-ghost text-destructive p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
