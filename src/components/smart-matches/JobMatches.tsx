import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Briefcase, MapPin } from "lucide-react";

interface SmartMatch {
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  matchScore: number;
  reasons: string[];
}

interface JobMatchesProps {
  smartMatches: SmartMatch[];
  handleSmartSubmission: (candidateId: string, jobId: string) => void;
}

export default function JobMatches({ smartMatches, handleSmartSubmission }: JobMatchesProps) {
  return (
    <Card className="p-8 bg-card shadow-xl border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Smart Job Matches</h3>
        <p className="text-muted-foreground">
          AI-powered matches between top candidates and available positions
        </p>
      </div>
      
      <div className="space-y-4">
        {smartMatches.map((match) => (
          <div key={`${match.candidateId}-${match.jobId}`} className="p-6 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{match.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">{match.jobTitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {match.matchScore}/10 Match
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
                  onClick={() => handleSmartSubmission(match.candidateId, match.jobId)}
                  className="flex items-center gap-2"
                >
                  Submit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}