import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import JobMatches from "@/components/smart-matches/JobMatches";
import CandidateMatches from "@/components/smart-matches/CandidateMatches";

interface SmartMatch {
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  matchScore: number;
  reasons: string[];
}

interface CandidateJobMatch {
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  reasons: string[];
  availability: 'Available' | 'Interviewing' | 'Offer Stage';
  salaryMatch: number;
  responseRate: number;
  lastActive: string;
  preferredLocations: string[];
  skillGapAnalysis: { missing: string[]; strength: string[] };
}

interface SmartMatchesProps {
  smartMatches: SmartMatch[];
  candidateJobMatches?: CandidateJobMatch[];
  selectedCandidateId?: string;
  selectedCandidateName?: string;
  handleSmartSubmission: (candidateId: string, jobId: string) => void;
  handleAddToOutreach: (candidateId: string, jobId: string) => void;
}

export default function SmartMatches({
  smartMatches,
  candidateJobMatches,
  selectedCandidateId,
  selectedCandidateName,
  handleSmartSubmission,
  handleAddToOutreach
}: SmartMatchesProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="jd" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-10 bg-muted rounded-md p-1">
          <TabsTrigger value="jd" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            JD Matches
          </TabsTrigger>
          <TabsTrigger value="candidate" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Candidate Matches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jd">
          <JobMatches 
            smartMatches={smartMatches}
            handleSmartSubmission={handleSmartSubmission}
          />
        </TabsContent>

        <TabsContent value="candidate">
          <CandidateMatches
            candidateJobMatches={candidateJobMatches}
            selectedCandidateName={selectedCandidateName}
            handleAddToOutreach={handleAddToOutreach}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}