
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { List, Table, Bot, Upload, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/use-page-title";

const dummyJobs = [
  {
    title: "AI Engineer",
    company: "Inferred Tech Solutions",
    fit: 9.1,
    location: "Remote",
    id: "J001",
  },
  {
    title: "ML Ops Lead",
    company: "Fintech Analytics",
    fit: 8.7,
    location: "San Francisco",
    id: "J002",
  },
  {
    title: "NLP Scientist",
    company: "HealthcareAI",
    fit: 9.3,
    location: "Boston",
    id: "J003",
  },
];

function JobResultsTable({ jobs }: { jobs: typeof dummyJobs }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-muted text-muted-foreground">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Job Title</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Company</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Fit Score</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                No suitable jobs found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr
                className={cn(
                  "border-b hover:bg-muted transition-colors",
                )}
                key={job.id}
              >
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{job.company}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "font-semibold px-3 py-1 rounded-full",
                      job.fit > 9
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {job.fit}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                    Apply
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AIRecruiter() {
  const [activeView, setActiveView] = useState<"table" | "list">("table");
  const [file, setFile] = useState<File | null>(null);
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<typeof dummyJobs>([]);
  const [searchExisting, setSearchExisting] = useState("");
  const [existingCandidate, setExistingCandidate] = useState<string | null>(null);
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("AI Recruiter");
    setIcon(null);
    setBadge(<Badge variant="secondary" className="ml-3">Premium</Badge>);
  }, [setTitle, setIcon, setBadge]);

  // Simulate AI search
  function handleNewCandidate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Filter jobs with fit score > 8.5
      setResults(dummyJobs.filter((j) => j.fit > 8.5));
      setIsLoading(false);
    }, 1400);
  }
  function handleExistingCandidate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setExistingCandidate(searchExisting.trim());
      setResults(dummyJobs);
      setIsLoading(false);
    }, 1100);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main content in card */}
      <main className="flex-1 flex flex-col py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">AI-Powered Job Matching</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload resumes or provide LinkedIn profiles to instantly find the best matching jobs with AI-calculated fit scores
            </p>
          </div>

          <Card className="p-8 bg-background shadow-xl">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2 h-10 bg-muted rounded-md p-1">
                <TabsTrigger value="new" className="flex items-center gap-2 text-base">
                  <Upload className="w-4 h-4" />
                  className="flex items-center gap-2 text-base data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  className="flex items-center gap-2 text-base data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                <TabsTrigger value="existing" className="flex items-center gap-2 text-base">
                  <Search className="w-4 h-4" />
                  Search Existing Database
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="new" className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">AI Resume Analysis</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    Our AI will analyze the candidate's background and automatically match them with jobs that have 8.5+ fit scores
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleNewCandidate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-semibold mb-2 text-foreground">Upload Resume (PDF)</label>
                      <Input
                        type="file"
                        accept=".pdf"
                        className="h-12"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Max file size: 10MB</p>
                    </div>
                    <div className="flex items-center justify-center text-muted-foreground">
                      <span className="text-sm font-medium">OR</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-semibold mb-2 text-foreground">LinkedIn Profile URL</label>
                    <Input
                      type="url"
                      value={linkedin}
                      placeholder="https://linkedin.com/in/candidate-profile"
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="h-12"
                    />
                    <p className="text-xs text-muted-foreground mt-1">We'll analyze their public profile information</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading || (!file && !linkedin)} 
                    className="w-full h-12 text-base bg-primary text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 animate-pulse" />
                        AI is analyzing candidate...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Find Matching Jobs with AI
                      </div>
                    )}
                  </Button>
                </form>
                
                {results.length > 0 && !isLoading && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg">AI-Recommended Jobs (Fit Score &gt; 8.5)</div>
                    <div className="flex items-center gap-3">
                      <Button variant={activeView === "table" ? "secondary" : "ghost"} onClick={() => setActiveView("table")}>
                        <Table className="w-4 h-4 mr-2" /> Table
                      </Button>
                      <Button variant={activeView === "list" ? "secondary" : "ghost"} onClick={() => setActiveView("list")}>
                        <List className="w-4 h-4 mr-2" /> List
                      </Button>
                    </div>
                  </div>
                  {activeView === "table" ? (
                    <JobResultsTable jobs={results} />
                  ) : (
                    <ul className="grid gap-3">
                      {results.map((job) => (
                        <li key={job.id} className="bg-muted rounded-lg p-6 flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{job.title}</div>
                            <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                          </div>
                          <div className={cn("text-lg font-bold",
                            job.fit > 9 ? "text-green-600" : "text-yellow-600"
                          )}>
                            {job.fit}
                            <span className="ml-2 text-xs font-normal bg-background px-2 py-1 rounded-full border">{job.fit > 9 ? "Excellent fit" : "Good fit"}</span>
                          </div>
                          <Button size="sm" className="ml-6 bg-primary text-white">Apply</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                )}
              </TabsContent>
            <TabsContent value="existing" className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
                <div className="flex items-center gap-3 mb-3">
                  <Search className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Database Search</h3>
                </div>
                <p className="text-sm text-green-700">
                  Search our existing candidate database and find job matches instantly
                </p>
              </div>
              
              {!existingCandidate ? (
                <form className="space-y-6" onSubmit={handleExistingCandidate}>
                  <div>
                    <label className="block font-semibold mb-2 text-foreground">Search Candidate by Name or Email</label>
                    <Input
                      type="text"
                      value={searchExisting}
                      onChange={(e) => setSearchExisting(e.target.value)}
                      placeholder="e.g. Muhammad Ali or ali@email.com"
                      className="h-12"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Search by full name or email address</p>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !searchExisting.trim()} 
                    className="w-full h-12 text-base bg-primary text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 animate-pulse" />
                        Searching database...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Find Matching Jobs
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Search className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Found Candidate</p>
                        <p className="text-sm text-muted-foreground">{existingCandidate}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => {
                      setExistingCandidate(null);
                      setResults([]);
                      setSearchExisting("");
                    }}>
                      Search Another
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Matched Jobs for {existingCandidate}</h3>
                    <div className="flex items-center gap-3">
                      <Button variant={activeView === "table" ? "secondary" : "ghost"} onClick={() => setActiveView("table")}>
                        <Table className="w-4 h-4 mr-2" /> Table
                      </Button>
                      <Button variant={activeView === "list" ? "secondary" : "ghost"} onClick={() => setActiveView("list")}>
                        <List className="w-4 h-4 mr-2" /> List
                      </Button>
                    </div>
                  </div>
                  {activeView === "table" ? (
                    <JobResultsTable jobs={results} />
                  ) : (
                    <ul className="grid gap-3">
                      {results.map((job) => (
                        <li key={job.id} className="bg-muted rounded-lg p-6 flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{job.title}</div>
                            <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                          </div>
                          <div className={cn("text-lg font-bold",
                            job.fit > 9 ? "text-green-600" : "text-yellow-600"
                          )}>
                            {job.fit}
                            <span className="ml-2 text-xs font-normal bg-background px-2 py-1 rounded-full border">{job.fit > 9 ? "Excellent fit" : "Good fit"}</span>
                          </div>
                          <Button size="sm" className="ml-6 bg-primary text-white">Apply</Button>
                        </li>
                      ))}
                     </ul>
                   )}
                 </div>
               )}
             </TabsContent>
           </Tabs>
         </Card>
         </div>
       </main>
     </div>
   );
 }
