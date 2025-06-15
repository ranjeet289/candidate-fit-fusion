
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Briefcase, CheckCircle, Clock, AlertCircle } from "lucide-react";

const candidates = [
  { id: "C001", name: "Sarah Chen", title: "Senior AI Engineer", fit: 9.2 },
  { id: "C002", name: "Marcus Johnson", title: "ML Research Scientist", fit: 8.8 },
  { id: "C003", name: "Priya Patel", title: "Data Scientist", fit: 8.5 }
];

const jobs = [
  { id: "J001", title: "AI Engineer", company: "Inferred Tech Solutions", fit: 9.1 },
  { id: "J002", title: "ML Ops Lead", company: "Fintech Analytics", fit: 8.7 },
  { id: "J003", title: "NLP Scientist", company: "HealthcareAI", fit: 9.3 }
];

const submissions = [
  {
    id: "S001",
    candidate: "Sarah Chen",
    job: "AI Engineer at Inferred Tech Solutions",
    status: "submitted",
    submittedAt: "2 hours ago",
    fit: 9.2
  },
  {
    id: "S002", 
    candidate: "Marcus Johnson",
    job: "NLP Scientist at HealthcareAI",
    status: "pending_review",
    submittedAt: "1 day ago",
    fit: 8.9
  },
  {
    id: "S003",
    candidate: "Priya Patel",
    job: "ML Ops Lead at Fintech Analytics", 
    status: "approved",
    submittedAt: "3 days ago",
    fit: 8.6
  }
];

export default function SubmissionAgent() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedCandidate("");
      setSelectedJob("");
      setCoverLetter("");
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending_review":
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
      case "pending_review":
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* New Submission Form */}
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
                  <label className="block font-semibold mb-2">Select Candidate</label>
                  <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a candidate..." />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{candidate.name} - {candidate.title}</span>
                            <Badge variant="outline" className="ml-auto">
                              {candidate.fit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Select Job</label>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a job..." />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.title} at {job.company}</span>
                            <Badge variant="outline" className="ml-auto">
                              {job.fit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">AI-Generated Cover Letter</label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="The AI will generate a personalized cover letter based on the candidate and job match..."
                  className="min-h-32"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mt-2"
                  disabled={!selectedCandidate || !selectedJob}
                >
                  Generate AI Cover Letter
                </Button>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting || !selectedCandidate || !selectedJob}
                className="w-full bg-primary text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Candidate"}
              </Button>
            </form>
          </Card>

          {/* Submission History */}
          <Card className="p-8 bg-background shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{submission.candidate}</p>
                      <p className="text-sm text-muted-foreground">{submission.job}</p>
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
                      Fit: {submission.fit}
                    </Badge>
                    
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
