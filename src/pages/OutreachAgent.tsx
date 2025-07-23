import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, User, Mail, Phone, Calendar, Send, Eye, CheckCircle, Clock, Star, ArrowRight, Plus, Edit3, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { usePageTitle } from "@/hooks/use-page-title";

const candidatesFromPipeline = [
  {
    id: "C001",
    name: "Sarah Chen",
    title: "Senior AI Engineer",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    lastContact: "Never contacted",
    status: "new_lead",
    fit: 9.2,
    source: "Sourcing Agent",
    addedDate: "2024-01-15"
  },
  {
    id: "C002", 
    name: "Marcus Johnson",
    title: "ML Research Scientist",
    email: "m.johnson@email.com",
    phone: "+1 (555) 234-5678",
    lastContact: "2 days ago",
    status: "responded",
    fit: 8.8,
    source: "Sourcing Agent",
    addedDate: "2024-01-14"
  },
  {
    id: "C003",
    name: "Priya Patel",
    title: "Data Scientist", 
    email: "priya.patel@email.com",
    phone: "+1 (555) 345-6789",
    lastContact: "1 week ago",
    status: "no_response",
    fit: 8.5,
    source: "Sourcing Agent",
    addedDate: "2024-01-10"
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
    status: "sent",
    template: "initial"
  },
  {
    id: "O002",
    candidate: "Marcus Johnson", 
    type: "email",
    subject: "Following up - ML Scientist Role",
    sentAt: "1 day ago",
    status: "opened",
    template: "followup"
  },
  {
    id: "O003",
    candidate: "Priya Patel",
    type: "linkedin",
    subject: "Data Scientist Opportunity",
    sentAt: "3 days ago",
    status: "replied",
    template: "initial"
  }
];

const automatedSequences = [
  {
    id: "SEQ001",
    name: "AI Engineer Sequence",
    candidateCount: 3,
    status: "active",
    steps: ["Initial outreach", "Follow-up (Day 3)", "Final follow-up (Day 7)"],
    responseRate: "67%"
  },
  {
    id: "SEQ002",
    name: "ML Scientist Sequence", 
    candidateCount: 2,
    status: "active",
    steps: ["Initial outreach", "Follow-up (Day 5)", "LinkedIn message (Day 10)"],
    responseRate: "50%"
  }
];

