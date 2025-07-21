
import { Badge } from "@/components/ui/badge";
import { FitScoreBreakdown as FitBreakdown } from "@/context/EntityContext";

interface Props {
  fitBreakdown: FitBreakdown;
  overallFit: number;
}

const FitScoreBreakdown: React.FC<Props> = ({ fitBreakdown, overallFit }) => {
  const categories = [
    { key: 'education', label: 'Education', value: fitBreakdown.education, color: 'bg-blue-100 text-blue-800' },
    { key: 'experience', label: 'Experience', value: fitBreakdown.experience, color: 'bg-green-100 text-green-800' },
    { key: 'skills', label: 'Skills', value: fitBreakdown.skills, color: 'bg-purple-100 text-purple-800' },
    { key: 'culture', label: 'Culture', value: fitBreakdown.culture, color: 'bg-orange-100 text-orange-800' },
    { key: 'location', label: 'Location', value: fitBreakdown.location, color: 'bg-pink-100 text-pink-800' }
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
      
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <div key={category.key} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${category.color.includes('blue') ? 'bg-blue-500' : 
                category.color.includes('green') ? 'bg-green-500' :
                category.color.includes('purple') ? 'bg-purple-500' :
                category.color.includes('orange') ? 'bg-orange-500' : 'bg-pink-500'}`} />
              <span className="text-xs font-medium text-muted-foreground">{category.label}</span>
            </div>
            <Badge variant="outline" className={`text-xs ${getScoreColor(category.value)}`}>
              {category.value}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitScoreBreakdown;
