import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Send,
  User,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MapPin,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const candidatesFromPipeline = [
  { id: "C001", name: "Sarah Chen", title: "Senior AI Engineer", fit: 9.2, source: "Sourcing Agent", skills: ["Python", "TensorFlow", "AWS"] },
  { id: "C002", name: "Marcus Johnson", title: "ML Research Scientist", fit: 8.8, source: "Sourcing Agent", skills: ["PyTorch", "NLP", "Computer Vision"] },
  { id: "C003", name: "Priya Patel", title: "Data Scientist", fit: 8.5, source: "Sourcing Agent", skills: ["Machine Learning", "SQL", "R"] }
];

const availableJobs = [
  { id: "J001", title: "AI Engineer", company: "Inferred Tech Solutions", fit: 9.1, urgency: "High", location: "San Francisco, CA" },
  { id: "J002", title: "ML Ops Lead", company: "Fintech Analytics", fit: 8.7, urgency: "Medium", location: "Remote" },
  { id: "J003", title: "NLP Scientist", company: "HealthcareAI", fit: 9.3, urgency: "High", location: "Boston, MA" }
];

const recentSubmissions = [
  {
    id: "S001",
    candidate: "Sarah Chen",
    job: "AI Engineer at Inferred Tech Solutions",
    status: "submitted",
    submittedAt: "2 hours ago",
    fit: 9.2,
    candidateFit: 9.2,
    jobFit: 9.1
  },
  {
    id: "S002", 
    candidate: "Marcus Johnson",
    job: "NLP Scientist at HealthcareAI",
    status: "under_review",
    submittedAt: "1 day ago",
    fit: 8.9,
    candidateFit: 8.8,
    jobFit: 9.3
  },
  {
    id: "S003",
    candidate: "Priya Patel",
    job: "ML Ops Lead at Fintech Analytics", 
    status: "approved",
    submittedAt: "3 days ago",
    fit: 8.6,
    candidateFit: 8.5,
    jobFit: 8.7
  }
];

const smartMatches = [
  {
    candidateId: "C001",
    candidateName: "Sarah Chen",
    jobId: "J001",
    jobTitle: "AI Engineer at Inferred Tech Solutions",
    matchScore: 9.4,
    reasons: ["Python expertise", "AWS experience", "AI/ML background"]
  },
  {
    candidateId: "C002",
    candidateName: "Marcus Johnson", 
    jobId: "J003",
    jobTitle: "NLP Scientist at HealthcareAI",
    matchScore: 9.1,
    reasons: ["NLP specialization", "Research background", "PyTorch experience"]
  }
];

