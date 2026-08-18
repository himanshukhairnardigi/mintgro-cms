import {
  Type,
  AlertTriangle,
  Boxes,
  DollarSign,
  HelpCircle,
  Mail,
  Building2,
  ListOrdered,
  Eye,
  Sparkles,
  Globe,
  MonitorSmartphone,
  Megaphone,
  ArrowRight,
  Image,
} from "lucide-react";
import Link from "next/link";
import { getData } from "@/lib/store";
import StatsCard from "@/components/admin/StatsCard";

const sections = [
  {
    name: "Header / Nav",
    desc: "Nav links and branding",
    href: "/admin/header",
    icon: Globe,
    count: null,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    name: "Hero",
    desc: "Main hero area",
    href: "/admin/hero",
    icon: Type,
    count: null,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    name: "Logo Bar",
    desc: "Social proof logos",
    href: "/admin/logo-bar",
    icon: Image,
    count: null,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    name: "Challenges",
    desc: "Problems & solutions",
    href: "/admin/challenges",
    icon: AlertTriangle,
    count: null,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "CRM & Features",
    desc: "Feature modules",
    href: "/admin/crm",
    icon: Boxes,
    count: null,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Industries",
    desc: "Industry cards",
    href: "/admin/industries",
    icon: Building2,
    countKey: "industries" as const,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Personalization",
    desc: "Team features",
    href: "/admin/personalization",
    icon: Sparkles,
    count: null,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Experience",
    desc: "Device preview",
    href: "/admin/experience",
    icon: MonitorSmartphone,
    count: null,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    name: "Steps",
    desc: "How it works",
    href: "/admin/steps",
    icon: ListOrdered,
    countKey: "steps" as const,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Pricing",
    desc: "Plans & pricing",
    href: "/admin/pricing",
    icon: DollarSign,
    countKey: "pricing" as const,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "FAQ",
    desc: "Questions & answers",
    href: "/admin/faq",
    icon: HelpCircle,
    countKey: "faq" as const,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "CTA / Contact",
    desc: "Call to action",
    href: "/admin/cta",
    icon: Megaphone,
    count: null,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function AdminDashboard() {
  const data = getData();

  const getCount = (s: (typeof sections)[number]): number | null => {
    if (s.countKey === "industries") return data.industries.length;
    if (s.countKey === "steps") return data.steps.length;
    if (s.countKey === "pricing") return data.pricing.tiers.length;
    if (s.countKey === "faq") return data.faq.items.length;
    return s.count ?? null;
  };

  const totalItems =
    data.industries.length +
    data.steps.length +
    data.pricing.tiers.length +
    data.faq.items.length +
    data.challenges.problems.length +
    data.subscribers.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="cms-section-card bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                Mintgro CMS
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
              {data.settings.siteDescription || "Manage your site content from one place."}
            </p>
          </div>
          <Link
            href="/admin/preview"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
            Preview Site
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Boxes} label="Sections" value={14} color="primary" />
        <StatsCard icon={Building2} label="Industries" value={data.industries.length} color="blue" />
        <StatsCard icon={DollarSign} label="Pricing Tiers" value={data.pricing.tiers.length} color="purple" />
        <StatsCard icon={Mail} label="Subscribers" value={data.subscribers.length} color="amber" />
      </div>

      {/* Section Navigator */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Section Navigator</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((s) => {
            const count = getCount(s);
            return (
              <Link
                key={s.href}
                href={s.href}
                className="cms-section-card group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {s.name}
                      </h4>
                      {count !== null && (
                        <span className="text-xs font-semibold text-muted-foreground bg-gray-100 rounded-md px-1.5 py-0.5 shrink-0">
                          {count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscribers */}
        <div className="cms-section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Recent Subscribers
            </h3>
            <span className="text-xs text-muted-foreground bg-gray-100 rounded-md px-2 py-0.5">
              Last 5
            </span>
          </div>
          <div className="space-y-2">
            {data.subscribers
              .slice(-5)
              .reverse()
              .map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-border"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {sub.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{sub.email}</p>
                      <p className="text-xs text-muted-foreground">{sub.date}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            {data.subscribers.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No subscribers yet.</p>
            )}
          </div>
        </div>

        {/* Content Summary */}
        <div className="cms-section-card">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Content Summary
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: AlertTriangle, label: "Challenges", count: data.challenges.problems.length },
              { icon: Building2, label: "Industries", count: data.industries.length },
              { icon: ListOrdered, label: "Steps", count: data.steps.length },
              { icon: DollarSign, label: "Pricing Tiers", count: data.pricing.tiers.length },
              { icon: HelpCircle, label: "FAQ Items", count: data.faq.items.length },
              { icon: Mail, label: "Subscribers", count: data.subscribers.length },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-border"
              >
                <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total items</p>
            <p className="text-lg font-bold text-foreground">{totalItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