export default function OutreachAgent() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [isCreatingSequence, setIsCreatingSequence] = useState(false);
  const [editingSequence, setEditingSequence] = useState<string | null>(null);
  const [newSequenceName, setNewSequenceName] = useState("");
  const [automationConfig, setAutomationConfig] = useState({
    method: "email", // or "linkedin"
    frequency: "immediate", // later you could have options like "scheduled"
    recruiterEmail: "",
    linkedinProfile: "",
  });
  const { toast } = useToast();
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("Outreach Agent");
    setIcon(<MessageSquare className="w-6 h-6 text-primary" />);
    setBadge(<Badge variant="secondary" className="ml-3">Premium</Badge>);
  }, [setTitle, setIcon, setBadge]);

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
      toast({
        title: "Message Sent",
        description: "Outreach message has been sent successfully",
      });
    }, 1500);
  };

  const handleAIPersonalize = () => {
    if (!selectedCandidate) {
      toast({
        title: "Selection Required",
        description: "Please select a candidate first",
        variant: "destructive"
      });
      return;
    }
    
    setIsPersonalizing(true);
    setTimeout(() => {
      const candidate = candidatesFromPipeline.find(c => c.id === selectedCandidate);
      const personalizedContent = messageContent
        .replace('{CandidateName}', candidate?.name || '')
        .replace('{JobTitle}', 'Senior AI Engineer')
        .replace('{Company}', 'TechCorp')
        .replace('{RelevantSkill}', 'machine learning')
        .replace('{RecruiterName}', 'Alex Thompson');
      
      setMessageContent(personalizedContent);
      setIsPersonalizing(false);
      toast({
        title: "Message Personalized",
        description: "AI has personalized the message for the selected candidate",
      });
    }, 1500);
  };

  // For demonstration, simulate "auto-send" on pipeline add (mocked)
  useEffect(() => {
    if (!automationEnabled) return;
    // Find candidates that should get an automated message (mock logic)
    const newCandidates = candidatesFromPipeline.filter(
      (c) => c.status === "new_lead"
    );
    if (newCandidates.length) {
      newCandidates.forEach((candidate) => {
        // Here, send "automated" message
        console.log(
          `[Automation] Sent ${automationConfig.method === "email" ? "email" : "LinkedIn DM"} to ${candidate.name} from ${automationConfig.method === "email" ? automationConfig.recruiterEmail : automationConfig.linkedinProfile || "your account"}`
        );
        toast({
          title: "Automated Outreach Sent",
          description: `Sent ${automationConfig.method === "email" ? "email" : "LinkedIn DM"} to ${candidate.name} automatically.`,
        });
        // Would normally update status/history in backend here
      });
    }
    // Prevent multiple triggers unless candidate status changes
    // eslint-disable-next-line
  }, [automationEnabled, automationConfig.method, automationConfig.recruiterEmail, automationConfig.linkedinProfile]);

  const handleCreateSequence = () => {
    if (!newSequenceName.trim()) return;
    
    toast({
      title: "Sequence Created",
      description: `New sequence "${newSequenceName}" has been created successfully`,
    });
    setIsCreatingSequence(false);
    setNewSequenceName("");
  };

  const handleEditSequence = (sequenceId: string) => {
    setEditingSequence(sequenceId);
  };

  const handleDeleteSequence = (sequenceId: string) => {
    toast({
      title: "Sequence Deleted",
      description: "Automated sequence has been deleted",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Automation panel at top */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-4">
        <Card className="p-6 mb-6 bg-amber-50 border-yellow-400 border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-bold text-lg flex items-center gap-2">
                Automate Outreach
                <Badge variant="outline" className="uppercase text-yellow-700 border-yellow-500 bg-yellow-100">Beta</Badge>
              </h2>
              <div className="text-muted-foreground text-sm mt-1">
                When enabled, all new candidates added to the pipeline will automatically receive your outreach via email or LinkedIn DMs using your recruiter account.
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              <Switch
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
                id="automation-toggle"
                className="mr-2"
                aria-label="Enable automate outreach"
              />
              <label htmlFor="automation-toggle" className="font-semibold">
                {automationEnabled ? "Enabled" : "Disabled"}
              </label>
            </div>
          </div>

          {/* Automation Config */}
          {automationEnabled && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
            >
              <div>
                <label className="block font-semibold mb-1">Send Method</label>
                <select
                  value={automationConfig.method}
                  onChange={(e) =>
                    setAutomationConfig((c) => ({
                      ...c,
                      method: e.target.value,
                    }))
                  }
                  className="block w-full px-3 py-2 border rounded-md"
                >
                  <option value="email">Email (from your recruiter email)</option>
                  <option value="linkedin">LinkedIn DM (from your LinkedIn)</option>
                </select>
              </div>
              {automationConfig.method === "email" && (
                <div>
                  <label className="block font-semibold mb-1">Recruiter Email</label>
                  <input
                    type="email"
                    value={automationConfig.recruiterEmail}
                    onChange={(e) =>
                      setAutomationConfig((c) => ({
                        ...c,
                        recruiterEmail: e.target.value,
                      }))
                    }
                    className="block w-full px-3 py-2 border rounded-md"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              )}
              {automationConfig.method === "linkedin" && (
                <div>
                  <label className="block font-semibold mb-1">
                    LinkedIn Profile Link
                  </label>
                  <input
                    type="url"
                    value={automationConfig.linkedinProfile}
                    onChange={(e) =>
                      setAutomationConfig((c) => ({
                        ...c,
                        linkedinProfile: e.target.value,
                      }))
                    }
                    className="block w-full px-3 py-2 border rounded-md"
                    placeholder="https://linkedin.com/in/yourprofile"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block font-semibold mb-1">Timing</label>
                <select
                  value={automationConfig.frequency}
                  onChange={(e) =>
                    setAutomationConfig((c) => ({
                      ...c,
                      frequency: e.target.value,
                    }))
                  }
                  className="block w-full px-3 py-2 border rounded-md"
                >
                  <option value="immediate">Send Immediately</option>
                  <option value="daily">Batch Daily</option>
                  {/* More options can be added */}
                </select>
              </div>
            </form>
          )}

          {automationEnabled && (
            <div className="mt-4 text-green-700 text-sm flex flex-col gap-1">
              <span>
                <strong>Status:</strong>{" "}
                Automation enabled for {automationConfig.method === "email" ? "Email" : "LinkedIn"} outreach.
              </span>
              {automationConfig.method === "email" && automationConfig.recruiterEmail && (
                <span>
                  <strong>Sender:</strong> {automationConfig.recruiterEmail}
                </span>
              )}
              {automationConfig.method === "linkedin" && automationConfig.linkedinProfile && (
                <span>
                  <strong>Sender:</strong> {automationConfig.linkedinProfile}
                </span>
              )}
              <span>
                <strong>When:</strong>{" "}
                {automationConfig.frequency === "immediate"
                  ? "On pipeline add"
                  : "Batch daily"}
              </span>
            </div>
          )}
        </Card>
      </div>

      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="pipeline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pipeline">Pipeline ({candidatesFromPipeline.length})</TabsTrigger>
              <TabsTrigger value="sequences">Auto Sequences</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline">
              <Card className="p-8 bg-background shadow-xl">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Candidate Pipeline</h3>
                  <p className="text-muted-foreground">
                    Candidates from your sourcing agent ready for outreach.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {candidatesFromPipeline.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-colors">
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
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Fit: {candidate.fit}
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
                          <p className="text-xs text-muted-foreground">
                            Added: {candidate.addedDate}
                          </p>
                        </div>
                        
                        <Button size="sm" className="bg-primary text-white">
                          Start Outreach
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {candidatesFromPipeline.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No candidates in pipeline. Add candidates from the Sourcing Agent.</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <a href="/sourcing-agent">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Go to Sourcing Agent
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="sequences">
              <Card className="p-8 bg-background shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Automated Sequences</h3>
                    <p className="text-muted-foreground">
                      Manage your automated outreach sequences and assigned candidates.
                    </p>
                  </div>
                  <Dialog open={isCreatingSequence} onOpenChange={setIsCreatingSequence}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Sequence
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Sequence</DialogTitle>
                        <DialogDescription>
                          Set up a new automated outreach sequence for your candidates.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="sequence-name">Sequence Name</Label>
                          <Input
                            id="sequence-name"
                            value={newSequenceName}
                            onChange={(e) => setNewSequenceName(e.target.value)}
                            placeholder="e.g., Senior Engineer Outreach"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sequence-steps">Number of Steps</Label>
                          <Select defaultValue="3">
                            <SelectTrigger>
                              <SelectValue placeholder="Select steps" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 Steps</SelectItem>
                              <SelectItem value="3">3 Steps</SelectItem>
                              <SelectItem value="4">4 Steps</SelectItem>
                              <SelectItem value="5">5 Steps</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatingSequence(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateSequence}>
                          Create Sequence
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-6">
                  {automatedSequences.map((sequence) => (
                    <Card key={sequence.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-medium text-lg">{sequence.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {sequence.candidateCount} candidates • {sequence.responseRate} response rate
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={sequence.status === 'active' ? 'default' : 'outline'}>
                            {sequence.status}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Sequence: {sequence.name}</DialogTitle>
                                <DialogDescription>
                                  Modify your automated outreach sequence settings.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <Label htmlFor="edit-sequence-name">Sequence Name</Label>
                                  <Input
                                    id="edit-sequence-name"
                                    defaultValue={sequence.name}
                                    placeholder="Sequence name"
                                  />
                                </div>
                                <div>
                                  <Label>Sequence Steps</Label>
                                  <div className="space-y-2 mt-2">
                                    {sequence.steps.map((step, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <Input defaultValue={step} placeholder={`Step ${index + 1}`} />
                                        <Button size="sm" variant="outline">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ))}
                                    <Button size="sm" variant="outline" className="w-full">
                                      <Plus className="w-4 h-4 mr-2" />
                                      Add Step
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="sequence-status">Status</Label>
                                  <Select defaultValue={sequence.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="paused">Paused</SelectItem>
                                      <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteSequence(sequence.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Sequence Steps:</p>
                        <div className="flex flex-wrap gap-2">
                          {sequence.steps.map((step, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {step}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Show candidates in this sequence */}
                      <div>
                        <p className="text-sm font-medium mb-3">Candidates in Sequence:</p>
                        <div className="space-y-2">
                          {candidatesFromPipeline.slice(0, sequence.candidateCount).map((candidate) => (
                            <div key={candidate.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{candidate.name}</p>
                                  <p className="text-xs text-muted-foreground">{candidate.title}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Step 1
                                </Badge>
                                <Badge 
                                  variant={candidate.status === 'responded' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {candidate.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
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
                          <p className="text-xs text-muted-foreground">Template: {outreach.template}</p>
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