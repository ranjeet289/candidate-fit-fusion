
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MoreHorizontal, Eye, Copy, Linkedin } from "lucide-react";
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

  return (
    <Card className="overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead className="hidden sm:table-cell">Job Title</TableHead>
            <TableHead className="hidden md:table-cell">Recruiter</TableHead>
            <TableHead className="hidden lg:table-cell">Job ID</TableHead>
            <TableHead>Fit Score</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="hidden sm:table-cell">Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">{candidate.title}</div>
                    <div className="text-sm text-muted-foreground">{candidate.location}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div>
                  <div className="font-medium">{candidate.title}</div>
                  <div className="text-sm text-muted-foreground">{candidate.experience}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell font-medium">{candidate.recruiter}</TableCell>
              <TableCell className="hidden lg:table-cell font-mono text-sm">{candidate.jobId}</TableCell>
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
              <TableCell className="hidden sm:table-cell text-sm">{candidate.dateAdded}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border shadow-lg">
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
    </Card>
  );
}
