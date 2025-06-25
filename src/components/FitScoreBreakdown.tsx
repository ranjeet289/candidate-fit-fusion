
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FitScoreBreakdown as FitBreakdown } from "@/context/EntityContext";

interface Props {
  fitBreakdown: FitBreakdown;
  overallFit: number;
}

const FitScoreBreakdown: React.FC<Props> = ({ fitBreakdown, overallFit }) => {
  const categories = [
    { key: 'education', label: 'Education', value: fitBreakdown.education },
    { key: 'experience', label: 'Experience', value: fitBreakdown.experience },
    { key: 'skills', label: 'Skills', value: fitBreakdown.skills },
    { key: 'culture', label: 'Culture Fit', value: fitBreakdown.culture },
    { key: 'location', label: 'Location', value: fitBreakdown.location }
  ];

  const getColorClass = (score: number) => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 7.5) return 'bg-blue-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Overall Fit Score</span>
        <Badge variant="outline" className="font-bold">{overallFit}</Badge>
      </div>
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category.key} className="flex items-center justify-between gap-3">
            <span className="text-sm min-w-0 flex-1">{category.label}</span>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Progress 
                value={category.value * 10} 
                className="flex-1 h-2"
              />
              <span className="text-xs font-medium min-w-[2rem] text-right">
                {category.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitScoreBreakdown;
