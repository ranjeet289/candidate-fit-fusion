
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { List, Table } from "lucide-react";
import { cn } from "@/lib/utils";

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
      {/* Topbar */}
      <header className="flex items-center px-10 py-6 border-b">
        <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
        <div className="ml-auto flex items-center gap-3">
          <Button variant={activeView === "table" ? "secondary" : "ghost"} onClick={() => setActiveView("table")}>
            <Table className="w-4 h-4 mr-2" /> Table
          </Button>
          <Button variant={activeView === "list" ? "secondary" : "ghost"} onClick={() => setActiveView("list")}>
            <List className="w-4 h-4 mr-2" /> List
          </Button>
        </div>
      </header>
      {/* Main content in card */}
      <main className="flex-1 flex flex-col items-center py-8 px-2 sm:px-8 bg-muted/40">
        <Card className="w-full max-w-4xl p-8 bg-background shadow-xl">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-6 flex gap-2">
              <TabsTrigger value="new" className="flex-1 text-lg">
                New Candidate
              </TabsTrigger>
              <TabsTrigger value="existing" className="flex-1 text-lg">
                Existing Candidate
              </TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <form className="space-y-4" onSubmit={handleNewCandidate}>
                <label className="block font-semibold mb-1">Candidate Resume (PDF) or LinkedIn URL</label>
                <Input
                  type="file"
                  accept=".pdf"
                  className="mb-3"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <Input
                  type="url"
                  value={linkedin}
                  placeholder="Paste LinkedIn URL"
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="mb-3"
                />
                <Button type="submit" disabled={isLoading || (!file && !linkedin)} className="w-full bg-primary text-white">
                  {isLoading ? "Checking Fit..." : "Find Matching Jobs"}
                </Button>
              </form>
              {results.length > 0 && !isLoading && (
                <div className="mt-8">
                  <div className="mb-2 font-bold text-lg">AI-Recommended Jobs (Fit Score &gt; 8.5)</div>
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
            <TabsContent value="existing">
              {!existingCandidate ? (
                <form className="space-y-4" onSubmit={handleExistingCandidate}>
                  <label className="block font-semibold mb-1">Search Candidate by Name or Email</label>
                  <Input
                    type="text"
                    value={searchExisting}
                    onChange={(e) => setSearchExisting(e.target.value)}
                    placeholder="e.g. Muhammad Ali or ali@email.com"
                    className="mb-3"
                  />
                  <Button type="submit" disabled={isLoading || !searchExisting.trim()} className="w-full bg-primary text-white">
                    {isLoading ? "Searching..." : "Find Jobs"}
                  </Button>
                </form>
              ) : (
                <div>
                  <div className="mb-4">
                    <span className="font-bold">Candidate: </span>
                    <span>{existingCandidate}</span>
                    <Button variant="ghost" className="ml-3 text-sm" onClick={() => {
                      setExistingCandidate(null);
                      setResults([]);
                    }}>Search Another</Button>
                  </div>
                  <div className="mb-2 font-bold text-lg">Matched Jobs</div>
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
      </main>
    </div>
  );
}
