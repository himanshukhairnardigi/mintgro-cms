import { getData } from "@/lib/store";
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
  ChevronDown,
  CheckCircle2,
  XCircle,
  Monitor,
  Tablet,
  Smartphone,
  Users,
  ChartColumn,
  TrendingUp,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  ShoppingBag,
  Factory,
  Building2,
  Sparkles,
  Target,
  Bell,
  UserPlus,
  Settings2,
  Rocket,
  ChartLine,
  Mail,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ChartColumn,
  TrendingUp,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  ShoppingBag,
  Factory,
  Building2,
  Sparkles,
  Target,
  Bell,
  UserPlus,
  Settings2,
  Rocket,
  ChartLine,
};

function SiteHeader({ data }: { data: HeaderData }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <span className="font-bold text-foreground">{data.logo?.text || "Mintgro"}</span>
            {data.logo?.tagline && (
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">
                {data.logo.tagline.replace("\n", " ")}
              </span>
            )}
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {data.navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
            </a>
          ))}
        </nav>
        <a
          href={data.ctaButton?.href || "#pricing"}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
        >
          {data.ctaButton?.label || "Get Started"}
        </a>
      </div>
    </header>
  );
}

function HeroSection({ data }: { data: HeroData }) {
  const titleParts = (data.title || "").split(/(Mintgro)/i);
  return (
    <section className="relative bg-gradient-to-b from-[#f0fff8] via-white to-white">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center space-y-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
          {data.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
          {titleParts.map((part, i) =>
            part.toLowerCase() === "mintgro" ? (
              <span key={i} className="text-primary">
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={data.ctaPrimary?.href || "#pricing"}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
          >
            {data.ctaPrimary?.label}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={data.ctaSecondary?.href || "#contact"}
            className="inline-flex items-center gap-2 bg-white border border-border hover:border-gray-300 text-foreground text-sm font-medium px-7 py-3.5 rounded-xl transition-all duration-200"
          >
            {data.ctaSecondary?.label}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {data.trustBadges?.map((badge, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoBarSection({ data }: { data: LogoBarData }) {
  return (
    <section className="py-12 border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-sm font-medium text-foreground">{data.heading}</p>
        {data.subtext && (
          <p className="text-sm text-muted-foreground">{data.subtext}</p>
        )}
        <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-4">
          {data.logos?.map((logo, i) => (
            <span key={i} className="text-lg font-bold text-foreground/20 tracking-wide uppercase">
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengesSection({ data }: { data: ChallengesData }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          {data.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 space-y-5">
            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              What hurts
            </h3>
            <ul className="space-y-3">
              {data.problems?.map((p, i) => (
                <li key={i} className="text-foreground/70 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 space-y-5">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              What works
            </h3>
            <ul className="space-y-3">
              {data.solutions?.map((s, i) => (
                <li key={i} className="text-foreground/70 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary/50 mt-2 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CRMSection({ data }: { data: CRMFeatureData }) {
  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
            {data.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            {data.featureList?.map((f, i) => {
              const Icon = iconMap[f.icon] || ChartColumn;
              return (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-border hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-2xl p-6 space-y-4 border border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{data.categoryLabel}</p>
            <h3 className="text-lg font-bold text-foreground">{data.featureTitle}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.featureDescription}</p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {data.dashboardStats?.map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection({ data }: { data: IndustryData[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Built for Your Industry</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Adaptable tools for teams, customers and processes across every industry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data?.map((ind) => {
            const Icon = iconMap[ind.icon] || Building2;
            return (
              <div key={ind.id} className="group rounded-2xl border border-border bg-white p-6 text-center space-y-3 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PersonalizationSection({ data }: { data: PersonalizationData }) {
  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {data.categoryLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.features?.map((f) => {
            const Icon = iconMap[f.icon] || Sparkles;
            return (
              <div key={f.id} className="bg-white border border-border rounded-2xl p-6 space-y-3 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ data }: { data: ExperienceData }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          {data.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-[#f8faf9] overflow-hidden max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[350px]">
            <div className="w-full lg:w-52 bg-white border-b lg:border-b-0 lg:border-r border-border p-4 space-y-2 flex lg:flex-col overflow-x-auto lg:overflow-x-auto scrollbar-none">
              {data.sidebarItems?.map((item, i) => (
                <div
                  key={i}
                  className={`text-sm px-3 py-2 rounded-lg ${
                    i === 0
                      ? "bg-primary text-white font-medium"
                      : "text-foreground/50 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex-1 p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {data.stats?.map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-border p-4">
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-primary/20 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Now"].map((day) => (
                    <span key={day} className="text-xs text-muted-foreground flex-1 text-center">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          {data.devices?.map((device) => (
            <span key={device} className="flex items-center gap-2 text-sm text-muted-foreground">
              {device.toLowerCase().includes("desktop") && <Monitor className="w-4 h-4" />}
              {device.toLowerCase().includes("tablet") && <Tablet className="w-4 h-4" />}
              {device.toLowerCase().includes("mobile") && <Smartphone className="w-4 h-4" />}
              {device}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection({ data }: { data: StepData[] }) {
  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in four simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {data?.map((step) => {
            const Icon = iconMap[step.icon] || Rocket;
            return (
              <div key={step.id} className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mx-auto">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ data }: { data: PricingData }) {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          {data.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.tiers?.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 space-y-5 border transition-all duration-300 ${
                tier.popular
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 relative z-10"
                  : "border-border bg-white hover:border-primary/20 hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary text-white px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
              <p className="text-3xl font-bold text-foreground">
                {tier.price === null ? "Custom" : `$${tier.price}`}
                {tier.price !== null && (
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    {tier.priceLabel}
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{tier.desc}</p>
              <ul className="space-y-2">
                {tier.features?.map((f, i) => (
                  <li key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 ${
                  tier.popular
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 text-foreground hover:bg-gray-200"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ data }: { data: FAQData }) {
  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary px-4 py-1.5 rounded-full">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{data.title}</h2>
          {data.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {data.items?.map((item) => (
            <details key={item.id} className="group rounded-2xl border border-border bg-white overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                <span className="text-sm font-semibold text-foreground pr-4">{item.question}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
        {data.ctaButtons && data.ctaButtons.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            {data.ctaButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.href || "#"}
                className={`text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 ${
                  btn.style === "primary"
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-white border border-border text-foreground hover:border-gray-300"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CTASection({ data }: { data: CTASectionData }) {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[#006b52] text-white p-12 sm:p-16 text-center space-y-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white/80 px-4 py-1.5 rounded-full">
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">{data.title}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={data.ctaPrimary?.href || "#pricing"}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              {data.ctaPrimary?.label}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={data.ctaSecondary?.href || "#contact"}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              {data.ctaSecondary?.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ settings }: { settings: SiteData["settings"] }) {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg">{settings?.siteName || "Mintgro"}</span>
            </div>
            <p className="text-white/60 text-sm max-w-sm">
              {settings?.siteDescription || "Business Growth Made Simple"}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {settings?.siteName || "Mintgro"}. All rights reserved.
          </p>
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="text-sm text-white/40 hover:text-white/60 flex items-center gap-2 transition-colors">
              <Mail className="w-4 h-4" />
              {settings.contactEmail}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const data: SiteData = getData();

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader data={data.header} />
      <main>
        <HeroSection data={data.hero} />
        <LogoBarSection data={data.logoBar} />
        <ChallengesSection data={data.challenges} />
        <CRMSection data={data.crm} />
        <IndustriesSection data={data.industries} />
        <PersonalizationSection data={data.personalization} />
        <ExperienceSection data={data.experience} />
        <StepsSection data={data.steps} />
        <PricingSection data={data.pricing} />
        <FAQSection data={data.faq} />
        <CTASection data={data.ctaSection} />
      </main>
      <SiteFooter settings={data.settings} />
    </div>
  );
}
