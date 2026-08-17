"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Globe,
  Type,
  Image,
  AlertTriangle,
  Boxes,
  Building2,
  Sparkles,
  MonitorSmartphone,
  ListOrdered,
  DollarSign,
  HelpCircle,
  Megaphone,
  Mail,
  Settings,
  Eye,
  ChevronLeft,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { icon: LayoutDashboard, href: "/admin", label: "Dashboard" },
  { icon: Globe, href: "/admin/header", label: "Header / Nav" },
  { icon: Type, href: "/admin/hero", label: "Hero" },
  { icon: Image, href: "/admin/logo-bar", label: "Logo Bar" },
  { icon: AlertTriangle, href: "/admin/challenges", label: "Challenges" },
  { icon: Boxes, href: "/admin/crm", label: "CRM & Features" },
  { icon: Building2, href: "/admin/industries", label: "Industries" },
  { icon: Sparkles, href: "/admin/personalization", label: "Personalization" },
  { icon: MonitorSmartphone, href: "/admin/experience", label: "Experience" },
  { icon: ListOrdered, href: "/admin/steps", label: "Steps" },
  { icon: DollarSign, href: "/admin/pricing", label: "Pricing" },
  { icon: HelpCircle, href: "/admin/faq", label: "FAQ" },
  { icon: Megaphone, href: "/admin/cta", label: "CTA / Contact" },
  { icon: Mail, href: "/admin/subscribers", label: "Subscribers" },
  { icon: Settings, href: "/admin/settings", label: "Settings" },
  { icon: Eye, href: "/admin/preview", label: "Preview" },
];

function SidebarContent({ collapsed, onToggleCollapse, onLogout }: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-border ${collapsed ? "justify-center" : ""}`}>
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">Mintgro</span>
            <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">CMS</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={onToggleCollapse}
          className={`hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ChevronLeft className={`w-4.5 h-4.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span>Collapse</span>}
        </button>

        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-destructive/80 hover:text-destructive hover:bg-destructive/5 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "session=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-sidebar border-r border-border transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "lg:w-[68px]" : "lg:w-64"} w-64`}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}
