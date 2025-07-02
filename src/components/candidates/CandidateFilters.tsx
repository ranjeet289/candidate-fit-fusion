
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CandidateFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  stageFilter: string;
  setStageFilter: (stage: string) => void;
}

export default function CandidateFilters({ 
  searchTerm, 
  setSearchTerm, 
  stageFilter, 
  setStageFilter 
}: CandidateFiltersProps) {
  const stages = ['all', 'Active', 'Submitted to AM', 'Submitted to Client', 'Sendout', 'Next Interview', 'Final Interview', 'Offer', 'Rejected'];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search candidates, roles, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            Stage: {stageFilter === 'all' ? 'All' : stageFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background border shadow-lg">
          {stages.map((stage) => (
            <DropdownMenuItem
              key={stage}
              onClick={() => setStageFilter(stage)}
              className="cursor-pointer"
            >
              {stage === 'all' ? 'All Stages' : stage}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
