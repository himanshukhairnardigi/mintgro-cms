import { getData } from "@/lib/store";
import StatsCard from "@/components/admin/StatsCard";
import { Type, AlertTriangle, Boxes, DollarSign, HelpCircle, Mail, Building2, ListOrdered, Eye, Users, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Edit Hero", href: "/admin/hero", icon: Type, color: "primary" as const },
  { label: "CRM & Features", href: "/admin/crm", icon: Boxes, color: "blue" as const },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign, color: "purple" as const },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle, color: "amber" as const },
  { label: "Industries", href: "/admin/industries", icon: Building2, color: "primary" as const },
  { label: "Preview", href: "/admin/preview", icon: Eye, color: "blue" as const },
];

export default function DashboardPage() {
  const data = getData();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      <div className="rounded-2xl border border-white/[0.06] bg-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Welcome back</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">Mintgro <span className="gradient-text">Dashboard</span></h2>
          <p className="text-xs text-muted-foreground">Manage all your site content from one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard icon={Globe} label="Sections" value={14} change="+5" positive color="primary" />
        <StatsCard icon={Boxes} label="Industries" value={data.industries.length} color="blue" />
        <StatsCard icon={DollarSign} label="Pricing Tiers" value={data.pricing.tiers.length} color="purple" />
        <StatsCard icon={Mail} label="Subscribers" value={data.subscribers.length} change="+12%" positive color="amber" />
      </div>

      <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-card p-5 md:p-6">
          <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-primary/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${link.color === "primary" ? "bg-primary/10" : link.color === "blue" ? "bg-blue-500/10" : link.color === "purple" ? "bg-purple-500/10" : "bg-amber-500/10"} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className={`w-5 h-5 ${link.color === "primary" ? "text-primary" : link.color === "blue" ? "text-blue-400" : link.color === "purple" ? "text-purple-400" : "text-amber-400"}`} />
                </div>
                <span className="text-xs font-medium text-center">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-card p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Subscribers</h3>
            <Link href="/admin/subscribers" className="text-[10px] text-primary hover:text-primary-light transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {data.subscribers.slice(-5).reverse().map((sub) => (
              <div key={sub.id} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{sub.email}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{sub.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card p-5 md:p-6">
        <h3 className="text-sm font-semibold mb-5">Content Overview</h3>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
          {[
            { label: "Hero", value: "1", href: "/admin/hero", icon: Type },
            { label: "Challenges", value: `${data.challenges.problems.length}p`, href: "/admin/challenges", icon: AlertTriangle },
            { label: "Industries", value: data.industries.length, href: "/admin/industries", icon: Building2 },
            { label: "Steps", value: data.steps.length, href: "/admin/steps", icon: ListOrdered },
            { label: "Pricing", value: data.pricing.tiers.length, href: "/admin/pricing", icon: DollarSign },
            { label: "FAQ", value: data.faq.items.length, href: "/admin/faq", icon: HelpCircle },
            { label: "Subs", value: data.subscribers.length, href: "/admin/subscribers", icon: Mail },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="group text-center p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-primary/20 transition-all duration-300">
              <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" />
              <div className="text-xl font-bold gradient-text">{item.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
