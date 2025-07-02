
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
      icon: User,
      iconColor: "text-gray-500"
    },
    {
      title: "Active Pipeline",
      value: candidates.filter(c => c.stage !== 'Rejected' && c.stage !== 'Offer').length,
      icon: ChevronRight,
      iconColor: "text-gray-500"
    },
    {
      title: "High Fit Score",
      value: candidates.filter(c => c.fitScore >= 8.5).length,
      icon: Star,
      iconColor: "text-yellow-500"
    },
    {
      title: "Rejected (Low Fit)",
      value: candidates.filter(c => c.fitScore < 7.5).length,
      icon: AlertCircle,
      iconColor: "text-gray-500"
    }
  ];

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">{stat.title}</div>
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
            </div>
            <div className="p-2">
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
