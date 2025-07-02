
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Table, List } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CandidateProfile from "@/components/CandidateProfile";
import SubmitCandidateForm from "@/components/SubmitCandidateForm";
import CandidateStatsCards from "@/components/candidates/CandidateStatsCards";
import CandidateFilters from "@/components/candidates/CandidateFilters";
import CandidateTableView from "@/components/candidates/CandidateTableView";
import CandidateCardView from "@/components/candidates/CandidateCardView";

// Mock data for recruiting agency
const mockCandidates = [
  {
    id: "C001",
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    recruiter: "Prashant Gosavi",
    jobId: "SRN2025-10615",
    candidateId: "SRN-2127870",
    company: "Altios",
    dateAdded: "18 May 2025",
    stage: "Active",
    fitScore: 8.7,
    location: "San Francisco, CA",
    experience: "8+ years",
    skills: ["React", "Node.js", "Python", "AWS"]
  },
  {
    id: "C002", 
    name: "Marcus Johnson",
    title: "Product Manager",
    recruiter: "Jessica Park",
    jobId: "SRN2025-10620",
    candidateId: "SRN-2127871",
    company: "TechFlow",
    dateAdded: "17 May 2025",
    stage: "Submitted to Client",
    fitScore: 9.2,
    location: "New York, NY",
    experience: "5-8 years",
    skills: ["Product Strategy", "Agile", "Analytics"]
  },
  {
    id: "C003",
    name: "Emily Rodriguez",
    title: "UX Designer",
    recruiter: "Michael Kim",
    jobId: "SRN2025-10618",
    candidateId: "SRN-2127872", 
    company: "Design Studios",
    dateAdded: "16 May 2025",
    stage: "Final Interview",
    fitScore: 8.9,
    location: "Los Angeles, CA",
    experience: "2-5 years",
    skills: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: "C004",
    name: "David Park",
    title: "Data Scientist",
    recruiter: "Prashant Gosavi",
    jobId: "SRN2025-10612",
    candidateId: "SRN-2127873",
    company: "DataCorp",
    dateAdded: "15 May 2025",
    stage: "Rejected",
    fitScore: 6.8,
    location: "Austin, TX", 
    experience: "0-2 years",
    skills: ["Python", "Machine Learning", "SQL"]
  }
];

export default function CandidatesPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [stageFilter, setStageFilter] = useState('all');

  // Filter candidates based on search term and stage
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      candidate.recruiter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || candidate.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Candidates</h2>
          <p className="text-muted-foreground">
            Manage and track candidates across all active job positions
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="text-xs"
            >
              <Table className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Table</span>
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
              className="text-xs"
            >
              <List className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Cards</span>
            </Button>
          </div>
          <Sheet open={showSubmitForm} onOpenChange={setShowSubmitForm}>
            <SheetTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Submit Candidate</span>
                <span className="sm:hidden">Submit</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[600px] sm:max-w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Submit a New Candidate</SheetTitle>
              </SheetHeader>
              <SubmitCandidateForm onClose={() => setShowSubmitForm(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filters */}
      <CandidateFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        stageFilter={stageFilter}
        setStageFilter={setStageFilter}
      />

      {/* Stats Cards */}
      <CandidateStatsCards candidates={mockCandidates} />

      {/* Content */}
      {viewMode === 'table' ? (
        <CandidateTableView 
          candidates={filteredCandidates} 
          onViewProfile={setSelectedCandidate}
        />
      ) : (
        <CandidateCardView 
          candidates={filteredCandidates} 
          onViewProfile={setSelectedCandidate}
        />
      )}

      {/* Candidate Profile Sheet */}
      {selectedCandidate && (
        <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <SheetContent className="w-full sm:w-[600px] sm:max-w-[600px] overflow-y-auto">
            <CandidateProfile candidate={selectedCandidate} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
