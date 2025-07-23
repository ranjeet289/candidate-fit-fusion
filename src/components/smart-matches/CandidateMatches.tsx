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

  // Generate best candidates for each job
  const getBestCandidatesForJobs = () => {
    return jobs.map(job => {
      const jobCandidates = candidates.map(candidate => ({
        candidateId: candidate.id,
        candidateName: candidate.name,
        candidateTitle: candidate.title,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company,
        matchScore: candidate.fit, // Using candidate fit as match score
        reasons: [
          "Technical skills alignment",
          "Experience level match",
          "Industry background",
          "Cultural fit indicators"
        ]
      })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3); // Top 3 candidates per job

      return {
        job,
        topCandidates: jobCandidates
      };
    });
  };

  const jobCandidateMatches = getBestCandidatesForJobs();

  return (
    <Card className="p-8 bg-card shadow-xl border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Smart Candidate Matches</h3>
        <p className="text-muted-foreground">
          Best candidate matches for available job positions
        </p>
      </div>
      
      <div className="space-y-6">
        {jobCandidateMatches.map(({ job, topCandidates }) => (
          <div key={job.id} className="border rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Top Candidate Matches:</p>
              {topCandidates.map((match) => (
                <div key={match.candidateId} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-medium">{match.candidateName}</h5>
                          <p className="text-xs text-muted-foreground">{match.candidateTitle}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3" />
                          {match.matchScore.toFixed(1)}/10 Match
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {match.reasons.slice(0, 2).map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handleAddToOutreach(match.candidateId, match.jobId)}
                      className="flex items-center gap-1"
                    >
                      Add to Outreach
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}