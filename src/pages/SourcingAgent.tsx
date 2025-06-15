
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Target, User, MapPin, Briefcase, Star } from "lucide-react";

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
    email: "sarah.chen@email.com"
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
    email: "m.johnson@email.com"
  },
  {
    id: "C003",
    name: "Priya Patel", 
    title: "Data Scientist",
    location: "Remote",
    experience: "4+ years",
    skills: ["Machine Learning", "SQL", "R", "Statistics"],
    fit: 8.5,
    linkedin: "linkedin.com/in/priyapatel",
    email: "priya.patel@email.com"
  }
];

export default function SourcingAgent() {
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<typeof dummyCandidates>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setCandidates(dummyCandidates);
      setIsSearching(false);
    }, 2000);
  };

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
              Let our AI agent find the perfect candidates by analyzing job requirements and sourcing from multiple platforms.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6 mb-8">
            <div>
              <label className="block font-semibold mb-2">Job Description</label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="min-h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Key Requirements</label>
                <Textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g., 5+ years Python, Machine Learning, AWS experience"
                  className="min-h-24"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Preferred Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco, Remote, Nationwide"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSearching || !jobDescription.trim()}
              className="w-full bg-primary text-white"
            >
              {isSearching ? "Sourcing Candidates..." : "Start AI Sourcing"}
            </Button>
          </form>

          {candidates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Sourced Candidates ({candidates.length})</h3>
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
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{candidate.fit}</span>
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
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
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
