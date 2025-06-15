
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Target, User, MapPin, Briefcase, Star, Globe, Plus, RotateCcw, History, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    source: "LinkedIn",
    inPipeline: false
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
    source: "GitHub",
    inPipeline: false
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
    source: "AngelList",
    inPipeline: false
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
    source: "Indeed",
    inPipeline: false
  }
];

const sourcingHistory = [
  {
    id: "H001",
    jobTitle: "Senior AI Engineer",
    company: "TechCorp",
    date: "2024-01-15",
    candidatesFound: 8,
    candidatesInPipeline: 3
  },
  {
    id: "H002",
    jobTitle: "ML Research Scientist", 
    company: "InnovateLabs",
    date: "2024-01-10",
    candidatesFound: 12,
    candidatesInPipeline: 5
  },
  {
    id: "H003",
    jobTitle: "Data Scientist",
    company: "DataFlow Inc",
    date: "2024-01-08",
    candidatesFound: 6,
    candidatesInPipeline: 2
  }
];

export default function SourcingAgent() {
  const [selectedJob, setSelectedJob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<typeof dummyCandidates>([]);
  const { toast } = useToast();

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCandidates([]);
  };

  const handleStartSourcing = () => {
    if (!selectedJob) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const candidatesWithPipelineStatus = dummyCandidates.filter(candidate => candidate.fit >= 8.5)
        .map(candidate => ({ ...candidate, inPipeline: false }));
      setCandidates(candidatesWithPipelineStatus);
      setIsSearching(false);
      toast({
        title: "Sourcing Complete",
        description: `Found ${candidatesWithPipelineStatus.length} candidates with 8.5+ fit score`,
      });
    }, 3000);
  };

  const handleRescrape = () => {
    if (!selectedJob) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const newCandidates = [...candidates];
      const additionalCandidate = {
        id: "C005",
        name: "Emma Thompson",
        title: "Senior ML Engineer",
        location: "Seattle, WA", 
        experience: "6+ years",
        skills: ["Python", "PyTorch", "Kubernetes", "GCP"],
        fit: 8.9,
        linkedin: "linkedin.com/in/emmathompson",
        email: "emma.thompson@email.com",
        source: "AngelList",
        inPipeline: false
      };
      newCandidates.push(additionalCandidate);
      setCandidates(newCandidates);
      setIsSearching(false);
      toast({
        title: "Rescraping Complete",
        description: "Found 1 new candidate with 8.5+ fit score",
      });
    }, 2000);
  };

  const handleAddToPipeline = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, inPipeline: true }
          : candidate
      )
    );
    const candidate = candidates.find(c => c.id === candidateId);
    toast({
      title: "Added to Pipeline",
      description: `${candidate?.name} has been added to the Outreach Agent pipeline`,
    });
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
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="sourcing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sourcing">AI Sourcing</TabsTrigger>
              <TabsTrigger value="history">Sourcing History</TabsTrigger>
            </TabsList>

            <TabsContent value="sourcing">
              <Card className="p-8 bg-background shadow-xl">
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

                  <div className="flex gap-4">
                    <Button 
                      onClick={handleStartSourcing}
                      disabled={isSearching || !selectedJob}
                      className="flex-1 bg-primary text-white"
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
                    
                    {candidates.length > 0 && (
                      <Button 
                        onClick={handleRescrape}
                        disabled={isSearching}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Rescrape
                      </Button>
                    )}
                  </div>
                </div>

                {candidates.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">High-Fit Candidates ({candidates.length})</h3>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          8.5+ Fit Score Only
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {candidates.filter(c => c.inPipeline).length} added to pipeline
                        </div>
                      </div>
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
                              {candidate.inPipeline && (
                                <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  In Pipeline
                                </Badge>
                              )}
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
                            {!candidate.inPipeline ? (
                              <Button 
                                size="sm" 
                                className="bg-primary text-white"
                                onClick={() => handleAddToPipeline(candidate.id)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add to Pipeline
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" asChild>
                                <a href="/outreach-agent">
                                  <ArrowRight className="w-4 h-4 mr-1" />
                                  Go to Outreach
                                </a>
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              View Full Profile
                            </Button>
                            <Button size="sm" variant="outline">
                              Quick Contact
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-8 bg-background shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Sourcing History</h3>
                <div className="space-y-4">
                  {sourcingHistory.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <History className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{session.jobTitle}</h4>
                          <p className="text-sm text-muted-foreground">{session.company}</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{session.candidatesFound}</div>
                          <div className="text-xs text-muted-foreground">Found</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{session.candidatesInPipeline}</div>
                          <div className="text-xs text-muted-foreground">In Pipeline</div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Candidates
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
