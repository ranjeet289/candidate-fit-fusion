
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface FitScoreSectionProps {
  fitScore: number;
}

export default function FitScoreSection({ fitScore }: FitScoreSectionProps) {
  const getFitScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600";
    if (score >= 8) return "text-blue-600";
    if (score >= 7.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getFitScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 7.5) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <AlertTriangle className="w-6 h-6 text-red-600" />;
  };

  const getFitScoreStatus = (score: number) => {
    if (score >= 8) return { text: "Excellent Match", color: "bg-green-100 text-green-800 border-green-200" };
    if (score >= 7.5) return { text: "Good Match", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    return { text: "Below Threshold - Will be Rejected", color: "bg-red-100 text-red-800 border-red-200" };
  };

  const status = getFitScoreStatus(fitScore);

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-2">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-primary/10">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">AI Fit Score Analysis</h3>
          <p className="text-sm text-muted-foreground">Comprehensive match evaluation</p>
        </div>
        {getFitScoreIcon(fitScore)}
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-background border-2">
            <span className="text-sm font-medium text-muted-foreground">Calculated Fit Score</span>
            <span className={`text-3xl font-bold ${getFitScoreColor(fitScore)}`}>
              {fitScore}/10
            </span>
          </div>
        </div>
        
        <Badge className={`w-full justify-center py-3 text-sm font-semibold ${status.color} border-2`}>
          {status.text}
        </Badge>
        
        {fitScore < 7.5 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">Warning: Below Threshold</p>
                <p className="text-sm text-red-700">
                  This candidate's fit score is below the 7.5 threshold. If submitted, they will be automatically marked as rejected and won't be added to the active pipeline.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
