import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ArrowRight, Briefcase, MapPin, UserPlus, User, Calendar, DollarSign, Clock, Eye, Send, CheckCircle2, Zap, Check } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import { useToast } from "@/hooks/use-toast";

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

interface CandidateMatchesProps {
  handleAddToOutreach: (candidateId: string, jobId: string) => void;
}

export default function CandidateMatches({ handleAddToOutreach }: CandidateMatchesProps) {
  const { candidates, jobs } = useEntities();
  const { toast } = useToast();
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [outreachSent, setOutreachSent] = useState<Set<string>>(new Set());

  // Generate candidates for the selected job
  const getCandidatesForJob = (jobId: string) => {
    if (!jobId) return [];
    
    const selectedJob = jobs.find(job => job.id === jobId);
    if (!selectedJob) return [];

    const availabilityOptions = ['Available', 'Interviewing', 'Offer Stage'] as const;
    const locationOptions = ['Remote', 'San Francisco', 'New York', 'Austin', 'Boston'];
    
    return candidates
      .map((candidate) => {
        // Calculate match score based on job and candidate fit
        const jobFit = typeof selectedJob.fit === 'string' ? parseFloat(selectedJob.fit) : selectedJob.fit;
        const candidateFit = typeof candidate.fit === 'string' ? parseFloat(candidate.fit) : candidate.fit;
        const matchScore = Math.round((jobFit + candidateFit) / 2 * 10) / 10;

        // Generate realistic recommendation data
        const availability = availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)];
        const salaryMatch = Math.floor(80 + Math.random() * 20); // 80-100% salary match
        const responseRate = Math.floor(70 + Math.random() * 30); // 70-100% response rate
        const daysAgo = Math.floor(Math.random() * 7) + 1;
        const lastActive = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
        
        // Sample preferred locations
        const numLocations = Math.floor(Math.random() * 3) + 1;
        const preferredLocations = locationOptions
          .sort(() => 0.5 - Math.random())
          .slice(0, numLocations);

        // Generate skill gap analysis
        const allSkills = ['React', 'Python', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'TypeScript', 'Node.js'];
        const candidateSkills = candidate.skills || [];
        const strengthSkills = candidateSkills.slice(0, 2);
        const potentialMissing = allSkills.filter(skill => !candidateSkills.includes(skill));
        const missingSkills = potentialMissing.slice(0, Math.floor(Math.random() * 2) + 1);

        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidateTitle: candidate.title,
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          companyName: selectedJob.company,
          matchScore,
          availability,
          salaryMatch,
          responseRate,
          lastActive,
          preferredLocations,
          skillGapAnalysis: {
            strength: strengthSkills,
            missing: missingSkills
          },
          reasons: [
            "Technical skills alignment",
            "Experience level match", 
            "Industry background",
            "Cultural fit indicators"
          ]
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
  };

  const candidatesForJob = getCandidatesForJob(selectedJobId);
  const selectedJob = jobs.find(job => job.id === selectedJobId);

  // Helper functions for status styling
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Interviewing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Offer Stage': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSalaryMatchColor = (match: number) => {
    if (match >= 90) return 'text-green-600';
    if (match >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseRateColor = (rate: number) => {
    if (rate >= 85) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Handle outreach with notification and state change
  const handleOutreachClick = (candidateId: string, jobId: string, candidateName: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    const job = jobs.find(j => j.id === jobId);
    
    // Add to outreach sent set
    setOutreachSent(prev => new Set(prev).add(candidateId));
    
    // Show success notification
    toast({
      title: "Added to Outreach Agent",
      description: `${candidateName} has been successfully added to the outreach pipeline for ${job?.title}`,
      duration: 3000,
    });
    
    // Call the original handler
    handleAddToOutreach(candidateId, jobId);
  };

  return (
    <Card className="p-8 bg-card shadow-xl border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Candidates for Job</h3>
        <p className="text-muted-foreground">
          Select a job position to see the best matching candidates with AI-powered insights
        </p>
      </div>
      
      {/* Job Selection */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Job Position</label>
        <Select value={selectedJobId} onValueChange={setSelectedJobId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a job position to see candidates..." />
          </SelectTrigger>
          <SelectContent>
            {jobs.map(job => (
              <SelectItem key={job.id} value={job.id}>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.title} at {job.company}</span>
                  <Badge
                    variant={job.workType === 'Remote' ? 'secondary' : 'outline'}
                    className="text-xs ml-2"
                  >
                    {job.workType}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Job Info */}
      {selectedJob && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-primary">{selectedJob.title}</h4>
            <span className="text-muted-foreground">at {selectedJob.company}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {selectedJob.location}
            </div>
            <Badge variant={selectedJob.workType === 'Remote' ? 'secondary' : 'outline'}>
              {selectedJob.workType}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {selectedJob.fit} Fit Score
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Requirements:</p>
            <div className="flex flex-wrap gap-2">
              {selectedJob.requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Candidates List */}
      {!selectedJobId ? (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Please select a job position to view matching candidates</p>
        </div>
      ) : candidatesForJob.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No candidates found for this position</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Found {candidatesForJob.length} candidates for this position
            </p>
          </div>
          
          {candidatesForJob.map((candidate) => (
            <div key={candidate.candidateId} className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Candidate Header - More Compact */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <button 
                          className="font-semibold text-base hover:text-primary transition-colors cursor-pointer"
                          onClick={() => {/* Handle view profile */}}
                        >
                          {candidate.candidateName}
                        </button>
                        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm font-bold text-primary">{candidate.matchScore.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{candidate.candidateTitle}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Active {candidate.lastActive}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.preferredLocations.slice(0, 2).join(', ')}
                          {candidate.preferredLocations.length > 2 && ` +${candidate.preferredLocations.length - 2}`}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Skills Analysis */}
                  <div className="mb-3">
                    <div className="flex items-center gap-4">
                      {candidate.skillGapAnalysis.strength.length > 0 && (
                        <div className="flex-1">
                          <p className="text-xs text-green-700 font-medium mb-1">✅ Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skillGapAnalysis.strength.slice(0, 2).map((skill, index) => (
                              <Badge key={index} className="text-xs bg-green-50 text-green-700 border-green-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {candidate.skillGapAnalysis.missing.length > 0 && (
                        <div className="flex-1">
                          <p className="text-xs text-orange-700 font-medium mb-1">📚 Growth</p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skillGapAnalysis.missing.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Compact Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  {outreachSent.has(candidate.candidateId) ? (
                    <Button
                      disabled
                      variant="outline"
                      className="flex items-center gap-2 min-w-[140px] bg-green-50 border-green-200 text-green-700"
                      size="sm"
                    >
                      <Check className="w-4 h-4" />
                      Added to Outreach
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleOutreachClick(candidate.candidateId, candidate.jobId, candidate.candidateName)}
                      className="flex items-center gap-2 min-w-[140px]"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                      Send Outreach
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 min-w-[140px]"
                    size="sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}