export default function SubmissionAgent() {
  const [selectedCandidate, setSelectedCandidate] = useState(""); // Candidate id, or "manual"
  const [manualCandidate, setManualCandidate] = useState({
    name: "",
    title: "",
    fit: "",
    skills: "",
  });
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const { toast } = useToast();

  // Collect all candidates: pipeline + manual (if filled)
  const manualCandidateIsValid = manualCandidate.name && manualCandidate.title && manualCandidate.fit && manualCandidate.skills;
  const showManualForm = selectedCandidate === "manual";

  // For display and cover letter: combine both candidates lists for lookup
  const allCandidates = [
    ...candidatesFromPipeline,
    ...(manualCandidateIsValid
      ? [{
          id: "manual",
          name: manualCandidate.name,
          title: manualCandidate.title,
          fit: manualCandidate.fit,
          source: "Manual",
          skills: manualCandidate.skills.split(",").map(s => s.trim()),
        }]
      : [])
  ];

  function getChosenCandidate() {
    if (selectedCandidate === "manual" && manualCandidateIsValid) {
      return allCandidates.find(c => c.id === "manual");
    } else {
      return allCandidates.find(c => c.id === selectedCandidate);
    }
  }

  // Multiple job select (we'll do a simple custom UI)
  function toggleJob(id: string) {
    setSelectedJobs(sel =>
      sel.includes(id) ? sel.filter(jid => jid !== id) : [...sel, id]
    );
  }

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || selectedJobs.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select a candidate and at least one job",
        variant: "destructive",
      });
      return;
    }
    if (selectedCandidate === "manual" && !manualCandidateIsValid) {
      toast({
        title: "Fill Manual Candidate",
        description: "Please fill out all fields for the manual candidate",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedCandidate("");
      setManualCandidate({ name: "", title: "", fit: "", skills: "" });
      setSelectedJobs([]);
      setCoverLetter("");
      toast({
        title: "Submission Successful",
        description: `Candidate has been submitted to selected job(s) successfully`,
      });
    }, 1500);
  };

  const handleGenerateCoverLetter = () => {
    const candidate = getChosenCandidate();
    if (!candidate || selectedJobs.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select a candidate and at least one job",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingCover(true);
    setTimeout(() => {
      const firstJob = availableJobs.find(j => j.id === selectedJobs[0]);
      let jobsInfo = selectedJobs.map(jid => {
        const job = availableJobs.find(j => j.id === jid);
        return job ? `${job.title} at ${job.company}` : "";
      }).filter(Boolean).join(", ");
      const generatedLetter = `Dear Hiring Manager,

I am excited to submit ${candidate.name} for the ${jobsInfo}${
        selectedJobs.length > 1 ? " positions" : " position"
      }. With a fit score of ${candidate.fit}, ${candidate.name} brings exceptional expertise in ${candidate.skills.join(", ")}.

Key highlights:
• 5+ years of relevant experience
• Strong background in ${candidate.skills[0]}${candidate.skills[1] ? " and " + candidate.skills[1] : ""}
• Proven track record in ${candidate.title.toLowerCase()} roles

${candidate.name} would be an excellent addition to your team and I believe these role(s) align perfectly with their career goals and technical expertise.

Best regards,
AI Recruitment Team`;

      setCoverLetter(generatedLetter);
      setIsGeneratingCover(false);
      toast({
        title: "Cover Letter Generated",
        description: "AI has generated a personalized cover letter",
      });
    }, 2000);
  };

  const handleSmartSubmission = (candidateId: string, jobId: string) => {
    const candidate = candidatesFromPipeline.find(c => c.id === candidateId);
    const job = availableJobs.find(j => j.id === jobId);
    
    toast({
      title: "Smart Submission",
      description: `${candidate?.name} submitted to ${job?.title}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "under_review":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "under_review":
        return "Under Review";
      case "approved":
        return "Approved";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-10 py-6 border-b">
        <Send className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Submission Agent</h1>
        <Badge variant="secondary" className="ml-3">Premium</Badge>
      </header>

      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="submit" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submit">Submit Candidate</TabsTrigger>
              <TabsTrigger value="smart-match">Smart Matches</TabsTrigger>
              <TabsTrigger value="history">Submission History</TabsTrigger>
            </TabsList>

            <TabsContent value="submit">
              <Card className="p-8 bg-background shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Submit Candidate to Job</h2>
                  <p className="text-muted-foreground">
                    AI-powered candidate-job matching with automated submission and tracking.
                  </p>
                </div>

                <form onSubmit={handleSubmission} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Select Candidate from Pipeline</label>
                      <Select value={selectedCandidate} onValueChange={(value) => setSelectedCandidate(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a candidate..." />
                        </SelectTrigger>
                        <SelectContent>
                          {candidatesFromPipeline.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.id}>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span>{candidate.name} - {candidate.title}</span>
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  Fit: {candidate.fit}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="manual">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>Manually Add Candidate</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {showManualForm && (
                        <div className="mt-4 bg-muted rounded p-4 flex flex-col gap-3 border">
                          <div>
                            <label className="text-sm font-semibold mb-1 block">Full Name</label>
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={manualCandidate.name}
                              onChange={e =>
                                setManualCandidate((prev) => ({ ...prev, name: e.target.value }))
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold mb-1 block">Title</label>
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={manualCandidate.title}
                              onChange={e =>
                                setManualCandidate((prev) => ({ ...prev, title: e.target.value }))
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold mb-1 block">Fit Score (1-10)</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              step="0.1"
                              className="w-full px-2 py-1 border rounded"
                              value={manualCandidate.fit}
                              onChange={e =>
                                setManualCandidate((prev) => ({ ...prev, fit: e.target.value }))
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold mb-1 block">Skills (comma separated)</label>
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={manualCandidate.skills}
                              onChange={e =>
                                setManualCandidate((prev) => ({ ...prev, skills: e.target.value }))
                              }
                              placeholder="E.g., Python, NLP, SQL"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Select Job(s)</label>
                      <div className="flex flex-col gap-2">
                        {availableJobs.map(job => (
                          <label
                            key={job.id}
                            className={`flex items-center gap-2 cursor-pointer rounded border px-3 py-2 transition ${
                              selectedJobs.includes(job.id)
                                ? "bg-primary/10 border-primary"
                                : "hover:bg-muted"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedJobs.includes(job.id)}
                              onChange={() => toggleJob(job.id)}
                              className="accent-primary"
                            />
                            <div className="flex items-center gap-2 flex-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.title} at {job.company}</span>
                              <Badge
                                variant={job.urgency === 'High' ? 'destructive' : 'outline'}
                                className="text-xs ml-2"
                              >
                                {job.urgency}
                              </Badge>
                              <Badge variant="outline">{job.fit}</Badge>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">AI-Generated Cover Letter</label>
                    <Textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Click 'Generate AI Cover Letter' to create a personalized cover letter based on the candidate and job match..."
                      className="min-h-48"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      disabled={
                        !selectedCandidate ||
                        selectedJobs.length === 0 ||
                        isGeneratingCover ||
                        (selectedCandidate === "manual" && !manualCandidateIsValid)
                      }
                      onClick={handleGenerateCoverLetter}
                    >
                      {isGeneratingCover ? "Generating..." : "Generate AI Cover Letter"}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !selectedCandidate ||
                      selectedJobs.length === 0 ||
                      (selectedCandidate === "manual" && !manualCandidateIsValid)
                    }
                    className="w-full bg-primary text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Candidate"}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="smart-match">
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
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
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
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-8 bg-background shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{submission.candidate}</p>
                          <p className="text-sm text-muted-foreground">{submission.job}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground">
                              Candidate Fit: {submission.candidateFit}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Job Fit: {submission.jobFit}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(submission.status)}
                            <span className="text-sm font-medium">{getStatusText(submission.status)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                        </div>
                        
                        <Badge variant="outline">
                          Overall: {submission.fit}
                        </Badge>
                        
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
