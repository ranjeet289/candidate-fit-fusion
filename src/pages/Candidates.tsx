
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Search, Filter, Table, List, Plus, MoreHorizontal, Eye, Copy, Linkedin, User, MapPin, Calendar, Star, AlertCircle } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CandidateProfile from "@/components/CandidateProfile";
import SubmitCandidateForm from "@/components/SubmitCandidateForm";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Submitted to AM': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Submitted to Client': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Sendout': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Next Interview': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Final Interview': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Offer': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 font-semibold';
    if (score >= 8) return 'text-blue-600 font-semibold';
    if (score >= 7.5) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const stages = ['all', 'Active', 'Submitted to AM', 'Submitted to Client', 'Sendout', 'Next Interview', 'Final Interview', 'Offer', 'Rejected'];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidates</h2>
          <p className="text-muted-foreground">
            Manage and track candidates across all active job positions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="text-xs"
            >
              <Table className="w-4 h-4 mr-1" />
              Table
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
              className="text-xs"
            >
              <List className="w-4 h-4 mr-1" />
              Cards
            </Button>
          </div>
          <Sheet open={showSubmitForm} onOpenChange={setShowSubmitForm}>
            <SheetTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Submit Candidate
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Submit a New Candidate</SheetTitle>
              </SheetHeader>
              <SubmitCandidateForm onClose={() => setShowSubmitForm(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search candidates, roles, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Stage: {stageFilter === 'all' ? 'All' : stageFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background border shadow-lg">
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Candidates</div>
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{mockCandidates.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Active Pipeline</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockCandidates.filter(c => c.stage !== 'Rejected' && c.stage !== 'Offer').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">High Fit Score</div>
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockCandidates.filter(c => c.fitScore >= 8.5).length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Rejected (Low Fit)</div>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockCandidates.filter(c => c.fitScore < 7.5).length}
          </div>
        </Card>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <Card>
          <TableComponent>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Recruiter</TableHead>
                <TableHead>Job ID</TableHead>
                <TableHead>Fit Score</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidate.title}</div>
                      <div className="text-sm text-muted-foreground">{candidate.experience}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{candidate.recruiter}</TableCell>
                  <TableCell className="font-mono text-sm">{candidate.jobId}</TableCell>
                  <TableCell>
                    <span className={getFitScoreColor(candidate.fitScore)}>
                      {candidate.fitScore}/10
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(candidate.stage)} text-xs`}>
                      {candidate.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{candidate.dateAdded}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-background border shadow-lg">
                        <DropdownMenuItem onClick={() => setSelectedCandidate(candidate)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(candidate.stage)} text-xs`}>
                  {candidate.stage}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Recruiter: {candidate.recruiter}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{candidate.dateAdded}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className={getFitScoreColor(candidate.fitScore)}>
                    Fit Score: {candidate.fitScore}/10
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Candidate Profile Sheet */}
      {selectedCandidate && (
        <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
            <CandidateProfile candidate={selectedCandidate} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
