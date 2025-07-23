
import { Badge } from "@/components/ui/badge";
import { FitScoreBreakdown as FitBreakdown } from "@/context/EntityContext";

interface Props {
  fitBreakdown: FitBreakdown;
  overallFit: number;
}

const FitScoreBreakdown: React.FC<Props> = ({ fitBreakdown, overallFit }) => {
  const categories = [
    { key: 'education', label: 'Education', value: fitBreakdown.education },
    { key: 'careerTrajectory', label: 'Career Trajectory', value: fitBreakdown.careerTrajectory },
    { key: 'companyRelevance', label: 'Company Relevance', value: fitBreakdown.companyRelevance },
    { key: 'tenureStability', label: 'Tenure Stability', value: fitBreakdown.tenureStability },
    { key: 'mostImportantSkills', label: 'Most Important Skills', value: fitBreakdown.mostImportantSkills },
    { key: 'bonusSignals', label: 'Bonus Signals', value: fitBreakdown.bonusSignals },
    { key: 'redFlags', label: 'Red Flags', value: fitBreakdown.redFlags },
    { key: 'location', label: 'Location', value: fitBreakdown.location }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 8) return 'text-blue-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Overall Fit Score</span>
        <Badge variant="secondary" className={`text-sm font-bold ${getScoreColor(overallFit)}`}>
          {overallFit}/10
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {categories.map(category => (
          <div key={category.key} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{category.label}:</span>
            <span className={`font-medium ${getScoreColor(category.value)}`}>
              {category.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitScoreBreakdown;
