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
} from "lucide-react";
import Link from "next/link";
import { getData } from "@/lib/store";
import StatsCard from "@/components/admin/StatsCard";

const quickActions = [
  { label: "Edit Hero", href: "/admin/hero", icon: Type, bg: "bg-primary/10", text: "text-primary" },
  { label: "CRM & Features", href: "/admin/crm", icon: Boxes, bg: "bg-blue-500/10", text: "text-blue-500" },
  { label: "Pricing Plans", href: "/admin/pricing", icon: DollarSign, bg: "bg-purple-500/10", text: "text-purple-500" },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle, bg: "bg-amber-500/10", text: "text-amber-500" },
  { label: "Industries", href: "/admin/industries", icon: Building2, bg: "bg-blue-500/10", text: "text-blue-500" },
  { label: "Preview Site", href: "/admin/preview", icon: Eye, bg: "bg-primary/10", text: "text-primary" },
];

export default function AdminDashboard() {
  const data = getData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Welcome to <span className="gradient-text">Mintgro CMS</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your site content from one place.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Boxes} label="Sections" value={14} change="+2 this week" positive color="primary" />
        <StatsCard icon={Building2} label="Industries" value={data.industries.length} color="blue" />
        <StatsCard icon={DollarSign} label="Pricing Tiers" value={data.pricing.tiers.length} color="purple" />
        <StatsCard icon={Mail} label="Subscribers" value={data.subscribers.length} change="+1 today" positive color="amber" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className={`p-2 rounded-lg ${action.bg}`}>
                <action.icon className={`w-5 h-5 ${action.text}`} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl border border-border p-5">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Recent Subscribers
          </h3>
          <div className="space-y-2">
            {data.subscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {sub.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub.email}</p>
                    <p className="text-xs text-muted-foreground">{sub.date}</p>
                  </div>
                </div>
              </div>
            ))}
            {data.subscribers.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No subscribers yet.</p>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-border p-5">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Content Overview
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Type, label: "Hero", count: 1 },
              { icon: AlertTriangle, label: "Challenges", count: data.challenges.problems.length },
              { icon: Building2, label: "Industries", count: data.industries.length },
              { icon: ListOrdered, label: "Steps", count: data.steps.length },
              { icon: DollarSign, label: "Pricing", count: data.pricing.tiers.length },
              { icon: HelpCircle, label: "FAQ", count: data.faq.items.length },
              { icon: Mail, label: "Subscribers", count: data.subscribers.length },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-border">
                <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
