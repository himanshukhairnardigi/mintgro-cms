"use client";

import { useState, useEffect } from "react";
import { ChallengeData } from "@/lib/types";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import Modal from "@/components/admin/Modal";

const ICONS = ["BarChart3", "Users", "TrendingUp", "Shield", "Zap", "Target", "AlertCircle", "Globe"];

export default function ChallengesPage() {
  const [items, setItems] = useState<ChallengeData[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ChallengeData | null>(null);
  const [form, setForm] = useState({ icon: "BarChart3", problem: "", solution: "" });

  useEffect(() => {
    fetch("/api/challenges").then((r) => r.json()).then(setItems);
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ icon: "BarChart3", problem: "", solution: "" });
    setModal(true);
  };

  const openEdit = (item: ChallengeData) => {
    setEditing(item);
    setForm({ icon: item.icon, problem: item.problem, solution: item.solution });
    setModal(true);
  };

  const handleSave = async () => {
    let updated: ChallengeData[];
    if (editing) {
      updated = items.map((i) => (i.id === editing.id ? { ...i, ...form } : i));
    } else {
      updated = [...items, { id: `c${Date.now()}`, ...form }];
    }
    setItems(updated);
    await fetch("/api/challenges", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await fetch("/api/challenges", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{items.length} challenges configured</p>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Challenge
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4 rounded-xl border border-white/5 bg-card p-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-mono text-primary">{item.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-destructive/80 mb-0.5">Challenge</div>
              <h4 className="text-sm font-semibold mb-2">{item.problem}</h4>
              <div className="text-xs text-primary mb-0.5">Solution</div>
              <p className="text-xs text-muted-foreground">{item.solution}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-colors">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Challenge" : "New Challenge"}>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Icon</label>
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50">
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Problem</label>
            <input type="text" value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Solution</label>
            <textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 resize-none" />
          </div>
          <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> {editing ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
