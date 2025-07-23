import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Target, User, MapPin, Briefcase, Star, Globe, Plus, RotateCcw, History, CheckCircle, ArrowRight, Mail, Copy, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePageTitle } from "@/hooks/use-page-title";
import FitScoreBreakdown from "@/components/FitScoreBreakdown";

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
    inPipeline: false,
    fitBreakdown: { 
      education: 7.0, 
      careerTrajectory: 7.5, 
      companyRelevance: 6.0, 
      tenureStability: 7.0, 
      mostImportantSkills: 7.0, 
      bonusSignals: 3.0, 
      redFlags: 0.0, 
      location: 0.0 
    }
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
    inPipeline: false,
    fitBreakdown: { 
      education: 8.0, 
      careerTrajectory: 8.5, 
      companyRelevance: 7.5, 
      tenureStability: 8.0, 
      mostImportantSkills: 8.5, 
      bonusSignals: 4.0, 
      redFlags: 0.0, 
      location: 2.0 
    }
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
    inPipeline: false,
    fitBreakdown: { 
      education: 7.5, 
      careerTrajectory: 8.0, 
      companyRelevance: 8.5, 
      tenureStability: 7.5, 
      mostImportantSkills: 9.0, 
      bonusSignals: 5.0, 
      redFlags: 0.0, 
      location: 8.0 
    }
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
    inPipeline: false,
    fitBreakdown: { 
      education: 8.0, 
      careerTrajectory: 9.0, 
      companyRelevance: 7.0, 
      tenureStability: 8.5, 
      mostImportantSkills: 8.5, 
      bonusSignals: 3.5, 
      redFlags: 0.0, 
      location: 6.0 
    }
  }
];

const sourcingHistory = [
  {
    id: "H001",
    jobTitle: "Senior AI Engineer",
    company: "TechCorp",
    date: "2024-01-15",
    candidatesFound: 8,
    candidatesInPipeline: 3,
    candidates: [
      {
        id: "C001",
        name: "Sarah Chen",
        title: "Senior AI Engineer",
        location: "San Francisco, CA",
        fit: 9.2,
        email: "sarah.chen@email.com",
        linkedin: "linkedin.com/in/sarahchen",
        inPipeline: true,
        skills: ["Python", "TensorFlow", "AWS", "Docker"],
        scrapedAt: undefined
      },
      {
        id: "C006",
        name: "David Kim",
        title: "AI Engineer",
        location: "San Jose, CA",
        fit: 8.9,
        email: "david.kim@email.com",
        linkedin: "linkedin.com/in/davidkim",
        inPipeline: true,
        skills: ["Python", "PyTorch", "GCP", "Kubernetes"],
        scrapedAt: undefined
      },
      {
        id: "C007",
        name: "Lisa Wang",
        title: "Machine Learning Engineer",
        location: "Palo Alto, CA",
        fit: 8.7,
        email: "lisa.wang@email.com",
        linkedin: "linkedin.com/in/lisawang",
        inPipeline: true,
        skills: ["Python", "Scikit-learn", "AWS", "Docker"],
        scrapedAt: undefined
      }
    ]
  },
  {
    id: "H002",
    jobTitle: "ML Research Scientist", 
    company: "InnovateLabs",
    date: "2024-01-10",
    candidatesFound: 12,
    candidatesInPipeline: 5,
    candidates: [
      {
        id: "C002",
        name: "Marcus Johnson",
        title: "ML Research Scientist",
        location: "Boston, MA",
        fit: 8.8,
        email: "m.johnson@email.com",
        linkedin: "linkedin.com/in/marcusjohnson",
        inPipeline: true,
        skills: ["PyTorch", "NLP", "Computer Vision", "Python"],
        scrapedAt: undefined
      },
      {
        id: "C008",
        name: "Jennifer Lopez",
        title: "Research Scientist",
        location: "Cambridge, MA",
        fit: 9.1,
        email: "jennifer.lopez@email.com",
        linkedin: "linkedin.com/in/jenniferlopez",
        inPipeline: true,
        skills: ["TensorFlow", "Deep Learning", "Python", "R"],
        scrapedAt: undefined
      }
    ]
  },
  {
    id: "H003",
    jobTitle: "Data Scientist",
    company: "DataFlow Inc",
    date: "2024-01-08",
    candidatesFound: 6,
    candidatesInPipeline: 2,
    candidates: [
      {
        id: "C003",
        name: "Priya Patel",
        title: "Data Scientist",
        location: "Remote",
        fit: 8.7,
        email: "priya.patel@email.com",
        linkedin: "linkedin.com/in/priyapatel",
        inPipeline: true,
        skills: ["Machine Learning", "SQL", "R", "Statistics"],
        scrapedAt: undefined
      },
      {
        id: "C009",
        name: "Michael Chen",
        title: "Senior Data Analyst",
        location: "Chicago, IL",
        fit: 8.5,
        email: "michael.chen@email.com",
        linkedin: "linkedin.com/in/michaelchen",
        inPipeline: true,
        skills: ["SQL", "Python", "Tableau", "Statistics"],
        scrapedAt: undefined
      }
    ]
  }
];

