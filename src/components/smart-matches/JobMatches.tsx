import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ArrowRight, Briefcase, MapPin, UserPlus } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import { useState } from "react";

interface JobMatch {
  jobId: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  reasons: string[];
  location: string;
}

interface JobMatchesProps {
  smartMatches: any[];
  handleSmartSubmission: (candidateId: string, jobId: string) => void;
}

export default function JobMatches({ smartMatches, handleSmartSubmission }: JobMatchesProps) {
  const { candidates, jobs } = useEntities();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");

  // Mock job matches for selected candidate
  const getJobMatchesForCandidate = (candidateId: string): JobMatch[] => {
    if (!candidateId) return [];
    
    return jobs.map(job => ({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      matchScore: job.fit,
      location: job.location,
      reasons: [
        "Strong technical skills match",
        "Experience with required technologies",
        "Cultural fit indicators",
        "Location preference alignment"
      ]
    })).sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleAddToPipeline = (candidateId: string, jobId: string) => {
    // This would typically add to outreach pipeline
    console.log(`Adding candidate ${candidateId} for job ${jobId} to outreach pipeline`);
    // Add your outreach pipeline logic here
  };

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  const jobMatches = getJobMatchesForCandidate(selectedCandidateId);

  return (
    <Card className="p-8 bg-card shadow-xl border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Smart Job Matches</h3>
        <p className="text-muted-foreground">
          Select a candidate to see their best job matches
        </p>
      </div>

      <div className="mb-6">
        <Select value={selectedCandidateId} onValueChange={setSelectedCandidateId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a candidate to see job matches" />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((candidate) => (
              <SelectItem key={candidate.id} value={candidate.id}>
                {candidate.name} - {candidate.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedCandidate ? (
        <div className="space-y-4">
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-1">{selectedCandidate.name}</h4>
            <p className="text-sm text-muted-foreground">{selectedCandidate.title}</p>
          </div>

          {jobMatches.length > 0 ? (
            jobMatches.map((match) => (
              <div key={match.jobId} className="p-6 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{match.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">{match.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{match.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {match.matchScore.toFixed(1)}/10 Match
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Match Reasons:</p>
                      <div className="flex flex-wrap gap-2">
                        {match.reasons.map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleSmartSubmission(selectedCandidateId, match.jobId)}
                      className="flex items-center gap-2 min-w-[140px]"
                      size="sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Submit Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleAddToPipeline(selectedCandidateId, match.jobId)}
                      className="flex items-center gap-2 min-w-[140px]"
                      size="sm"
                    >
                      <UserPlus className="w-4 h-4" />
                      Add to Pipeline
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No job matches found for this candidate.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Please select a candidate to see their job matches.
        </div>
      )}
    </Card>
  );
}