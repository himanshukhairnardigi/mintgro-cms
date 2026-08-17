import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color?: "primary" | "blue" | "purple" | "amber";
}

const colorMap: Record<NonNullable<StatsCardProps["color"]>, { bg: string; text: string; ring: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", ring: "ring-purple-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20" },
};

export default function StatsCard({ icon: Icon, label, value, color = "primary" }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className="cms-section-card group">
      <div className="flex items-center gap-4">
        <div className={`cms-stat-ring ${c.bg} ring-1 ${c.ring} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  );
}
