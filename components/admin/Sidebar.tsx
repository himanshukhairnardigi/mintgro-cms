"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Type, AlertTriangle, Boxes, Building2,
  ListOrdered, DollarSign, HelpCircle, Mail, Settings, Eye,
  Zap, LogOut, X, ChevronLeft, ChevronRight, Globe, Image,
  Sparkles, MonitorSmartphone, Megaphone,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Header / Nav", href: "/admin/header", icon: Globe },
  { label: "Hero", href: "/admin/hero", icon: Type },
  { label: "Logo Bar", href: "/admin/logo-bar", icon: Image },
  { label: "Challenges", href: "/admin/challenges", icon: AlertTriangle },
  { label: "CRM & Features", href: "/admin/crm", icon: Boxes },
  { label: "Industries", href: "/admin/industries", icon: Building2 },
  { label: "Personalization", href: "/admin/personalization", icon: Sparkles },
  { label: "Experience", href: "/admin/experience", icon: MonitorSmartphone },
  { label: "Steps", href: "/admin/steps", icon: ListOrdered },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "CTA / Contact", href: "/admin/cta", icon: Megaphone },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Preview", href: "/admin/preview", icon: Eye },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ mobileOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.04] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <span className="text-sm font-semibold tracking-tight">Mintgro</span>
              <span className="text-[9px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded-md ml-2">CMS</span>
            </div>
          )}
        </div>
        <button onClick={onClose} className="lg:hidden w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {nav.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-primary/[0.08] text-primary shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "" : "group-hover:text-foreground"}`} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-white/[0.04] shrink-0">
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>

        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/[0.06] transition-all duration-200 mt-1"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-white/[0.04] lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      <aside
        className={`hidden lg:block fixed top-0 bottom-0 left-0 z-30 bg-[#0d0d0d] border-r border-white/[0.04] transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
