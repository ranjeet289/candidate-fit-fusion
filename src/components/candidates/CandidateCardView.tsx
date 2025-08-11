
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Star, Eye, Linkedin, Copy, Download, Mail } from "lucide-react";
import { toast } from "sonner";

interface CandidateCardViewProps {
  candidates: any[];
  onViewProfile: (candidate: any) => void;
}

export default function CandidateCardView({ candidates, onViewProfile }: CandidateCardViewProps) {
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="p-4 md:p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{candidate.name}</h3>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Linkedin className="w-3 h-3 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="w-3 h-3 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{candidate.title}</p>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{candidate.email || `${candidate.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0"
                    onClick={() => copyEmail(candidate.email || `${candidate.name.toLowerCase().replace(' ', '.')}@email.com`)}
                  >
                    <Copy className="w-3 h-3 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`${getStatusColor(candidate.stage)} text-xs`}>
                {candidate.stage}
              </Badge>
              <Button variant="outline" size="sm" className="text-xs">
                Submit now
              </Button>
            </div>
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

          <div className="flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(candidate)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
