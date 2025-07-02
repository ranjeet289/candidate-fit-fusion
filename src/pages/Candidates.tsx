import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Table, List, Search, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import CandidateProfile from "@/components/CandidateProfile";
import SubmitCandidateForm from "@/components/SubmitCandidateForm";
import CandidateStatsCards from "@/components/candidates/CandidateStatsCards";
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

  const stages = ['all', 'Active', 'Submitted to AM', 'Submitted to Client', 'Sendout', 'Next Interview', 'Final Interview', 'Offer', 'Rejected'];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track candidates across all active job positions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="text-xs h-8"
              >
                <Table className="w-4 h-4 mr-1" />
                Table
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="text-xs h-8"
              >
                <List className="w-4 h-4 mr-1" />
                Cards
              </Button>
            </div>
            <Sheet open={showSubmitForm} onOpenChange={setShowSubmitForm}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Candidate
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
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search candidates, roles, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap border-gray-200">
                <Filter className="w-4 h-4" />
                Stage: {stageFilter === 'all' ? 'All' : stageFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border shadow-lg">
              {stages.map((stage) => (
                <DropdownMenuItem
                  key={stage}
                  onClick={() => setStageFilter(stage)}
                  className="cursor-pointer"
                >
                  {stage === 'all' ? 'All Stages' : stage}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <CandidateStatsCards candidates={mockCandidates} />
        
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
      </div>

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
