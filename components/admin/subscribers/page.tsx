"use client";

import { useState, useEffect } from "react";
import { Subscriber } from "@/lib/types";
import { Trash2, Download, Mail, Search } from "lucide-react";

export default function SubscribersPage() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => { fetch("/api/subscribers").then((r) => r.json()).then(setItems); }, []);

  const handleDelete = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await fetch("/api/subscribers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  const handleExport = () => {
    const csv = "email,date\n" + items.map((s) => `${s.email},${s.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = items.filter((s) => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{items.length} subscribers</p>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 border border-white/5 hover:bg-white/5 text-xs px-3 py-2 rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by email..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
      </div>
      <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          <span>Email</span>
          <span>Date</span>
          <span className="w-7" />
        </div>
        <div className="divide-y divide-white/5">
          {filtered.map((sub) => (
            <div key={sub.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-5 py-3 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs truncate">{sub.email}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">{sub.date}</span>
              <button onClick={() => handleDelete(sub.id)} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center transition-colors">
                <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
          {filtered.length === 0 && <p className="px-5 py-8 text-xs text-muted-foreground text-center">No subscribers found.</p>}
        </div>
      </div>
    </div>
  );
}
