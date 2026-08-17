"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (show) {
      timerRef.current = setTimeout(onClose, 2500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#111] border border-primary/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-slide-right">
      <CheckCircle className="w-4 h-4 text-primary" />
      <span className="text-xs font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center">
        <X className="w-3 h-3 text-muted-foreground" />
      </button>
    </div>
  );
}
