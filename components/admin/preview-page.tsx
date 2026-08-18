"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import {
  RefreshCw,
  Loader2,
  ExternalLink,
  Pencil,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

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

const sectionEditLinks: Record<string, string> = {
  header: "/admin/header",
  logoBar: "/admin/logo-bar",
  hero: "/admin/hero",
  challenges: "/admin/challenges",
  crm: "/admin/crm",
  industries: "/admin/industries",
  personalization: "/admin/personalization",
  experience: "/admin/experience",
  steps: "/admin/steps",
  pricing: "/admin/pricing",
  faq: "/admin/faq",
  ctaSection: "/admin/cta",
};

function PreviewSection({
  id,
  label,
  data,
}: {
  id: string;
  label: string;
  data: SiteData[keyof SiteData];
}) {
  const renderContent = () => {
    switch (id) {
      // ─── Header Preview ───
      case "header": {
        const d = data as HeaderData;
        return (
          <div className="rounded-xl bg-[#f8faf9] border border-[#e5eae7] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-base text-foreground">
                  {d.logo?.text || "Mintgro"}
                </span>
                {d.logo?.tagline && (
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {d.logo.tagline}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-5">
                <div className="hidden md:flex items-center gap-4">
                  {d.navLinks?.map((link, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-foreground/70 hover:text-foreground transition-colors cursor-default"
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown className="inline w-3 h-3 ml-0.5 opacity-50" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="bg-[#008d69] text-white text-[11px] font-medium px-3.5 py-1.5 rounded-lg">
                  {d.ctaButton?.label || "Get Started"}
                </span>
              </div>
            </div>
          </div>
        );
      }

      // ─── Logo Bar Preview ───
      case "logoBar": {
        const d = data as LogoBarData;
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{d.heading}</p>
              {d.subtext && (
                <p className="text-xs text-muted-foreground mt-1">
                  {d.subtext}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3">
              {d.logos?.map((logo, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-foreground/30 tracking-wide uppercase"
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        );
      }

      // ─── Hero Preview ───
      case "hero": {
        const d = data as HeroData;
        const titleParts = (d.title || "").split(/(Mintgro)/i);
        return (
          <div className="rounded-xl bg-gradient-to-b from-[#f0fff8] to-transparent p-8 text-center space-y-4">
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-[#008d69]/10 text-[#008d69] px-3 py-1 rounded-full">
              {d.eyebrow}
            </span>
            <h2 className="text-2xl font-bold text-foreground leading-tight max-w-lg mx-auto">
              {titleParts.map((part, i) =>
                part.toLowerCase() === "mintgro" ? (
                  <span key={i} className="text-[#008d69]">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {d.description}
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="bg-[#008d69] text-white text-xs font-medium px-5 py-2.5 rounded-lg">
                {d.ctaPrimary?.label}
              </span>
              <span className="bg-white border border-[#e5eae7] text-foreground text-xs font-medium px-5 py-2.5 rounded-lg">
                {d.ctaSecondary?.label}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              {d.trustBadges?.map((badge, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#008d69]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        );
      }

      // ─── Challenges Preview ───
      case "challenges": {
        const d = data as ChallengesData;
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-[#008d69]/10 text-[#008d69] px-3 py-1 rounded-full">
                {d.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              {d.description && (
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {d.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#fff6f6] border border-[#f1dcdc] rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-[#c0392b] flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  What hurts
                </h4>
                <ul className="space-y-2">
                  {d.problems?.map((p, i) => (
                    <li
                      key={i}
                      className="text-xs text-foreground/70 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b]/50 mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f2fff9] border border-[#d9eee5] rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-[#008d69] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  What works
                </h4>
                <ul className="space-y-2">
                  {d.solutions?.map((s, i) => (
                    <li
                      key={i}
                      className="text-xs text-foreground/70 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008d69]/50 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }

      // ─── CRM Preview ───
      case "crm": {
        const d = data as CRMFeatureData;
        return (
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 space-y-4">
            <span className="cms-preview-eyebrow">{d.badge}</span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {d.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2.5">
                {d.featureList?.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-border"
                  >
                    <span className="text-base">{f.icon}</span>
                    <span className="text-xs text-foreground">{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 space-y-3 border border-border">
                <p className="cms-section-label">
                  {d.categoryLabel}
                </p>
                <h4 className="text-sm font-semibold text-foreground">{d.featureTitle}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {d.featureDescription}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {d.dashboardStats?.map((stat, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <p className="text-sm font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ─── Industries Preview ───
      case "industries": {
        const d = data as IndustryData[];
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {d?.map((ind) => (
              <div
                key={ind.id}
                className="rounded-xl border border-[#e5eae7] bg-[#fbfcfc] p-4 text-center space-y-2 hover:border-[#008d69]/30 transition-colors"
              >
                <span className="text-2xl">{ind.icon}</span>
                <p className="text-xs font-semibold text-foreground">
                  {ind.name}
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        );
      }

      // ─── Personalization Preview ───
      case "personalization": {
        const d = data as PersonalizationData;
        return (
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
              {d.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {d.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {d.features?.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-border rounded-xl p-4 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{f.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{f.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // ─── Experience Preview ───
      case "experience": {
        const d = data as ExperienceData;
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-[#008d69]/10 text-[#008d69] px-3 py-1 rounded-full">
                {d.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              {d.description && (
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {d.description}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-[#e5eae7] bg-[#fbfcfc] overflow-hidden">
              <div className="flex">
                <div className="w-40 bg-[#f0f4f2] border-r border-[#e5eae7] p-3 space-y-1.5">
                  {d.sidebarItems?.map((item, i) => (
                    <div
                      key={i}
                      className={`text-[10px] px-2.5 py-1.5 rounded-md ${
                        i === 0
                          ? "bg-[#008d69] text-white font-medium"
                          : "text-foreground/50"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {d.stats?.map((s, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg border border-[#e5eae7] p-3 text-center"
                      >
                        <p className="text-base font-bold text-foreground">
                          {s.value}
                        </p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg border border-[#e5eae7] p-3">
                    <div className="flex items-end gap-1.5 h-16">
                      {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-[#008d69]/20 rounded-t-sm"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Now"].map(
                        (day) => (
                          <span key={day} className="text-[8px] text-muted-foreground flex-1 text-center">
                            {day}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {d.devices?.map((device) => (
                <span
                  key={device}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                >
                  {device.toLowerCase().includes("desktop") && <Monitor className="w-3 h-3" />}
                  {device.toLowerCase().includes("tablet") && <Tablet className="w-3 h-3" />}
                  {device.toLowerCase().includes("mobile") && <Smartphone className="w-3 h-3" />}
                  {!device.toLowerCase().includes("desktop") &&
                    !device.toLowerCase().includes("tablet") &&
                    !device.toLowerCase().includes("mobile") && <Monitor className="w-3 h-3" />}
                  {device}
                </span>
              ))}
            </div>
          </div>
        );
      }

      // ─── Steps Preview ───
      case "steps": {
        const d = data as StepData[];
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {d?.map((step) => (
              <div key={step.id} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#008d69]/10 text-[#008d69] flex items-center justify-center text-sm font-bold mx-auto">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <span className="text-base">{step.icon}</span>
                  <p className="text-xs font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      }

      // ─── Pricing Preview ───
      case "pricing": {
        const d = data as PricingData;
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-[#008d69]/10 text-[#008d69] px-3 py-1 rounded-full">
                {d.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              {d.description && (
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {d.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {d.tiers?.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-xl p-4 space-y-2.5 border transition-colors ${
                    tier.popular
                      ? "border-[#008d69] bg-[#008d69]/5 shadow-sm shadow-[#008d69]/10"
                      : "border-[#e5eae7] bg-[#fbfcfc]"
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-block text-[9px] font-medium uppercase tracking-wider bg-[#008d69] text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <p className="text-xs font-semibold text-foreground">
                    {tier.name}
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {tier.price === null ? "Custom" : `$${tier.price}`}
                    {tier.price !== null && (
                      <span className="text-[10px] text-muted-foreground font-normal ml-1">
                        {tier.priceLabel}
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {tier.desc}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {tier.features?.slice(0, 4).map((f, i) => (
                      <li
                        key={i}
                        className="text-[10px] text-foreground/60 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#008d69] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={`block text-center text-[10px] font-medium py-1.5 rounded-lg mt-1 ${
                      tier.popular
                        ? "bg-[#008d69] text-white"
                        : "bg-[#f0f4f2] text-foreground"
                    }`}
                  >
                    {tier.cta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // ─── FAQ Preview ───
      case "faq": {
        const d = data as FAQData;
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-[#008d69]/10 text-[#008d69] px-3 py-1 rounded-full">
                {d.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              {d.description && (
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {d.description}
                </p>
              )}
            </div>
            <div className="space-y-2 max-w-2xl mx-auto">
              {d.items?.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#e5eae7] bg-[#fbfcfc] overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs font-medium text-foreground pr-2">
                      {item.question}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  </div>
                </div>
              ))}
            </div>
            {d.ctaButtons && d.ctaButtons.length > 0 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                {d.ctaButtons.map((btn, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium px-5 py-2 rounded-lg ${
                      btn.style === "primary"
                        ? "bg-[#008d69] text-white"
                        : "bg-white border border-[#e5eae7] text-foreground"
                    }`}
                  >
                    {btn.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }

      // ─── CTA Preview ───
      case "ctaSection": {
        const d = data as CTASectionData;
        return (
          <div className="rounded-2xl bg-gradient-to-br from-[#008d69] to-[#006b52] text-white p-8 text-center space-y-3">
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-white/20 text-white/80 px-3 py-1 rounded-full">
              {d.eyebrow}
            </span>
            <h3 className="text-xl font-bold">{d.title}</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              {d.description}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="bg-white text-[#008d69] text-xs font-semibold px-5 py-2.5 rounded-lg">
                {d.ctaPrimary?.label}
              </span>
              <span className="bg-white/20 border border-white/30 text-white text-xs font-medium px-5 py-2.5 rounded-lg">
                {d.ctaSecondary?.label}
              </span>
            </div>
          </div>
        );
      }

      default:
        return (
          <p className="text-xs text-muted-foreground text-center py-4">
            No preview available for this section
          </p>
        );
    }
  };

  return (
    <div className="cms-preview-section group">
      <div className="cms-preview-header">
        <p className="cms-section-label">{label}</p>
        <Link
          href={sectionEditLinks[id] || "#"}
          className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </Link>
      </div>
      {renderContent()}
    </div>
  );
}

export default function PreviewPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard data-fetching pattern
    setLoading(true);
    setError(null);
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
    ])
      .then(
        ([
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
        ]) => {
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
            settings: {
              siteName: "",
              siteDescription: "",
              contactEmail: "",
            },
          });
          setLoading(false);
        }
      )
      .catch(() => {
        setError("Failed to load preview");
        setLoading(false);
      });
  }, []);

  const displaySections = active
    ? sections.filter((s) => s.id === active)
    : sections;

  return (
    <div className="space-y-4 animate-fade-up">
      {/* ─── Actions Bar ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Live Site
          </a>
        </div>
      </div>

      {/* ─── Section Tabs ─── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            !active
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              active === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ─── Content ─── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#008d69]" />
          <p className="text-sm text-muted-foreground">Loading preview data...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-sm text-destructive">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-secondary text-xs">
            Try Again
          </button>
        </div>
      ) : !data ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-sm text-muted-foreground">No preview data available</p>
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
