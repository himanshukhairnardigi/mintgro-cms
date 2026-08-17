import { getData } from "@/lib/store";
import Link from "next/link";
import {
  Zap, BarChart3, Users, TrendingUp, Shield, Globe, Cpu, Layers, Lock,
  Building2, ShoppingCart, Stethoscope, GraduationCap, Factory, Landmark,
  UserPlus, Settings, Rocket, Check, X, Sparkles,
  Target, AlertCircle, Plane, Utensils, CheckCircle, Upload, Search,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BarChart3, Users, TrendingUp, Shield, Zap, Globe, Cpu, Layers, Lock,
  Building2, ShoppingCart, Stethoscope, GraduationCap, Factory, Landmark,
  UserPlus, Settings, Rocket, Target, Sparkles, AlertCircle, Plane, Utensils,
  CheckCircle, Upload, Search,
};

export default function PreviewPage() {
  const data = getData();
  const Icon = (name: string): LucideIcon => iconMap[name] || Zap;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">Live preview of your site content</p>
        <Link href="/" className="text-xs text-primary hover:text-primary-light" target="_blank">
          Open full site →
        </Link>
      </div>

      <div className="rounded-xl border border-white/10 bg-background overflow-hidden">
        <div className="p-8 space-y-12 max-w-4xl">
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-primary">{data.hero.badge}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{data.hero.title}</h1>
            <p className="text-sm text-muted-foreground mb-4">{data.hero.description}</p>
            <div className="flex gap-3">
              <button className="bg-primary text-white text-xs px-4 py-2 rounded-lg">{data.hero.ctaPrimary}</button>
              <button className="border border-white/10 text-xs px-4 py-2 rounded-lg">{data.hero.ctaSecondary}</button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-4">Challenges → Solutions</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.challenges.map((c) => (
                <div key={c.id} className="rounded-lg border border-white/5 bg-card p-4">
                  <div className="text-[10px] text-destructive mb-1">Challenge</div>
                  <h4 className="text-xs font-semibold mb-2">{c.problem}</h4>
                  <div className="text-[10px] text-primary mb-0.5">Solution</div>
                  <p className="text-[10px] text-muted-foreground">{c.solution}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-4">Features</h2>
            <div className="grid md:grid-cols-4 gap-2">
              {data.features.map((f) => {
                const Ic = Icon(f.icon);
                return (
                  <div key={f.id} className="rounded-lg border border-white/5 bg-card p-3">
                    <Ic className="w-4 h-4 text-primary mb-2" />
                    <h4 className="text-[11px] font-semibold mb-1">{f.title}</h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-4">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {data.pricing.map((p) => (
                <div key={p.id} className={`rounded-lg border p-4 ${p.popular ? "border-primary/50" : "border-white/5"}`}>
                  <h4 className="text-sm font-bold">{p.name}</h4>
                  <div className="text-xl font-bold mt-1">${p.price}/mo</div>
                  <div className="mt-2 space-y-1">
                    {p.features.slice(0, 4).map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5">
                        {f.included ? <Check className="w-2.5 h-2.5 text-primary" /> : <X className="w-2.5 h-2.5 text-muted-foreground/40" />}
                        <span className="text-[10px]">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
