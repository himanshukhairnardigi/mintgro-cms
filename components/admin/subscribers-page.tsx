"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import Toast from "@/components/admin/Toast";
import type { Subscriber } from "@/lib/types";

export default function SubscribersPage() {
  const [data, setData] = useState<Subscriber[]>([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    fetch("/api/subscribers").then((r) => r.json()).then(setData);
  }, []);

  const addSubscriber = async () => {
    if (!newEmail.trim()) return;
    const res = await fetch("/api/subscribers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newEmail }) });
    const updated = await res.json();
    setData(updated);
    setNewEmail("");
    setToast({ show: true, message: "Subscriber added" });
  };

  const removeSubscriber = async (id: string) => {
    const updated = data.filter((s) => s.id !== id);
    setData(updated);
    await fetch("/api/subscribers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setToast({ show: true, message: "Subscriber removed" });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Subscribers</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage email subscribers ({data.length} total)</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 space-y-4">
        <h3 className="text-sm font-semibold">Add Subscriber</h3>
        <div className="flex gap-3">
          <input className="input-modern flex-1" type="email" placeholder="email@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSubscriber()} />
          <button onClick={addSubscriber} className="btn-primary"><Plus className="w-4 h-4" /> Add</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-6">
        <div className="space-y-3">
          {data.map((sub) => (
            <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{sub.email}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{sub.date}</div>
              </div>
              <button onClick={() => removeSubscriber(sub.id)} className="btn-danger p-2"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {data.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No subscribers yet</p>}
        </div>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  );
}
