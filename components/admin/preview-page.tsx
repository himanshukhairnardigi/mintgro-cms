"use client";

import { useState, useEffect } from "react";
import type {
  SiteData,
  HeaderData,
  LogoBarData,
  HeroData,
  ChallengesData,
  CRMFeatureData,
  IndustryData,
  PersonalizationData,
  ExperienceData,
  StepData,
  PricingData,
  FAQData,
  CTASectionData,
} from "@/lib/types";
import { RefreshCw, Loader2, ExternalLink } from "lucide-react";

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

function PreviewSection({ id, label, data }: { id: string; label: string; data: SiteData[keyof SiteData] }) {
  const renderContent = () => {
    switch (id) {
      case "header": {
        const d = data as HeaderData;
        return (
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-foreground">{d.logo?.text}</span>
              <span className="text-xs text-muted-foreground ml-2">{d.logo?.tagline}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {d.navLinks?.map((link, i) => (
                <span key={i}>{link.label}</span>
              ))}
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg">{d.ctaButton?.label}</span>
            </div>
          </div>
        );
      }
      case "logoBar": {
        const d = data as LogoBarData;
        return (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{d.heading}</p>
            <div className="flex items-center justify-center gap-4 text-xs text-foreground/60">
              {d.logos?.map((logo, i) => (
                <span key={i} className="px-2 py-1 rounded bg-white/[0.04]">{logo.name}</span>
              ))}
            </div>
          </div>
        );
      }
      case "hero": {
        const d = data as HeroData;
        return (
          <div className="space-y-2 text-center">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-xs text-muted-foreground max-w-lg mx-auto">{d.description}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg">{d.ctaPrimary?.label}</span>
              <span className="border border-white/[0.1] text-xs px-3 py-1.5 rounded-lg">{d.ctaSecondary?.label}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              {d.trustBadges?.map((badge, i) => (
                <span key={i} className="text-[10px] text-muted-foreground">{badge}</span>
              ))}
            </div>
          </div>
        );
      }
      case "challenges": {
        const d = data as ChallengesData;
        return (
          <div className="space-y-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs font-medium text-red-400 mb-1">Problems</p>
                {d.problems?.map((p, i) => (
                  <p key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" /> {p}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-400 mb-1">Solutions</p>
                {d.solutions?.map((s, i) => (
                  <p key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" /> {s}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case "crm": {
        const d = data as CRMFeatureData;
        return (
          <div className="space-y-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.badge}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-xs text-muted-foreground">{d.description}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {d.featureList?.map((f, i) => (
                <span key={i} className="text-xs bg-white/[0.04] px-2 py-1 rounded-lg">{f.icon} {f.label}</span>
              ))}
            </div>
          </div>
        );
      }
      case "industries": {
        const d = data as IndustryData[];
        return (
          <div className="flex flex-wrap gap-2">
            {d?.map((ind) => (
              <span key={ind.id} className="text-xs bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                {ind.icon} {ind.name}
              </span>
            ))}
          </div>
        );
      }
      case "personalization": {
        const d = data as PersonalizationData;
        return (
          <div className="space-y-2">
            <span className="text-xs text-primary">{d.categoryLabel}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {d.features?.map((f) => (
                <span key={f.id} className="text-xs bg-white/[0.04] px-2 py-1 rounded-lg">{f.icon} {f.title}</span>
              ))}
            </div>
          </div>
        );
      }
      case "experience": {
        const d = data as ExperienceData;
        return (
          <div className="space-y-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <div className="flex gap-4 mt-1">
              {d.stats?.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "steps": {
        const d = data as StepData[];
        return (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {d?.map((step) => (
              <div key={step.id} className="flex items-center gap-3 shrink-0">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {step.step}
                </span>
                <span className="text-xs text-foreground">{step.title}</span>
              </div>
            ))}
          </div>
        );
      }
      case "pricing": {
        const d = data as PricingData;
        return (
          <div className="space-y-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {d.tiers?.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    tier.popular ? "border-primary/30 bg-primary/5" : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <p className="font-medium text-foreground">{tier.name}</p>
                  <p className="text-lg font-bold text-foreground">
                    {tier.price === null ? "Custom" : `$${tier.price}`}
                    {tier.price !== null && <span className="text-[10px] text-muted-foreground font-normal">{tier.priceLabel}</span>}
                  </p>
                  <p className="text-muted-foreground text-[10px]">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "faq": {
        const d = data as FAQData;
        return (
          <div className="space-y-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <div className="space-y-1 mt-1">
              {d.items?.map((item) => (
                <p key={item.id} className="text-xs text-muted-foreground bg-white/[0.02] rounded-lg px-3 py-2">
                  {item.question}
                </p>
              ))}
            </div>
          </div>
        );
      }
      case "ctaSection": {
        const d = data as CTASectionData;
        return (
          <div className="space-y-2 text-center">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{d.eyebrow}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">{d.description}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg">{d.ctaPrimary?.label}</span>
              <span className="border border-white/[0.1] text-xs px-3 py-1.5 rounded-lg">{d.ctaSecondary?.label}</span>
            </div>
          </div>
        );
      }
      default:
        return <p className="text-xs text-muted-foreground">No preview available</p>;
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card p-6">
      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
      {renderContent()}
    </div>
  );
}

export default function PreviewPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
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
    ]).then(
      ([header, logoBar, hero, challenges, crm, industries, personalization, experience, steps, pricing, faq, ctaSection]) => {
        setData({
          header,
          logoBar,
          hero,
          challenges,
          crm,
          industries,
          personalization,
          experience,
          steps,
          pricing,
          faq,
          ctaSection,
          subscribers: [],
          settings: { siteName: "", siteDescription: "", contactEmail: "" },
        });
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    Promise.all([
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
    ]).then(
      ([header, logoBar, hero, challenges, crm, industries, personalization, experience, steps, pricing, faq, ctaSection]) => {
        setData({
          header, logoBar, hero, challenges, crm, industries, personalization, experience, steps, pricing, faq, ctaSection,
          subscribers: [],
          settings: { siteName: "", siteDescription: "", contactEmail: "" },
        });
        setLoading(false);
      }
    );
  }, []);

  const displaySections = active ? sections.filter((s) => s.id === active) : sections;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Site Preview</h1>
          <p className="text-muted-foreground mt-1">Preview all sections of your site</p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <button onClick={fetchAll} disabled={loading} className="btn-secondary flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Live Site
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            !active ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08]"
          }`}
        >
          All Sections
        </button>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              active === s.id ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : !data ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load preview data</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displaySections.map((s) => (
            <PreviewSection key={s.id} id={s.id} label={s.label} data={data[s.id]} />
          ))}
        </div>
      )}
    </div>
  );
}
