"use client";

import { useState, useEffect } from "react";
import { StepData } from "@/lib/types";
import { Plus, Pencil, Trash2, Save, GripVertical } from "lucide-react";
import Modal from "@/components/admin/Modal";

const ICONS = ["UserPlus", "Settings", "Rocket", "BarChart3", "Zap", "CheckCircle", "Upload", "Search"];

export default function HowItWorksPage() {
  const [items, setItems] = useState<StepData[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<StepData | null>(null);
  const [form, setForm] = useState({ icon: "UserPlus", step: "01", title: "", desc: "" });

  useEffect(() => { fetch("/api/steps").then((r) => r.json()).then(setItems); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ icon: "UserPlus", step: String(items.length + 1).padStart(2, "0"), title: "", desc: "" });
    setModal(true);
  };
  const openEdit = (item: StepData) => { setEditing(item); setForm({ icon: item.icon, step: item.step, title: item.title, desc: item.desc }); setModal(true); };

  const handleSave = async () => {
    let updated: StepData[];
    if (editing) { updated = items.map((i) => (i.id === editing.id ? { ...i, ...form } : i)); }
    else { updated = [...items, { id: `s${Date.now()}`, ...form }]; }
    setItems(updated);
    await fetch("/api/steps", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await fetch("/api/steps", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{items.length} steps</p>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Step
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-xl border border-white/5 bg-card p-4">
            <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold gradient-text">{item.step}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.desc}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => openEdit(item)} className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Step" : "New Step"}>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Step Number</label>
            <input type="text" value={form.step} onChange={(e) => setForm({ ...form, step: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Icon</label>
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50">
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 resize-none" />
          </div>
          <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> {editing ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
