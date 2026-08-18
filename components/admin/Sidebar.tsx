"use client";

import { useState, useRef, useEffect } from "react";
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
  Search,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, href: "/admin", label: "Dashboard" },
      { icon: Eye, href: "/admin/preview", label: "Preview" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: Globe, href: "/admin/header", label: "Header / Nav" },
      { icon: Type, href: "/admin/hero", label: "Hero" },
      { icon: Image, href: "/admin/logo-bar", label: "Logo Bar" },
      { icon: AlertTriangle, href: "/admin/challenges", label: "Challenges" },
      { icon: Boxes, href: "/admin/crm", label: "CRM & Features" },
      { icon: Building2, href: "/admin/industries", label: "Industries" },
      { icon: Sparkles, href: "/admin/personalization", label: "Personalization" },
      { icon: MonitorSmartphone, href: "/admin/experience", label: "Experience" },
      { icon: ListOrdered, href: "/admin/steps", label: "Steps" },
    ],
  },
  {
    label: "Business",
    items: [
      { icon: DollarSign, href: "/admin/pricing", label: "Pricing" },
      { icon: HelpCircle, href: "/admin/faq", label: "FAQ" },
      { icon: Megaphone, href: "/admin/cta", label: "CTA / Contact" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Mail, href: "/admin/subscribers", label: "Subscribers" },
      { icon: Settings, href: "/admin/settings", label: "Settings" },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

function SidebarTooltip({ children, label, show }: { children: React.ReactNode; label: string; show: boolean }) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setHovered(true), 400);
  };
  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(false);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  if (!show) return <>{children}</>;

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {hovered && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded-lg bg-white border border-border text-xs font-medium text-foreground whitespace-nowrap z-[60] shadow-md pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  collapsed,
  onToggleCollapse,
  onLogout,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = searchQuery
    ? [{
        label: "Results",
        items: allNavItems.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }]
    : navGroups;

  const isItemActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = () => {
    onCloseMobile();
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-border shrink-0 ${collapsed ? "justify-center" : ""}`}>
        <div className="p-2 rounded-lg bg-primary shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-base font-bold text-foreground truncate">Mintgro</span>
            <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded shrink-0">CMS</span>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-3 pt-3 pb-1">
          <div className="relative flex items-center gap-2 bg-gray-50 border border-border rounded-lg px-3 py-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none flex-1 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {filteredGroups.map((group) => {
          const visibleItems = group.items.filter((item) => isItemActive(item.href) || !searchQuery);
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.label} className="mb-1">
              {!collapsed && !searchQuery && (
                <div className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </div>
              )}
              {collapsed && !searchQuery && group.label !== filteredGroups[0]?.label && (
                <div className="mx-auto my-2 w-6 h-px bg-border" />
              )}
              {visibleItems.map((item) => {
                const active = isItemActive(item.href);
                const link = (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      collapsed ? "justify-center" : ""
                    } ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4.5 h-4.5 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );

                return collapsed ? (
                  <SidebarTooltip key={item.href} label={item.label} show={collapsed}>
                    {link}
                  </SidebarTooltip>
                ) : (
                  <div key={item.href}>{link}</div>
                );
              })}
            </div>
          );
        })}

        {searchQuery && filteredGroups[0]?.items.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="text-xs text-muted-foreground">No pages found</p>
          </div>
        )}
      </nav>

      <div className="p-2 border-t border-border space-y-0.5 shrink-0">
        <SidebarTooltip label={collapsed ? "Collapse sidebar" : ""} show={collapsed}>
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ChevronLeft className={`w-4.5 h-4.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </SidebarTooltip>

        <SidebarTooltip label={collapsed ? "Logout" : ""} show={collapsed}>
          <button
            onClick={onLogout}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </SidebarTooltip>
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
        className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-border transition-all duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "lg:w-[68px]" : "lg:w-64"} w-64`}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
          onLogout={handleLogout}
          onCloseMobile={onClose}
        />
      </aside>
    </>
  );
}
