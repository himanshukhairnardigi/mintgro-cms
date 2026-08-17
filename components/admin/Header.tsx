"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const titles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Overview of your site" },
  "/admin/header": { title: "Header / Navigation", subtitle: "Manage nav links and branding" },
  "/admin/hero": { title: "Hero Section", subtitle: "Edit the main hero area" },
  "/admin/logo-bar": { title: "Logo Bar", subtitle: "Social proof logos" },
  "/admin/challenges": { title: "Challenges", subtitle: "Problems & solutions section" },
  "/admin/crm": { title: "CRM & Features", subtitle: "Feature modules and stats" },
  "/admin/industries": { title: "Industries", subtitle: "Industry cards" },
  "/admin/personalization": { title: "Personalization", subtitle: "Personalization features" },
  "/admin/experience": { title: "Experience", subtitle: "Device preview section" },
  "/admin/steps": { title: "How It Works", subtitle: "Step-by-step process" },
  "/admin/pricing": { title: "Pricing Plans", subtitle: "Tiers and pricing" },
  "/admin/faq": { title: "FAQ", subtitle: "Frequently asked questions" },
  "/admin/cta": { title: "CTA / Contact", subtitle: "Call to action section" },
  "/admin/subscribers": { title: "Subscribers", subtitle: "Email subscribers" },
  "/admin/settings": { title: "Settings", subtitle: "Site configuration" },
  "/admin/preview": { title: "Live Preview", subtitle: "See your site live" },
};

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const page = titles[pathname] ?? { title: "Admin", subtitle: "" };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-foreground">{page.title}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{page.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-40"
            />
          </div>

          <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
