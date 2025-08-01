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
  DollarSign,
  ArrowRight
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
  // Mock evaluation data based on the JSON structure
  const evaluationData = {
    breakdown: {
      education: { score: 6.0, confidence: 70.0, description: "BSc (Hons) in Computing from London Metropolitan University, classified as a Tier 3 institution. While not from a top-tier university, the degree is relevant to the field of Information Technology." },
      career_trajectory: { score: 8.5, confidence: 85.0, description: "Strong career progression from Frontend Developer to Senior Software Engineer over 8 years, with increasing responsibilities and leadership in AI and full-stack development." },
      company_relevance: { score: 7.5, confidence: 80.0, description: "Experience at American Express and Fiserv provides strong enterprise exposure, though not at elite tech companies. The roles involved significant technical contributions relevant to the target role." },
      tenure_stability: { score: 8.0, confidence: 80.0, description: "Maintained stable tenures at each company, averaging around 2 years per role, which is consistent with industry norms for technology roles." },
      most_important_skills: { score: 8.0, confidence: 80.0, description: "Demonstrated expertise in full-stack development, AI integration, and cloud infrastructure aligns well with the role requirements. However, specific experience with GCP and some AI tools like Ray or Temporal is not explicitly mentioned." },
      bonus_signals: { score: 3.0, confidence: 50.0, description: "No significant bonus signals such as patents or major awards are mentioned, but the candidate has contributed to innovative AI projects." },
      red_flags: { score: 0.0, confidence: 100.0, description: "No red flags identified in the candidate's profile." }
    }
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "bg-primary/10 border-primary/20";
    if (score >= 6) return "bg-secondary/10 border-secondary/20";
    return "bg-muted border-muted";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 8) return "text-primary";
    if (score >= 6) return "text-secondary-foreground";
    return "text-muted-foreground";
  };

  // Mock additional candidate data for the profile
  const candidateProfile = candidate ? {
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
  } : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Candidate Profile</DialogTitle>
        </DialogHeader>
        
        {!candidate ? (
          <div className="p-4 text-center">
            <p>No candidate data available</p>
          </div>
        ) : (
        
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">{candidate.candidateName}</h2>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">{candidate.matchScore.toFixed(1)}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{candidate.candidateTitle}</p>
              
               <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="flex items-center gap-1">
                   <Building className="w-3 h-3 text-muted-foreground" />
                   <span>{candidateProfile?.currentCompany}</span>
                 </div>
                 <div className="flex items-center gap-1">
                   <MapPin className="w-3 h-3 text-muted-foreground" />
                   <span>{candidateProfile?.location}</span>
                 </div>
               </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-1">
              {isOutreachSent ? (
                <Button disabled variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Added to Outreach
                </Button>
              ) : (
                <Button onClick={onSendOutreach} size="sm" className="text-xs">
                  <Send className="w-3 h-3 mr-1" />
                  Send Outreach
                </Button>
              )}
              
              <Button variant="outline" onClick={onSubmit} size="sm" className="text-xs">
                <ArrowRight className="w-3 h-3 mr-1" />
                Submit now
              </Button>
            </div>
          </div>

          <Separator />

          {/* Contact & Skills Combined */}
          <div className="grid grid-cols-2 gap-4">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Contact</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span>{candidateProfile?.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span>{candidateProfile?.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-muted-foreground" />
                  <span className="text-primary cursor-pointer hover:underline">{candidateProfile?.linkedinUrl}</span>
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Skills</h3>
              <div className="space-y-2">
                {candidate.skillGapAnalysis.strength.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-green-700 mb-1">✅ Strengths</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skillGapAnalysis.strength.slice(0, 3).map((skill, index) => (
                        <Badge key={index} className="text-xs bg-green-50 text-green-700 border-green-200 px-1 py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {candidate.skillGapAnalysis.missing.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-orange-700 mb-1">📚 Growth</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skillGapAnalysis.missing.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 px-1 py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Category Breakdown - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Evaluation Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(evaluationData.breakdown).map(([category, data]) => (
                <div key={category} className={`p-2 border rounded ${getScoreBgColor(data.score)}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium capitalize">{category.replace('_', ' ')}</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-bold ${getScoreTextColor(data.score)}`}>{data.score.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">({data.confidence}%)</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{data.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Why They're Perfect */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Perfect Match Reasons</h3>
            <div className="flex flex-wrap gap-1">
              {candidate.reasons.map((reason, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}