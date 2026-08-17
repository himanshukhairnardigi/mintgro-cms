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
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-up">
      <div className="glass-panel flex items-center gap-3 px-4 py-3 rounded-xl border border-border shadow-lg">
        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
        <span className="text-sm text-foreground">{message}</span>
        <button onClick={onClose} className="ml-2 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
