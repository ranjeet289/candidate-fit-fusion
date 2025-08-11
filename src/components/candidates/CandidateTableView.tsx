
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MoreHorizontal, Eye, Copy, Linkedin, Download, Mail } from "lucide-react";
import { toast } from "sonner";
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

interface CandidateTableViewProps {
  candidates: any[];
  onViewProfile: (candidate: any) => void;
}

export default function CandidateTableView({ candidates, onViewProfile }: CandidateTableViewProps) {
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Submitted to AM': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Submitted to Client': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Sendout': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Next Interview': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Final Interview': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 font-semibold';
    if (score >= 8) return 'text-blue-600 font-semibold';
    if (score >= 7.5) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <Card className="bg-white border border-gray-200">
      <div className="overflow-x-auto">
        <TableComponent>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-600 font-medium">Candidate</TableHead>
              <TableHead className="text-gray-600 font-medium">Job Title</TableHead>
              <TableHead className="text-gray-600 font-medium">Recruiter</TableHead>
              <TableHead className="text-gray-600 font-medium">Job ID</TableHead>
              <TableHead className="text-gray-600 font-medium">Fit Score</TableHead>
              <TableHead className="text-gray-600 font-medium">Stage</TableHead>
              <TableHead className="text-gray-600 font-medium">Date Added</TableHead>
              <TableHead className="text-gray-600 font-medium">Submit</TableHead>
              <TableHead className="text-gray-600 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id} className="border-gray-200 hover:bg-gray-50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-medium text-gray-900">{candidate.name}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            <Linkedin className="w-3 h-3 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            <Download className="w-3 h-3 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{candidate.location}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="w-3 h-3" />
                        <span>{candidate.email || `${candidate.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => copyEmail(candidate.email || `${candidate.name.toLowerCase().replace(' ', '.')}@email.com`)}
                        >
                          <Copy className="w-3 h-3 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <div className="font-medium text-gray-900">{candidate.title}</div>
                    <div className="text-sm text-gray-500">{candidate.experience}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-gray-900">{candidate.recruiter}</TableCell>
                <TableCell className="py-4 font-mono text-sm text-gray-700">{candidate.jobId}</TableCell>
                <TableCell className="py-4">
                  <span className={getFitScoreColor(candidate.fitScore)}>
                    {candidate.fitScore}/10
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <Badge className={`${getStatusColor(candidate.stage)} text-xs px-2 py-1`}>
                    {candidate.stage}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-sm text-gray-600">{candidate.dateAdded}</TableCell>
                <TableCell className="py-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    Submit now
                  </Button>
                </TableCell>
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border shadow-lg">
                      <DropdownMenuItem onClick={() => onViewProfile(candidate)}>
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
      </div>
    </Card>
  );
}
