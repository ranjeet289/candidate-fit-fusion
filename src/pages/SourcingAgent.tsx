
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, User, MapPin, Briefcase, Star, Globe } from "lucide-react";

const dummyJobs = [
  {
    id: "J001",
    title: "Senior AI Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    skills: ["Python", "TensorFlow", "AWS", "Docker"]
  },
  {
    id: "J002", 
    title: "ML Research Scientist",
    company: "InnovateLabs",
    location: "Boston, MA",
    type: "Full-time",
    experience: "7+ years",
    skills: ["PyTorch", "NLP", "Computer Vision", "Python"]
  },
  {
    id: "J003",
    title: "Data Scientist",
    company: "DataFlow Inc",
    location: "Remote",
    type: "Contract",
    experience: "4+ years",
    skills: ["Machine Learning", "SQL", "R", "Statistics"]
  }
];

const dummyCandidates = [
  {
    id: "C001",
    name: "Sarah Chen",
    title: "Senior AI Engineer",
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["Python", "TensorFlow", "AWS", "Docker"],
    fit: 9.2,
    linkedin: "linkedin.com/in/sarahchen",
    email: "sarah.chen@email.com",
    source: "LinkedIn"
  },
  {
    id: "C002", 
    name: "Marcus Johnson",
    title: "ML Research Scientist",
    location: "Boston, MA",
    experience: "7+ years",
    skills: ["PyTorch", "NLP", "Computer Vision", "Python"],
    fit: 8.8,
    linkedin: "linkedin.com/in/marcusjohnson",
    email: "m.johnson@email.com",
    source: "GitHub"
  },
  {
    id: "C003",
    name: "Priya Patel", 
    title: "Data Scientist",
    location: "Remote",
    experience: "4+ years",
    skills: ["Machine Learning", "SQL", "R", "Statistics"],
    fit: 8.7,
    linkedin: "linkedin.com/in/priyapatel",
    email: "priya.patel@email.com",
    source: "AngelList"
  },
  {
    id: "C004",
    name: "Alex Rodriguez",
    title: "Senior Data Engineer", 
    location: "Austin, TX",
    experience: "6+ years",
    skills: ["Python", "Spark", "Kafka", "AWS"],
    fit: 8.6,
    linkedin: "linkedin.com/in/alexrodriguez",
    email: "alex.rodriguez@email.com",
    source: "Indeed"
  }
];

export default function SourcingAgent() {
  const [selectedJob, setSelectedJob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<typeof dummyCandidates>([]);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCandidates([]);
  };

  const handleStartSourcing = () => {
    if (!selectedJob) return;
    
    setIsSearching(true);
    setTimeout(() => {
      // Filter candidates with 8.5+ fit score
      const highFitCandidates = dummyCandidates.filter(candidate => candidate.fit >= 8.5);
      setCandidates(highFitCandidates);
      setIsSearching(false);
    }, 3000);
  };

  const selectedJobData = dummyJobs.find(job => job.id === selectedJob);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-10 py-6 border-b">
        <Target className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Sourcing Agent</h1>
        <Badge variant="secondary" className="ml-3">Premium</Badge>
      </header>

      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <Card className="max-w-6xl mx-auto p-8 bg-background shadow-xl">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">AI-Powered Candidate Sourcing</h2>
            <p className="text-muted-foreground">
              Select a job from your platform and let our AI agent scrape profiles across the internet to find candidates with 8.5+ fit score.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block font-semibold mb-2">Select Job Position</label>
              <Select value={selectedJob} onValueChange={handleJobSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a job position to source candidates for..." />
                </SelectTrigger>
                <SelectContent>
                  {dummyJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span className="font-medium">{job.title}</span>
                          <span className="text-muted-foreground ml-2">@ {job.company}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedJobData && (
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-2">Selected Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{selectedJobData.title} at {selectedJobData.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedJobData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedJobData.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedJobData.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {selectedJobData.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedJobData.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Button 
              onClick={handleStartSourcing}
              disabled={isSearching || !selectedJob}
              className="w-full bg-primary text-white"
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 animate-spin" />
                  Scraping profiles across the internet...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Start AI Sourcing (8.5+ Fit Score)
                </div>
              )}
            </Button>
          </div>

          {candidates.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">High-Fit Candidates ({candidates.length})</h3>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  8.5+ Fit Score Only
                </Badge>
              </div>
              <div className="grid gap-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{candidate.name}</h4>
                          <p className="text-muted-foreground">{candidate.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-green-600">{candidate.fit}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {candidate.source}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {candidate.email}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary text-white">
                        Add to Pipeline
                      </Button>
                      <Button size="sm" variant="outline">
                        View Full Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Start Outreach
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
