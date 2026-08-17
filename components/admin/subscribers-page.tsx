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

  useEffect(() => {
    fetch("/api/subscribers")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const addSubscriber = async () => {
    if (!newEmail.trim()) return;
    const res = await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail.trim() }),
    });
    const sub: Subscriber = await res.json();
    setData((prev) => {
      if (!prev) return prev;
      return [...prev, sub];
    });
    setNewEmail("");
    setToast({ show: true, message: "Subscriber added" });
  };

  const removeSubscriber = (id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return prev.filter((s) => s.id !== id);
    });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/subscribers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setToast({ show: true, message: "Subscribers saved" });
  };

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, message: "" }), 2500);
    return () => clearTimeout(t);
  }, [toast.show]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
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
          <button onClick={addSubscriber} className="btn-primary flex items-center gap-2">
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
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-background/50">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-foreground">{sub.email}</span>
                    <span className="text-xs text-muted-foreground ml-3">
                      {new Date(sub.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeSubscriber(sub.id)} className="btn-ghost text-destructive p-1">
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
