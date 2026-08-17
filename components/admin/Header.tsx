"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search } from "lucide-react";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/header": "Header / Navigation",
  "/admin/hero": "Hero Section",
  "/admin/logo-bar": "Logo Bar",
  "/admin/challenges": "Challenges",
  "/admin/crm": "CRM & Features",
  "/admin/industries": "Industries",
  "/admin/personalization": "Personalization",
  "/admin/experience": "Experience",
  "/admin/steps": "How It Works",
  "/admin/pricing": "Pricing Plans",
  "/admin/faq": "FAQ",
  "/admin/cta": "CTA / Contact",
  "/admin/subscribers": "Subscribers",
  "/admin/settings": "Settings",
  "/admin/preview": "Live Preview",
};

const subtitles: Record<string, string> = {
  "/admin": "Overview of your site content",
  "/admin/header": "Manage navigation links and logo",
  "/admin/hero": "Edit homepage hero content",
  "/admin/logo-bar": "Manage trusted-by logo bar",
  "/admin/challenges": "Manage challenges & solutions",
  "/admin/crm": "Manage CRM spotlight & feature list",
  "/admin/industries": "Configure industry cards",
  "/admin/personalization": "Edit personalization features",
  "/admin/experience": "Manage experience showcase",
  "/admin/steps": "Manage onboarding steps",
  "/admin/pricing": "Edit pricing tiers & features",
  "/admin/faq": "Manage frequently asked questions",
  "/admin/cta": "Edit call-to-action section",
  "/admin/subscribers": "View & export subscribers",
  "/admin/settings": "Global site configuration",
  "/admin/preview": "Preview your live site",
};

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = titles[pathname] || "Admin";
  const subtitle = subtitles[pathname] || "";

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-white/[0.04] bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl hover:bg-white/[0.06] flex items-center justify-center transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
          <p className="text-[10px] text-muted-foreground hidden sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-muted-foreground">
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="text-[9px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded ml-2">⌘K</kbd>
        </div>

        <button className="w-9 h-9 rounded-xl hover:bg-white/[0.06] flex items-center justify-center transition-colors relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-[10px] font-bold text-white ml-1">
          A
        </div>
      </div>
    </header>
  );
}
