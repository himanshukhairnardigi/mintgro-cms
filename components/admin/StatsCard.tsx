import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  color?: "primary" | "blue" | "purple" | "amber";
}

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
};

export default function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  color = "primary",
}: StatsCardProps) {
  const c = colorMap[color] ?? colorMap.primary;

  return (
    <div className={`glass-card p-5 rounded-xl border border-border ${c.glow}`}>
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-lg ${c.bg}`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {change && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              positive ? "text-primary" : "text-destructive"
            }`}
          >
            {positive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}
