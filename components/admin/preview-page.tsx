"use client";

import { useState, useEffect } from "react";
import { Eye, ExternalLink, RefreshCw } from "lucide-react";
import type { SiteData, HeaderData, LogoBarData, HeroData, ChallengesData, CRMFeatureData, IndustryData, PersonalizationData, ExperienceData, StepData, PricingData, FAQData, CTASectionData } from "@/lib/types";

export default function PreviewPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const load = () => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(() => {
        return Promise.all([
          fetch("/api/header").then((r) => r.json()),
          fetch("/api/logobar").then((r) => r.json()),
          fetch("/api/hero").then((r) => r.json()),
          fetch("/api/challenges").then((r) => r.json()),
          fetch("/api/crm").then((r) => r.json()),
          fetch("/api/industries").then((r) => r.json()),
          fetch("/api/personalization").then((r) => r.json()),
          fetch("/api/experience").then((r) => r.json()),
          fetch("/api/steps").then((r) => r.json()),
          fetch("/api/pricing").then((r) => r.json()),
          fetch("/api/faq").then((r) => r.json()),
          fetch("/api/cta").then((r) => r.json()),
        ]).then(([header, logoBar, hero, challenges, crm, industries, personalization, experience, steps, pricing, faq, ctaSection]) => ({
          header, logoBar, hero, challenges, crm, industries, personalization, experience, steps, pricing, faq, ctaSection,
        }));
      })
      .then((d) => setData(d as SiteData));
  };

  useEffect(() => { load(); }, []);

  if (!data) return <div className="p-8 text-muted-foreground text-xs animate-pulse">Loading preview...</div>;

  const sections: { id: keyof SiteData; label: string }[] = [
    { id: "header", label: "Header" },
    { id: "logoBar", label: "Logo Bar" },
    { id: "hero", label: "Hero" },
    { id: "challenges", label: "Challenges" },
    { id: "crm", label: "CRM" },
    { id: "industries", label: "Industries" },
    { id: "personalization", label: "Personalization" },
    { id: "experience", label: "Experience" },
    { id: "steps", label: "Steps" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "ctaSection", label: "CTA" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Live Preview</h2>
          <p className="text-xs text-muted-foreground mt-1">Preview all sections with current CMS data</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-secondary"><RefreshCw className="w-4 h-4" /> Refresh</button>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="btn-primary"><ExternalLink className="w-4 h-4" /> Open Live Site</a>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setActive(null)} className={`text-[10px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${!active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"}`}>
          All Sections
        </button>
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} className={`text-[10px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${active === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="bg-[#111] px-4 py-2.5 border-b border-white/[0.04] flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground font-mono">mintgro.com</span>
        </div>

        <div className="p-6 space-y-0">
          {(active ? sections.filter((s) => s.id === active) : sections).map((s) => (
            <PreviewSection key={s.id} id={s.id} label={s.label} data={data[s.id]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ id, label, data }: { id: keyof SiteData; label: string; data: SiteData[keyof SiteData] }) {
  if (!data) return null;

  const renderContent = () => {
    switch (id) {
      case "header": {
        const d = data as HeaderData;
        return (
          <div className="space-y-2">
            <div className="font-semibold text-sm">{d.logo?.text}</div>
            <div className="flex gap-3 text-[10px] text-muted-foreground">
              {d.navLinks?.map((l, i) => <span key={i}>{l.label}</span>)}
            </div>
            <div className="text-[10px] text-primary">{d.ctaButton?.label}</div>
          </div>
        );
      }
      case "logoBar": {
        const d = data as LogoBarData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-muted-foreground">{d.heading}</div>
            <div className="flex gap-4 text-[10px]">{d.logos?.map((l, i) => <span key={i} className="text-muted-foreground/50">{l.name}</span>)}</div>
          </div>
        );
      }
      case "hero": {
        const d = data as HeroData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-lg font-bold">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.description}</div>
            <div className="flex gap-2 text-[10px]"><span className="text-primary">{d.ctaPrimary?.label}</span><span className="text-muted-foreground">{d.ctaSecondary?.label}</span></div>
            <div className="flex gap-2 text-[10px] text-muted-foreground/50">{d.trustBadges?.map((b, i) => <span key={i}>✓ {b}</span>)}</div>
          </div>
        );
      }
      case "challenges": {
        const d = data as ChallengesData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="grid grid-cols-2 gap-4 text-[10px]">
              <div><div className="text-red-400 font-medium mb-1">Problems</div>{d.problems?.map((p, i) => <div key={i} className="text-muted-foreground">• {p}</div>)}</div>
              <div><div className="text-primary font-medium mb-1">Solutions</div>{d.solutions?.map((s, i) => <div key={i} className="text-muted-foreground">✓ {s}</div>)}</div>
            </div>
          </div>
        );
      }
      case "crm": {
        const d = data as CRMFeatureData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block">{d.badge}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.description}</div>
            <div className="text-[10px] text-primary font-medium">{d.categoryLabel}</div>
            <div className="text-xs">{d.featureTitle}</div>
            <div className="flex gap-3 text-[10px] text-muted-foreground">{d.featureList?.map((f, i) => <span key={i}>• {f.label}</span>)}</div>
          </div>
        );
      }
      case "industries": {
        const d = data as IndustryData[];
        return (
          <div className="flex flex-wrap gap-3">
            {d.map((ind) => (
              <div key={ind.id} className="text-[10px] px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="font-medium">{ind.name}</span>
              </div>
            ))}
          </div>
        );
      }
      case "personalization": {
        const d = data as PersonalizationData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.categoryLabel}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.description}</div>
            <div className="grid grid-cols-2 gap-2">{d.features?.map((f) => <div key={f.id} className="text-[10px] text-muted-foreground">• {f.title}</div>)}</div>
          </div>
        );
      }
      case "experience": {
        const d = data as ExperienceData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.description}</div>
            <div className="flex gap-4 text-[10px] text-muted-foreground">{d.stats?.map((s, i) => <span key={i}>{s.label}: <strong className="text-foreground">{s.value}</strong></span>)}</div>
          </div>
        );
      }
      case "steps": {
        const d = data as StepData[];
        return (
          <div className="flex gap-4">{d.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <div className="text-[10px] text-primary font-mono">{step.step}</div>
              <div className="text-xs font-medium mt-1">{step.title}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</div>
            </div>
          ))}</div>
        );
      }
      case "pricing": {
        const d = data as PricingData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="flex gap-3">{d.tiers?.map((t) => (
              <div key={t.id} className={`flex-1 text-center p-3 rounded-xl border text-[10px] ${t.popular ? "border-primary/30 bg-primary/5" : "border-white/[0.06]"}`}>
                <div className="font-medium">{t.name}</div>
                <div className="text-lg font-bold mt-1">{t.price !== null ? `$${t.price}` : "Custom"}</div>
                <div className="text-muted-foreground">{t.priceLabel}</div>
              </div>
            ))}</div>
          </div>
        );
      }
      case "faq": {
        const d = data as FAQData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="space-y-1">{d.items?.map((item) => (
              <div key={item.id} className="text-[10px] text-muted-foreground">Q: {item.question}</div>
            ))}</div>
          </div>
        );
      }
      case "ctaSection": {
        const d = data as CTASectionData;
        return (
          <div className="space-y-2">
            <div className="text-[10px] text-primary font-medium">{d.eyebrow}</div>
            <div className="text-sm font-bold">{d.title}</div>
            <div className="text-xs text-muted-foreground">{d.description}</div>
            <div className="flex gap-2 text-[10px]"><span className="text-primary">{d.ctaPrimary?.label}</span><span className="text-muted-foreground">{d.ctaSecondary?.label}</span></div>
          </div>
        );
      }
      default:
        return <div className="text-[10px] text-muted-foreground">No preview available</div>;
    }
  };

  return (
    <div className="py-5 border-b border-white/[0.04] last:border-0">
      <div className="text-[9px] text-muted-foreground/50 uppercase tracking-widest mb-2">{label}</div>
      {renderContent()}
    </div>
  );
}
