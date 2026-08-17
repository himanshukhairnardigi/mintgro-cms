"use client";

import { useState, useEffect } from "react";
import { IndustryData } from "@/lib/types";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import Modal from "@/components/admin/Modal";

const ICONS = ["Building2", "ShoppingCart", "Stethoscope", "GraduationCap", "Factory", "Landmark", "Plane", "Utensils"];

export default function IndustriesPage() {
  const [items, setItems] = useState<IndustryData[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<IndustryData | null>(null);
  const [form, setForm] = useState({ icon: "Building2", name: "", desc: "" });

  useEffect(() => { fetch("/api/industries").then((r) => r.json()).then(setItems); }, []);

  const openNew = () => { setEditing(null); setForm({ icon: "Building2", name: "", desc: "" }); setModal(true); };
  const openEdit = (item: IndustryData) => { setEditing(item); setForm({ icon: item.icon, name: item.name, desc: item.desc }); setModal(true); };

  const handleSave = async () => {
    let updated: IndustryData[];
    if (editing) { updated = items.map((i) => (i.id === editing.id ? { ...i, ...form } : i)); }
    else { updated = [...items, { id: `i${Date.now()}`, ...form }]; }
    setItems(updated);
    await fetch("/api/industries", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await fetch("/api/industries", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{items.length} industries</p>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Industry
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-card p-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-mono text-primary">{item.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold mb-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => openEdit(item)} className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center"><Trash2 className="w-3 h-3 text-muted-foreground" /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Industry" : "New Industry"}>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Icon</label>
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50">
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
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
