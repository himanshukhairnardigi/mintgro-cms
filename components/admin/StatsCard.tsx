import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  color?: "primary" | "blue" | "purple" | "amber";
}

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", glow: "shadow-[0_0_20px_rgba(16,185,129,0.12)]" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.12)]" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-[0_0_20px_rgba(168,85,247,0.12)]" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-[0_0_20px_rgba(245,158,11,0.12)]" },
};

export default function StatsCard({ icon: Icon, label, value, change, positive = true, color = "primary" }: StatsCardProps) {
  const c = colorMap[color];

  return (
    <div className={`rounded-2xl border border-white/[0.06] bg-card p-5 ${c.glow} card-hover`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-[10px] font-medium ${positive ? "text-primary" : "text-destructive"}`}>
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}