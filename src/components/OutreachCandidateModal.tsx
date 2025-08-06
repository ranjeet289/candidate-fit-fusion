import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, Star, MapPin, Briefcase, MessageSquare, Send, Eye, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  type: "outbound" | "inbound";
  subject?: string;
  content: string;
  sentAt: string;
  status: "sent" | "delivered" | "opened" | "replied";
  platform: "email" | "linkedin";
}

interface CandidateModalProps {
  candidate: {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    fit: number;
    source: string;
    status: string;
    lastContact: string;
    addedDate: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock message history data
const getMessageHistory = (candidateId: string): Message[] => {
  const histories: Record<string, Message[]> = {
    "C001": [
      {
        id: "M001",
        type: "outbound",
        subject: "Exciting Opportunity - AI Engineer at TechCorp",
        content: "Hi Sarah,\n\nI hope this message finds you well. I came across your profile and was impressed by your experience in machine learning.\n\nI'm reaching out regarding an exciting AI Engineer opportunity at TechCorp that I believe would be a perfect fit for your background.\n\nWould you be interested in learning more about this role?\n\nBest regards,\nAlex Thompson",
        sentAt: "2 hours ago",
        status: "opened",
        platform: "email"
      }
    ],
    "C002": [
      {
        id: "M002",
        type: "outbound",
        subject: "Following up - ML Scientist Role",
        content: "Hi Marcus,\n\nI wanted to follow up on my previous message regarding the ML Research Scientist position at DataInc.\n\nI understand you're probably busy, but I'd love to share more details about this opportunity when you have a moment.\n\nPlease let me know if you'd like to schedule a brief call.\n\nBest regards,\nAlex Thompson",
        sentAt: "1 day ago",
        status: "opened",
        platform: "email"
      },
      {
        id: "M003",
        type: "inbound",
        content: "Hi Alex,\n\nThanks for reaching out! I'm definitely interested in learning more about the ML Research Scientist role. Could we schedule a call this week?\n\nLooking forward to hearing from you.\n\nBest,\nMarcus",
        sentAt: "18 hours ago",
        status: "replied",
        platform: "email"
      },
      {
        id: "M004",
        type: "outbound",
        subject: "Great to hear from you - Call scheduling",
        content: "Hi Marcus,\n\nFantastic! I'm excited to discuss this opportunity with you.\n\nI have availability on Thursday at 2 PM or Friday at 10 AM. Would either of these times work for you?\n\nBest regards,\nAlex Thompson",
        sentAt: "16 hours ago",
        status: "sent",
        platform: "email"
      }
    ],
    "C003": [
      {
        id: "M005",
        type: "outbound",
        subject: "Data Scientist Opportunity",
        content: "Hi Priya,\n\nI came across your profile and was impressed by your data science expertise.\n\nI have an exciting remote Data Scientist opportunity that might interest you.\n\nWould you be open to a brief conversation?\n\nBest regards,\nAlex Thompson",
        sentAt: "3 days ago",
        status: "delivered",
        platform: "linkedin"
      }
    ]
  };
  
  return histories[candidateId] || [];
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return <Send className="w-3 h-3" />;
    case "delivered":
      return <CheckCircle className="w-3 h-3" />;
    case "opened":
      return <Eye className="w-3 h-3" />;
    case "replied":
      return <ArrowRight className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "sent":
      return "text-blue-600";
    case "delivered":
      return "text-green-600";
    case "opened":
      return "text-orange-600";
    case "replied":
      return "text-purple-600";
    default:
      return "text-gray-600";
  }
};

export default function OutreachCandidateModal({ candidate, open, onOpenChange }: CandidateModalProps) {
  if (!candidate) return null;

  const messageHistory = getMessageHistory(candidate.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xl font-semibold">{candidate.name}</div>
              <p className="text-sm text-muted-foreground font-normal">{candidate.title}</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            View candidate details and message history
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Candidate Details */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Candidate Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span>Fit Score: {candidate.fit}/10</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>Source: {candidate.source}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Badge variant={
                  candidate.status === "responded" ? "default" : 
                  candidate.status === "no_response" ? "secondary" : "outline"
                }>
                  {candidate.status === "new_lead" ? "New Lead" : 
                   candidate.status === "responded" ? "Responded" : "No Response"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last contact: {candidate.lastContact}
                </span>
              </div>
            </Card>
          </div>

          {/* Message History */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message History ({messageHistory.length})
            </h3>
            
            {messageHistory.length === 0 ? (
              <Card className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No messages sent yet</p>
              </Card>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messageHistory.map((message) => (
                  <Card key={message.id} className={`p-4 ${
                    message.type === "outbound" ? "bg-blue-50 border-blue-200" : "bg-green-50 border-green-200"
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={message.type === "outbound" ? "outline" : "default"} className="text-xs">
                          {message.type === "outbound" ? "Sent" : "Received"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {message.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className={getStatusColor(message.status)}>
                          {getStatusIcon(message.status)}
                        </span>
                        <span>{message.status}</span>
                      </div>
                    </div>
                    
                    {message.subject && (
                      <h4 className="font-medium text-sm mb-2">{message.subject}</h4>
                    )}
                    
                    <p className="text-sm text-muted-foreground mb-2 whitespace-pre-wrap">
                      {message.content.length > 150 
                        ? message.content.substring(0, 150) + "..." 
                        : message.content}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      {message.sentAt}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}