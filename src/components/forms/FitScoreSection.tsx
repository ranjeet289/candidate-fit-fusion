
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

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
    if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 7.5) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  const getFitScoreStatus = (score: number) => {
    if (score >= 8) return { text: "Excellent Match", color: "bg-green-100 text-green-800 border-green-200" };
    if (score >= 7.5) return { text: "Good Match", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    return { text: "Below Threshold - Will be Rejected", color: "bg-red-100 text-red-800 border-red-200" };
  };

  const status = getFitScoreStatus(fitScore);

  return (
    <Card className="p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">AI Fit Score Analysis</h3>
        {getFitScoreIcon(fitScore)}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Calculated Fit Score:</span>
          <span className={`text-2xl font-bold ${getFitScoreColor(fitScore)}`}>
            {fitScore}/10
          </span>
        </div>
        
        <Badge className={`w-full justify-center py-2 ${status.color}`}>
          {status.text}
        </Badge>
        
        {fitScore < 7.5 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">
              <strong>Warning:</strong> This candidate's fit score is below the 7.5 threshold. 
              If submitted, they will be automatically marked as rejected and won't be added to the active pipeline.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
