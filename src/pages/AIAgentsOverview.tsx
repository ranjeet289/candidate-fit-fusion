import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  MessageSquare, 
  Send, 
  Bot,
  ArrowRight,
  Zap,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";

const agentStats = [
  { label: "Active Candidates", value: "247", trend: "+12%" },
  { label: "Jobs Matched", value: "89", trend: "+23%" },
  { label: "Success Rate", value: "94%", trend: "+5%" },
  { label: "Response Rate", value: "67%", trend: "+15%" }
];

const agents = [
  {
    id: "sourcing",
    name: "Sourcing Agent",
    description: "AI-powered candidate discovery across multiple platforms",
    icon: Target,
    color: "bg-blue-500",
    route: "/sourcing-agent",
    stats: { found: 156, added: 89, active: true },
    features: ["LinkedIn Scraping", "GitHub Discovery", "Resume Parsing", "Fit Scoring"]
  },
  {
    id: "outreach",
    name: "Outreach Agent", 
    description: "Automated personalized candidate outreach and follow-ups",
    icon: MessageSquare,
    color: "bg-green-500",
    route: "/outreach-agent",
    stats: { sent: 234, responded: 156, active: true },
    features: ["Email Templates", "LinkedIn Messages", "Follow-up Sequences", "Response Tracking"]
  },
  {
    id: "submission",
    name: "Submission Agent",
    description: "Smart candidate-job matching and automated submissions",
    icon: Send,
    color: "bg-purple-500", 
    route: "/submission-agent",
    stats: { submitted: 67, approved: 45, active: true },
    features: ["Smart Matching", "Cover Letter Gen", "Submission Tracking", "Status Updates"]
  },
  {
    id: "recruiter",
    name: "AI Recruiter",
    description: "End-to-end recruitment workflow automation",
    icon: Bot,
    color: "bg-orange-500",
    route: "/ai-recruiter",
    stats: { processed: 189, matched: 78, active: true },
    features: ["Resume Analysis", "Job Matching", "Candidate Scoring", "Pipeline Management"]
  }
];

const recentActivity = [
  {
    id: 1,
    agent: "Sourcing Agent",
    action: "Found 5 new candidates for AI Engineer role",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    agent: "Outreach Agent", 
    action: "Sent 12 personalized emails with 58% open rate",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: 3,
    agent: "Submission Agent",
    action: "Submitted 3 candidates to high-priority positions",
    time: "1 hour ago", 
    status: "pending"
  },
  {
    id: 4,
    agent: "AI Recruiter",
    action: "Analyzed 23 resumes and scored candidates",
    time: "2 hours ago",
    status: "success"
  }
];

export default function AIAgentsOverview() {
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("AI Recruitment Agents");
    setIcon(<Bot className="w-6 h-6 text-primary" />);
    setBadge(<Badge variant="secondary" className="bg-green-100 text-green-800">All Systems Active</Badge>);
  }, [setTitle, setIcon, setBadge]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 py-8 px-2 sm:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentStats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {stat.trend}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Agents Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Your AI Recruitment Team</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${agent.color} text-white`}>
                        <agent.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                    <Badge variant={agent.stats.active ? "default" : "secondary"} className="text-xs">
                      {agent.stats.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(agent.stats).filter(([key]) => key !== 'active').map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-muted/50 rounded-lg">
                        <p className="text-lg font-semibold">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link to={agent.route} className="flex items-center gap-2">
                      Open {agent.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Agent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.agent}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}