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
  // Mock evaluation data based on the JSON structure
  const evaluationData = {
    final_score: 8.4,
    confidence_level: 85.0,
    match_rate: 85.0,
    verdict: "Accept",
    breakdown: {
      education: { score: 6.0, confidence: 70.0, description: "BSc (Hons) in Computing from London Metropolitan University, classified as a Tier 3 institution. While not from a top-tier university, the degree is relevant to the field of Information Technology." },
      career_trajectory: { score: 8.5, confidence: 85.0, description: "Strong career progression from Frontend Developer to Senior Software Engineer over 8 years, with increasing responsibilities and leadership in AI and full-stack development." },
      company_relevance: { score: 7.5, confidence: 80.0, description: "Experience at American Express and Fiserv provides strong enterprise exposure, though not at elite tech companies. The roles involved significant technical contributions relevant to the target role." },
      tenure_stability: { score: 8.0, confidence: 80.0, description: "Maintained stable tenures at each company, averaging around 2 years per role, which is consistent with industry norms for technology roles." },
      most_important_skills: { score: 8.0, confidence: 80.0, description: "Demonstrated expertise in full-stack development, AI integration, and cloud infrastructure aligns well with the role requirements. However, specific experience with GCP and some AI tools like Ray or Temporal is not explicitly mentioned." },
      bonus_signals: { score: 3.0, confidence: 50.0, description: "No significant bonus signals such as patents or major awards are mentioned, but the candidate has contributed to innovative AI projects." },
      red_flags: { score: 0.0, confidence: 100.0, description: "No red flags identified in the candidate's profile." }
    },
    summary: {
      strengths: ["Strong full-stack development skills", "Experience with AI integration", "Stable career progression"],
      weaknesses: ["Lack of explicit experience with GCP", "No major bonus signals like patents or awards"],
      opportunities: ["Potential for leadership in cross-functional teams", "Opportunity to expand expertise in GCP and advanced AI tools"],
      recommendations: ["Fast-track interview", "Technical assessment focus"]
    },
    match_requirements: ["Full-stack development expertise", "AI integration experience", "Stable career progression"],
    miss_requirements: ["Specific experience with GCP", "Experience with Ray or Temporal"]
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "bg-green-100 border-green-200";
    if (score >= 6) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

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
              
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{candidateProfile.currentCompany}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{candidateProfile.location}</span>
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