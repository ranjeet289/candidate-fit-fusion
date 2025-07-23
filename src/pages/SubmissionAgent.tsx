import { useState, useEffect } from "react";
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
import { usePageTitle } from "@/hooks/use-page-title";
import CandidateSelector from "./submission-agent/CandidateSelector";
import JobMultiSelect from "./submission-agent/JobMultiSelect";
import CoverLetterSection from "./submission-agent/CoverLetterSection";
import SubmissionHistory from "./submission-agent/SubmissionHistory";
import SmartMatches from "./submission-agent/SmartMatches";
import { useEntities } from "@/context/EntityContext";

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
    jobTitle: "AI Engineer at Brex",
    matchScore: 9.4,
    reasons: ["Python expertise", "LLM experience", "S-tier startup"]
  },
  {
    candidateId: "C002",
    candidateName: "Marcus Johnson", 
    jobId: "J002",
    jobTitle: "Senior ML Engineer at Stripe",
    matchScore: 9.1,
    reasons: ["PyTorch experience", "Fintech background", "Scale expertise"]
  },
  {
    candidateId: "C003",
    candidateName: "Alex Rodriguez",
    jobId: "J003", 
    jobTitle: "AI Research Scientist at OpenAI",
    matchScore: 9.6,
    reasons: ["LLM research", "Python mastery", "AI/ML innovation"]
  }
];

export default function SubmissionAgent() {
  const { candidates, jobs, addCandidate } = useEntities();

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
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("Submission Agent");
    setIcon(null);
    setBadge(<Badge variant="secondary" className="ml-3">Premium</Badge>);
  }, [setTitle, setIcon, setBadge]);

  // manualCandidateIsValid: all fields must be filled
  const manualCandidateIsValid = manualCandidate.name && manualCandidate.title && manualCandidate.fit && manualCandidate.skills;
  const showManualForm = selectedCandidate === "manual";

  // Merge: if manual filled, add to choices
  const allCandidates = [
    ...candidates,
    ...(manualCandidateIsValid && !candidates.some(c=>c.id==="manual")
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
      // Optionally add to global context on submit
      return {
        id: "manual",
        name: manualCandidate.name,
        title: manualCandidate.title,
        fit: manualCandidate.fit,
        source: "Manual",
        skills: manualCandidate.skills.split(",").map(s => s.trim()),
      };
    } else {
      return allCandidates.find(c => c.id === selectedCandidate);
    }
  }

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
      if (selectedCandidate === "manual" && manualCandidateIsValid) {
        // Add manual candidate to context for global listing
        addCandidate({
          id: String(Date.now()),
          name: manualCandidate.name,
          title: manualCandidate.title,
          fit: Number(manualCandidate.fit),
          source: "Manual",
          skills: manualCandidate.skills.split(",").map(s => s.trim()),
        });
      }
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
      const firstJob = jobs.find(j => j.id === selectedJobs[0]);
      let jobsInfo = selectedJobs.map(jid => {
        const job = jobs.find(j => j.id === jid);
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
      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="submit" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-10 bg-muted rounded-md p-1">
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
                    <CandidateSelector
                      selectedCandidate={selectedCandidate}
                      setSelectedCandidate={setSelectedCandidate}
                      showManualForm={showManualForm}
                      manualCandidate={manualCandidate}
                      setManualCandidate={setManualCandidate}
                    />
                    <JobMultiSelect
                      selectedJobs={selectedJobs}
                      toggleJob={toggleJob}
                    />
                  </div>
                  <CoverLetterSection
                    coverLetter={coverLetter}
                    setCoverLetter={setCoverLetter}
                    isGeneratingCover={isGeneratingCover}
                    handleGenerateCoverLetter={handleGenerateCoverLetter}
                    disabled={
                      !selectedCandidate ||
                      selectedJobs.length === 0 ||
                      isGeneratingCover ||
                      (selectedCandidate === "manual" && !manualCandidateIsValid)
                    }
                  />
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
              <SmartMatches
                smartMatches={smartMatches}
                handleSmartSubmission={handleSmartSubmission}
              />
            </TabsContent>
            <TabsContent value="history">
              <SubmissionHistory
                recentSubmissions={recentSubmissions}
                getStatusIcon={getStatusIcon}
                getStatusText={getStatusText}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
