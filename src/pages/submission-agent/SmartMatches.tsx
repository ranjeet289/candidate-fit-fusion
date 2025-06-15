
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Send, ArrowRight } from "lucide-react";

interface SmartMatch {
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  matchScore: number;
  reasons: string[];
}

interface Props {
  smartMatches: SmartMatch[];
  handleSmartSubmission: (candidateId: string, jobId: string) => void;
}

const SmartMatches: React.FC<Props> = ({ smartMatches, handleSmartSubmission }) => (
  <Card className="p-8 bg-background shadow-xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">AI Smart Matches</h2>
      <p className="text-muted-foreground">
        AI-identified perfect candidate-job matches from your pipeline.
      </p>
    </div>
    <div className="space-y-4">
      {smartMatches.map((match) => (
        <Card key={`${match.candidateId}-${match.jobId}`} className="p-6 border-2 border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{match.candidateName}</h4>
                <p className="text-muted-foreground">{match.jobTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 mb-2">
                {match.matchScore} Match Score
              </Badge>
              <p className="text-xs text-muted-foreground">AI Recommended</p>
            </div>
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
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => handleSmartSubmission(match.candidateId, match.jobId)}
            >
              <Send className="w-4 h-4 mr-1" />
              Smart Submit
            </Button>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </Card>
      ))}
      {smartMatches.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No smart matches found. Add more candidates to your pipeline from the Sourcing Agent.</p>
          <Button variant="outline" className="mt-4" asChild>
            <a href="/sourcing-agent">
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to Sourcing Agent
            </a>
          </Button>
        </div>
      )}
    </div>
  </Card>
);

export default SmartMatches;
