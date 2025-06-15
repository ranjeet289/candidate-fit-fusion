
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, User, Mail, Phone, Calendar, Send, Eye } from "lucide-react";

const candidates = [
  {
    id: "C001",
    name: "Sarah Chen",
    title: "Senior AI Engineer",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    lastContact: "Never contacted",
    status: "new_lead"
  },
  {
    id: "C002", 
    name: "Marcus Johnson",
    title: "ML Research Scientist",
    email: "m.johnson@email.com",
    phone: "+1 (555) 234-5678",
    lastContact: "2 days ago",
    status: "responded"
  },
  {
    id: "C003",
    name: "Priya Patel",
    title: "Data Scientist", 
    email: "priya.patel@email.com",
    phone: "+1 (555) 345-6789",
    lastContact: "1 week ago",
    status: "no_response"
  }
];

const messageTemplates = [
  {
    id: "initial",
    name: "Initial Outreach",
    subject: "Exciting Opportunity - {JobTitle} at {Company}",
    content: "Hi {CandidateName},\n\nI hope this message finds you well. I came across your profile and was impressed by your experience in {RelevantSkill}.\n\nI'm reaching out regarding an exciting {JobTitle} opportunity at {Company} that I believe would be a perfect fit for your background.\n\nWould you be interested in learning more about this role?\n\nBest regards,\n{RecruiterName}"
  },
  {
    id: "followup",
    name: "Follow-up",
    subject: "Following up - {JobTitle} Opportunity",
    content: "Hi {CandidateName},\n\nI wanted to follow up on my previous message regarding the {JobTitle} position at {Company}.\n\nI understand you're probably busy, but I'd love to share more details about this opportunity when you have a moment.\n\nPlease let me know if you'd like to schedule a brief call.\n\nBest regards,\n{RecruiterName}"
  },
  {
    id: "interview",
    name: "Interview Invitation",
    subject: "Interview Invitation - {JobTitle} at {Company}",
    content: "Hi {CandidateName},\n\nGreat news! The hiring team at {Company} would like to invite you for an interview for the {JobTitle} position.\n\nWould you be available for a 45-minute interview next week? I can provide several time slots that work for the team.\n\nLooking forward to hearing from you!\n\nBest regards,\n{RecruiterName}"
  }
];

const outreachHistory = [
  {
    id: "O001",
    candidate: "Sarah Chen",
    type: "email",
    subject: "Exciting Opportunity - AI Engineer at TechCorp",
    sentAt: "2 hours ago",
    status: "sent"
  },
  {
    id: "O002",
    candidate: "Marcus Johnson", 
    type: "email",
    subject: "Following up - ML Scientist Role",
    sentAt: "1 day ago",
    status: "opened"
  },
  {
    id: "O003",
    candidate: "Priya Patel",
    type: "linkedin",
    subject: "Data Scientist Opportunity",
    sentAt: "3 days ago",
    status: "replied"
  }
];

export default function OutreachAgent() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setMessageContent(template.content);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSelectedCandidate("");
      setSelectedTemplate("");
      setMessageContent("");
      setSubject("");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-10 py-6 border-b">
        <MessageSquare className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Outreach Agent</h1>
        <Badge variant="secondary" className="ml-3">Premium</Badge>
      </header>

      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="compose" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Compose Message</TabsTrigger>
              <TabsTrigger value="candidates">Candidate Pipeline</TabsTrigger>
              <TabsTrigger value="history">Outreach History</TabsTrigger>
            </TabsList>

            <TabsContent value="compose">
              <Card className="p-8 bg-background shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">AI-Powered Outreach</h2>
                  <p className="text-muted-foreground">
                    Create personalized outreach messages with AI assistance and automated follow-ups.
                  </p>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Select Candidate</label>
                      <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a candidate..." />
                        </SelectTrigger>
                        <SelectContent>
                          {candidates.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.id}>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{candidate.name} - {candidate.title}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Message Template</label>
                      <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {messageTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Subject Line</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter email subject..."
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Message Content</label>
                    <Textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Your personalized message here..."
                      className="min-h-48"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button type="button" variant="outline" size="sm">
                        AI Personalize
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit"
                      disabled={isSending || !selectedCandidate || !messageContent.trim()}
                      className="bg-primary text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSending ? "Sending..." : "Send Message"}
                    </Button>
                    <Button type="button" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Send
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="candidates">
              <Card className="p-8 bg-background shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Candidate Pipeline</h3>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {candidate.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {candidate.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge 
                            variant={candidate.status === 'responded' ? 'default' : 'outline'}
                            className="mb-1"
                          >
                            {candidate.status.replace('_', ' ')}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            Last contact: {candidate.lastContact}
                          </p>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-8 bg-background shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Outreach History</h3>
                <div className="space-y-4">
                  {outreachHistory.map((outreach) => (
                    <div key={outreach.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {outreach.type === 'email' ? (
                            <Mail className="w-5 h-5 text-primary" />
                          ) : (
                            <MessageSquare className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{outreach.candidate}</p>
                          <p className="text-sm text-muted-foreground">{outreach.subject}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge 
                            variant={outreach.status === 'replied' ? 'default' : 'outline'}
                          >
                            {outreach.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{outreach.sentAt}</p>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
