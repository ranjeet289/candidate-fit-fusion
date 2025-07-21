import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AgentStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  variant?: "default" | "success" | "warning" | "danger";
}

export default function AgentStatsCard({ 
  title, 
  value, 
  subtitle, 
  trend,
  variant = "default" 
}: AgentStatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "danger":
        return "border-red-200 bg-red-50";
      default:
        return "border-border bg-background";
    }
  };

  const getTrendColor = () => {
    return trend?.direction === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <Card className={`p-6 ${getVariantStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {trend.direction === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
}