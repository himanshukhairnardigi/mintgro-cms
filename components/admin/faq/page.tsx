"use client";

import { useState, useEffect } from "react";
import { FAQItem } from "@/lib/types";
import { Plus, Save, ChevronDown } from "lucide-react";
import Modal from "@/components/admin/Modal";

export default function FAQPage() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState({ question: "", answer: "" });

  useEffect(() => { fetch("/api/faq").then((r) => r.json()).then(setItems); }, []);

  const openNew = () => { setEditing(null); setForm({ question: "", answer: "" }); setModal(true); };
  const openEdit = (item: FAQItem) => { setEditing(item); setForm({ question: item.question, answer: item.answer }); setModal(true); };

  const handleSave = async () => {
    let updated: FAQItem[];
    if (editing) { updated = items.map((i) => (i.id === editing.id ? { ...i, ...form } : i)); }
    else { updated = [...items, { id: `q${Date.now()}`, ...form }]; }
    setItems(updated);
    await fetch("/api/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await fetch("/api/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{items.length} FAQ items</p>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add FAQ
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/5 bg-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="w-full flex items-center justify-between p-4 text-left">
              <span className="text-sm font-medium pr-4">{item.question}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expanded === item.id ? "rotate-180" : ""}`} />
            </button>
            {expanded === item.id && (
              <div className="px-4 pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{item.answer}</p>
                <div className="flex gap-1.5 mt-3">
                  <button onClick={() => openEdit(item)} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                  <span className="text-muted-foreground/30">|</span>
                  <button onClick={() => handleDelete(item.id)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit FAQ" : "New FAQ"}>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Question</label>
            <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Answer</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-lg bg-input border border-white/5 text-sm focus:outline-none focus:border-primary/50 resize-none" />
          </div>
          <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> {editing ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
