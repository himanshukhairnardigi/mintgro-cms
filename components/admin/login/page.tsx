"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      await new Promise((r) => setTimeout(r, 600));
      if (email === "admin@mintgro.com" && password === "admin123") {
        document.cookie = "session=valid; path=/; SameSite=Lax";
        router.push("/admin");
      } else {
        setError("Invalid credentials. Try again.");
        setShake(true);
        setLoading(false);
        setTimeout(() => setShake(false), 400);
      }
    },
    [email, password, router]
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className={`w-full max-w-md relative z-10 ${shake ? "animate-shake" : ""}`}>
        <div className="glass-panel rounded-2xl border border-border p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Mintgro CMS</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mintgro.com"
                  className="input-modern w-full pl-10 pr-4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-modern w-full pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-white/[0.02] border border-border">
            <p className="text-xs text-muted-foreground text-center">
              Demo:{" "}
              <span className="font-mono text-foreground">admin@mintgro.com</span> /{" "}
              <span className="font-mono text-foreground">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
