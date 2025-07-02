
import { Card } from "@/components/ui/card";
import { User, ChevronRight, Star, AlertCircle } from "lucide-react";

interface CandidateStatsCardsProps {
  candidates: any[];
}

export default function CandidateStatsCards({ candidates }: CandidateStatsCardsProps) {
  const stats = [
    {
      title: "Total Candidates",
      value: candidates.length,
      icon: User
    },
    {
      title: "Active Pipeline",
      value: candidates.filter(c => c.stage !== 'Rejected' && c.stage !== 'Offer').length,
      icon: ChevronRight
    },
    {
      title: "High Fit Score",
      value: candidates.filter(c => c.fitScore >= 8.5).length,
      icon: Star
    },
    {
      title: "Rejected (Low Fit)",
      value: candidates.filter(c => c.fitScore < 7.5).length,
      icon: AlertCircle
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{stat.title}</div>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </Card>
      ))}
    </div>
  );
}