export default function SourcingAgent() {
  const [selectedJob, setSelectedJob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<typeof dummyCandidates>([]);
  const [history, setHistory] = useState(sourcingHistory);
  const [rescrapeLoading, setRescrapeLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("sourcing");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { toast } = useToast();
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("Sourcing Agent");
    setIcon(null);
    setBadge(<Badge variant="secondary" className="ml-3">Premium</Badge>);
  }, [setTitle, setIcon, setBadge]);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setCandidates([]);
  };

  const handleStartSourcing = () => {
    if (!selectedJob) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const candidatesWithPipelineStatus = dummyCandidates.filter(candidate => candidate.fit >= 8.2)
        .map(candidate => ({ ...candidate, inPipeline: false }));
      setCandidates(candidatesWithPipelineStatus);
      setSelectedCandidates([]);
      setIsSearching(false);
      toast({
        title: "Sourcing Complete",
        description: `Found ${candidatesWithPipelineStatus.length} candidates with 8.2+ fit score`,
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
        inPipeline: false,
        fitBreakdown: { 
          education: 9.0, 
          careerTrajectory: 8.5, 
          companyRelevance: 8.0, 
          tenureStability: 9.0, 
          mostImportantSkills: 9.5, 
          bonusSignals: 6.0, 
          redFlags: 0.0, 
          location: 5.0 
        }
      };
      newCandidates.push(additionalCandidate);
      setCandidates(newCandidates);
      setIsSearching(false);
      toast({
        title: "Rescraping Complete",
        description: "Found 1 new candidate with 8.2+ fit score",
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
    setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
    const candidate = candidates.find(c => c.id === candidateId);
    toast({
      title: "Added to Pipeline",
      description: `${candidate?.name} has been added to the Outreach Agent pipeline`,
    });
  };

  const handleBulkAddToPipeline = () => {
    const candidateNames = selectedCandidates.map(id => 
      candidates.find(c => c.id === id)?.name
    ).filter(Boolean);
    
    setCandidates(prev => 
      prev.map(candidate => 
        selectedCandidates.includes(candidate.id)
          ? { ...candidate, inPipeline: true }
          : candidate
      )
    );
    setSelectedCandidates([]);
    
    toast({
      title: "Added to Pipeline",
      description: `${candidateNames.length} candidates have been added to the Outreach Agent pipeline`,
    });
  };

  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    setSelectedCandidates(prev => 
      checked 
        ? [...prev, candidateId]
        : prev.filter(id => id !== candidateId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCandidates(
      checked 
        ? candidates.filter(c => !c.inPipeline).map(c => c.id)
        : []
    );
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied",
      description: "Email address copied to clipboard",
    });
  };

  const handleHistoryRescrape = (sessionId: string) => {
    setRescrapeLoading(sessionId);
    
    setTimeout(() => {
      const sessionData = history.find(s => s.id === sessionId);
      const currentTime = Date.now();
      const newCandidates = [
        {
          id: `C${currentTime}1`,
          name: "Oliver Smith",
          title: `${sessionData?.jobTitle || 'Software Engineer'}`,
          location: "New York, NY",
          fit: 8.6,
          email: "oliver.smith@email.com",
          linkedin: "linkedin.com/in/oliversmith",
          inPipeline: false,
          skills: ["JavaScript", "React", "Node.js", "AWS"],
          scrapedAt: currentTime
        },
        {
          id: `C${currentTime}2`,
          name: "Emma Wilson",
          title: `Senior ${sessionData?.jobTitle || 'Developer'}`,
          location: "Austin, TX",
          fit: 8.4,
          email: "emma.wilson@email.com",
          linkedin: "linkedin.com/in/emmawilson",
          inPipeline: false,
          skills: ["Python", "Django", "PostgreSQL", "Docker"],
          scrapedAt: currentTime
        },
        {
          id: `C${currentTime}3`,
          name: "James Martinez",
          title: `Lead ${sessionData?.jobTitle || 'Engineer'}`,
          location: "Seattle, WA",
          fit: 9.1,
          email: "james.martinez@email.com",
          linkedin: "linkedin.com/in/jamesmartinez",
          inPipeline: false,
          skills: ["Java", "Spring Boot", "Microservices", "Kubernetes"],
          scrapedAt: currentTime
        }
      ];

      setHistory(prev => prev.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            candidatesFound: session.candidatesFound + newCandidates.length,
            candidates: [...(session.candidates || []), ...newCandidates]
          };
        }
        return session;
      }));
      
      setRescrapeLoading(null);
      setOpenDialog(sessionId); // Auto-open the dialog
      toast({
        title: "Rescraping Complete",
        description: `Found ${newCandidates.length} new candidates with 8.2+ fit score for ${sessionData?.jobTitle}`,
      });
    }, 2500);
  };

  const handleMoveToPipeline = (candidateId: string, sessionId: string) => {
    setHistory(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          candidatesInPipeline: session.candidatesInPipeline + 1,
          candidates: session.candidates?.map(candidate => 
            candidate.id === candidateId 
              ? { ...candidate, inPipeline: true }
              : candidate
          )
        };
      }
      return session;
    }));
    
    const candidate = history
      .find(s => s.id === sessionId)
      ?.candidates?.find(c => c.id === candidateId);
    
    toast({
      title: "Added to Pipeline",
      description: `${candidate?.name} has been added to the Outreach Agent pipeline`,
    });
  };

  const selectedJobData = dummyJobs.find(job => job.id === selectedJob);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-muted rounded-md p-1">
              <TabsTrigger 
                value="sourcing" 
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                AI Sourcing
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Sourcing History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sourcing">
              <Card className="p-8 bg-card shadow-sm border">
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
                    <Card className="p-4 bg-muted/30 border">
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
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSearching ? (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 animate-spin" />
                          Scraping profiles across the internet...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Start AI Sourcing
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
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">High-Fit Candidates ({candidates.length})</h3>
                        {candidates.filter(c => !c.inPipeline).length > 0 && (
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              id="select-all"
                              checked={selectedCandidates.length === candidates.filter(c => !c.inPipeline).length}
                              onCheckedChange={handleSelectAll}
                              className="h-4 w-4"
                            />
                            <label htmlFor="select-all" className="text-xs text-muted-foreground cursor-pointer">
                              Select All
                            </label>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {selectedCandidates.length > 0 && (
                          <Button 
                            onClick={handleBulkAddToPipeline}
                            size="sm"
                            className="h-8 text-xs bg-primary hover:bg-primary/90"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add {selectedCandidates.length} to Pipeline
                          </Button>
                        )}
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          8.2+ Fit Score Only
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {candidates.filter(c => c.inPipeline).length} in pipeline
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {candidates.map((candidate) => (
                        <Card key={candidate.id} className={`p-4 ${selectedCandidates.includes(candidate.id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {!candidate.inPipeline && (
                                <Checkbox 
                                  checked={selectedCandidates.includes(candidate.id)}
                                  onCheckedChange={(checked) => handleSelectCandidate(candidate.id, checked as boolean)}
                                />
                              )}
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <button className="text-left hover:text-primary transition-colors">
                                      <h4 className="font-semibold cursor-pointer">{candidate.name}</h4>
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                          <User className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                          <h4 className="font-semibold">{candidate.name}</h4>
                                          <p className="text-sm text-muted-foreground">{candidate.title}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                          <MapPin className="w-4 h-4" />
                                          <span>{candidate.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                          <Briefcase className="w-4 h-4" />
                                          <span>{candidate.experience}</span>
                                        </div>
                                        {candidate.email && (
                                          <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4" />
                                            <span>{candidate.email}</span>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 w-6 p-0"
                                              onClick={() => handleCopyEmail(candidate.email)}
                                            >
                                              <Copy className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <p className="text-sm font-medium mb-2">Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {candidate.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="text-xs">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {candidate.fitBreakdown && (
                                        <div>
                                          <p className="text-sm font-medium mb-2">Fit Score Breakdown:</p>
                                          <FitScoreBreakdown 
                                            fitBreakdown={candidate.fitBreakdown} 
                                            overallFit={candidate.fit}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </PopoverContent>
                                </Popover>
                                <p className="text-sm text-muted-foreground">{candidate.title}</p>
                              </div>
                              {candidate.inPipeline && (
                                <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  In Pipeline
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="font-semibold text-green-600">{candidate.fit}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {candidate.source}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {candidate.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-3 h-3" />
                              {candidate.experience}
                            </div>
                            {candidate.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{candidate.email}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 ml-1"
                                  onClick={() => handleCopyEmail(candidate.email)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs py-0 px-2 h-5">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {candidate.fitBreakdown && (
                            <Collapsible className="mb-3">
                              <CollapsibleTrigger className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <ChevronDown className="w-3 h-3" />
                                View Fit Score Details
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-2 p-3 bg-muted/50 rounded-lg">
                                <FitScoreBreakdown 
                                  fitBreakdown={candidate.fitBreakdown} 
                                  overallFit={candidate.fit}
                                />
                              </CollapsibleContent>
                            </Collapsible>
                          )}

                          <div className="flex gap-2">
                            {!candidate.inPipeline ? (
                              <Button 
                                size="sm" 
                                className="bg-primary text-white h-8 text-xs"
                                onClick={() => handleAddToPipeline(candidate.id)}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add to Pipeline
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                                <a href="/outreach-agent">
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                  Go to Outreach
                                </a>
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-8 bg-card shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Sourcing History</h3>
                <div className="space-y-4">
                  {history.map((session) => (
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
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleHistoryRescrape(session.id)}
                            disabled={rescrapeLoading === session.id}
                            className="flex items-center gap-2"
                          >
                            {rescrapeLoading === session.id ? (
                              <>
                                <Globe className="w-3 h-3 animate-spin" />
                                Rescraping...
                              </>
                            ) : (
                              <>
                                <RotateCcw className="w-3 h-3" />
                                Rescrape
                              </>
                            )}
                          </Button>
                          <Dialog open={openDialog === session.id} onOpenChange={(open) => setOpenDialog(open ? session.id : null)}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              View Candidates
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{session.jobTitle} at {session.company}</DialogTitle>
                              <DialogDescription>
                                Candidates found on {session.date} ({session.candidatesFound} total, {session.candidatesInPipeline} in pipeline)
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              {session.candidates
                                ?.sort((a, b) => (b.scrapedAt || 0) - (a.scrapedAt || 0)) // Sort by scrapedAt, newest first
                                ?.map((candidate, index) => (
                                <Card key={candidate.id} className={`p-4 ${candidate.scrapedAt ? 'border-primary bg-primary/5' : ''}`}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-semibold">{candidate.name}</h4>
                                          {candidate.scrapedAt && (
                                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                                              New
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {candidate.location}
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {candidate.email}
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-4 w-4 p-0 ml-1"
                                              onClick={() => handleCopyEmail(candidate.email)}
                                            >
                                              <Copy className="w-3 h-3" />
                                            </Button>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                      <div className="text-right">
                                        <Badge variant="secondary" className="text-sm font-bold">
                                          {candidate.fit}/10
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-1">Fit Score</p>
                                      </div>
                                      {candidate.inPipeline && (
                                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          In Pipeline
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3">
                                    <p className="text-sm font-medium mb-2">Skills:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {candidate.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2 mt-4">
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer">
                                        <Globe className="w-3 h-3 mr-1" />
                                        LinkedIn
                                      </a>
                                    </Button>
                                    {candidate.inPipeline ? (
                                      <Button size="sm" variant="outline" asChild>
                                        <a href="/outreach-agent">
                                          <ArrowRight className="w-3 h-3 mr-1" />
                                          View in Outreach
                                        </a>
                                      </Button>
                                    ) : (
                                      <Button 
                                        size="sm" 
                                        className="bg-primary text-white"
                                        onClick={() => handleMoveToPipeline(candidate.id, session.id)}
                                      >
                                        <Plus className="w-3 h-3 mr-1" />
                                        Add to Pipeline
                                      </Button>
                                    )}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        </div>
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
