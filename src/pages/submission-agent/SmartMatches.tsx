
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

// Mock profile images - using the uploaded image for Sarah Chen
const getProfileImage = (name: string) => {
  if (name.includes('Sarah')) return '/lovable-uploads/96c2974c-b487-4dfb-b02a-23659f7c62f1.png';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=48`;
};

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
        <Card key={`${match.candidateId}-${match.jobId}`} className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <img 
              src={getProfileImage(match.candidateName)}
              alt={match.candidateName}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{match.candidateName}</h3>
                  <p className="text-gray-600">{match.jobTitle}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-green-100 text-green-800 border-green-300 font-semibold">
                    {match.matchScore} Match Score
                  </Badge>
                  <span className="text-sm text-gray-500">AI Recommended</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Match Reasons:</p>
                <div className="flex flex-wrap gap-2">
                  {match.reasons.map((reason, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-gray-600 border-gray-300 bg-gray-50"
                    >
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleSmartSubmission(match.candidateId, match.jobId)}
                  className="text-white px-6"
                  style={{ backgroundColor: '#473BBD' }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Smart Submit
                </Button>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50" style={{ color: '#473BBD' }}>
                  View Details
                </Button>
              </div>
            </div>
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
