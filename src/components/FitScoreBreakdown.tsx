
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
    { key: 'culture', label: 'Culture', value: fitBreakdown.culture },
    { key: 'location', label: 'Location', value: fitBreakdown.location }
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Overall Fit</span>
        <Badge variant="outline" className="text-xs font-bold">{overallFit}</Badge>
      </div>
      <div className="space-y-0.5">
        {categories.map(category => (
          <div key={category.key} className="flex items-center justify-between gap-2 text-xs leading-none">
            <span className="min-w-0 flex-shrink-0 w-14 text-muted-foreground">{category.label}</span>
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <Progress 
                value={category.value * 10} 
                className="flex-1 h-0.5"
              />
              <span className="font-medium min-w-[1rem] text-right text-xs">
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
