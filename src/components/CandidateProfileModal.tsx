import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Star,
  Clock,
  Send,
  CheckCircle2,
  Globe,
  Building,
  Award,
  DollarSign
} from "lucide-react";

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    candidateId: string;
    candidateName: string;
    candidateTitle: string;
    matchScore: number;
    lastActive: string;
    preferredLocations: string[];
    skillGapAnalysis: {
      strength: string[];
      missing: string[];
    };
    reasons: string[];
  } | null;
  onSendOutreach: () => void;
  onSubmit: () => void;
  isOutreachSent: boolean;
}

export default function CandidateProfileModal({ 
  isOpen, 
  onClose, 
  candidate, 
  onSendOutreach, 
  onSubmit,
  isOutreachSent 
}: CandidateProfileModalProps) {
  if (!candidate) return null;

  // Mock additional candidate data for the profile
  const candidateProfile = {
    email: `${candidate.candidateName.toLowerCase().replace(' ', '.')}@email.com`,
    phone: "+1 (555) 123-4567",
    location: candidate.preferredLocations[0] || "Remote",
    availability: "Available",
    salaryExpectation: "$120k - $150k",
    experience: "5+ years",
    currentCompany: "Tech Innovations Inc.",
    currentRole: "Senior Software Engineer",
    education: "MS Computer Science - Stanford University",
    linkedinUrl: "linkedin.com/in/candidate",
    portfolioUrl: "portfolio.dev",
    workPreference: "Remote / Hybrid",
    timezone: "PST (UTC-8)",
    startDate: "2-4 weeks notice"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Candidate Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{candidate.candidateName}</h2>
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">{candidate.matchScore.toFixed(1)}</span>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-3">{candidate.candidateTitle}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{candidateProfile.currentCompany}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{candidateProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Active {candidate.lastActive}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>{candidateProfile.salaryExpectation}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {isOutreachSent ? (
                <Button disabled variant="outline" className="bg-green-50 border-green-200 text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Added to Outreach
                </Button>
              ) : (
                <Button onClick={onSendOutreach}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Outreach
                </Button>
              )}
              
              <Button variant="outline" onClick={onSubmit}>
                Submit now
              </Button>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{candidateProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{candidateProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-primary cursor-pointer hover:underline">{candidateProfile.linkedinUrl}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-primary cursor-pointer hover:underline">{candidateProfile.portfolioUrl}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills Analysis */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills Analysis</h3>
            <div className="grid grid-cols-2 gap-6">
              {candidate.skillGapAnalysis.strength.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">✅ Key Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skillGapAnalysis.strength.map((skill, index) => (
                      <Badge key={index} className="bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {candidate.skillGapAnalysis.missing.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-orange-700 mb-2">📚 Growth Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skillGapAnalysis.missing.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Experience & Education */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experience
              </h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">{candidateProfile.currentRole}</p>
                  <p className="text-sm text-muted-foreground">{candidateProfile.currentCompany}</p>
                  <p className="text-xs text-muted-foreground">{candidateProfile.experience}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Software Engineer</p>
                  <p className="text-sm text-muted-foreground">Previous Company</p>
                  <p className="text-xs text-muted-foreground">2 years</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h3>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">{candidateProfile.education}</p>
                <p className="text-sm text-muted-foreground">2018 - 2020</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences & Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Work Preferences & Availability</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Work Style</p>
                <p className="text-muted-foreground">{candidateProfile.workPreference}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Timezone</p>
                <p className="text-muted-foreground">{candidateProfile.timezone}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Start Date</p>
                <p className="text-muted-foreground">{candidateProfile.startDate}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="font-medium mb-2">Preferred Locations</p>
              <div className="flex flex-wrap gap-2">
                {candidate.preferredLocations.map((location, index) => (
                  <Badge key={index} variant="outline">{location}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Why They're Perfect */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Why They're Perfect for This Role</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.reasons.map((reason, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}