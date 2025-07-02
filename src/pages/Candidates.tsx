
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Search, Filter, Table, List, Plus, MoreHorizontal, Eye, Copy, Linkedin } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import FitScoreBreakdown from "@/components/FitScoreBreakdown";
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

export default function CandidatesPage() {
  const { candidates, addCandidate, updateCandidate, removeCandidate } = useEntities();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Submitted to AM': return 'bg-blue-100 text-blue-800';
      case 'Submitted to Client': return 'bg-purple-100 text-purple-800';
      case 'Sendout': return 'bg-orange-100 text-orange-800';
      case 'Next Interview': return 'bg-yellow-100 text-yellow-800';
      case 'Final Interview': return 'bg-indigo-100 text-indigo-800';
      case 'Offer': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-6 py-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
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
              List
            </Button>
          </div>
          <Sheet open={showSubmitForm} onOpenChange={setShowSubmitForm}>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Submit Candidate
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] sm:max-w-[600px]">
              <SheetHeader>
                <SheetTitle>Submit a New Candidate</SheetTitle>
              </SheetHeader>
              <SubmitCandidateForm onClose={() => setShowSubmitForm(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <Card>
          <TableComponent>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Candidate Owner</TableHead>
                <TableHead>Job ID</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.title}</TableCell>
                  <TableCell>Prashant Gosavi</TableCell>
                  <TableCell>SRN2025-10615</TableCell>
                  <TableCell>SRN-2127870</TableCell>
                  <TableCell>Altios</TableCell>
                  <TableCell>18 May 2025</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor('Active')} text-xs`}>
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedCandidate(candidate)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
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
            <Card key={candidate.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  <p className="text-gray-600 text-sm">{candidate.title}</p>
                  <p className="text-gray-500 text-xs mt-1">Recruited by: Prashant Gosavi</p>
                  <p className="text-gray-500 text-xs">Company: Altios</p>
                  <p className="text-gray-500 text-xs">18 May 2025</p>
                </div>
                <Badge className={`${getStatusColor('Active')} text-xs`}>
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Candidate Profile Sheet */}
      {selectedCandidate && (
        <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <SheetContent className="w-[600px] sm:max-w-[600px]">
            <CandidateProfile candidate={selectedCandidate} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
