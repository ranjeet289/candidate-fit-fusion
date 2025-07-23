import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Briefcase, MapPin, UserPlus, User } from "lucide-react";
import { useEntities } from "@/context/EntityContext";

interface CandidateJobMatch {
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  matchScore: number;
  reasons: string[];
}

interface CandidateMatchesProps {
  candidateJobMatches?: CandidateJobMatch[];
  selectedCandidateName?: string;
  handleAddToOutreach: (candidateId: string, jobId: string) => void;
}

export default function CandidateMatches({ 
  candidateJobMatches, 
  selectedCandidateName,
  handleAddToOutreach 
}: CandidateMatchesProps) {
  const { candidates, jobs } = useEntities();

  // Get best 10 candidates overall
  const getBest10Candidates = () => {
    return candidates
      .sort((a, b) => b.fit - a.fit)
      .slice(0, 10)
      .map(candidate => {
        // Find best matching job for this candidate
        const bestJob = jobs
          .sort((a, b) => b.fit - a.fit)
          .find(job => job.fit >= 7) || jobs[0]; // Get high-fit job or fallback to first

        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidateTitle: candidate.title,
          jobId: bestJob.id,
          jobTitle: bestJob.title,
          companyName: bestJob.company,
          matchScore: candidate.fit,
          reasons: [
            "Technical skills alignment",
            "Experience level match", 
            "Industry background",
            "Cultural fit indicators"
          ]
        };
      });
  };

  const topCandidates = getBest10Candidates();

  return (
    <Card className="p-8 bg-card shadow-xl border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Smart Candidate Matches</h3>
        <p className="text-muted-foreground">
          Top 10 candidates across all positions
        </p>
      </div>
      
      <div className="space-y-4">
        {topCandidates.map((candidate) => (
          <div key={candidate.candidateId} className="p-6 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{candidate.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">{candidate.candidateTitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {candidate.matchScore.toFixed(1)}/10 Overall Score
                  </Badge>
                </div>
                
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Match Position:</p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{candidate.jobTitle} at {candidate.companyName}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Strengths:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.reasons.map((reason, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => handleAddToOutreach(candidate.candidateId, candidate.jobId)}
                className="flex items-center gap-2 min-w-[140px]"
                size="sm"
              >
                <UserPlus className="w-4 h-4" />
                Add to Pipeline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}