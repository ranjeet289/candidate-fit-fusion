
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Download, RefreshCw, TrendingUp, Users, Briefcase, UserCheck, Shield, Target, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Active Jobs",
      value: "24",
      change: "+12%",
      subtitle: "Increased since last month",
      icon: Briefcase,
      color: "bg-blue-500"
    },
    {
      title: "Active Candidates", 
      value: "156",
      change: "+8%",
      subtitle: "In recruitment pipeline",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Active Recruiters",
      value: "8", 
      change: "+1",
      subtitle: "Team members working",
      icon: UserCheck,
      color: "bg-purple-500"
    },
    {
      title: "Placements This Month",
      value: "12",
      change: "+20%",
      subtitle: "Successfully filled positions",
      icon: Target,
      color: "bg-orange-500"
    }
  ];

  const pipelineStats = [
    { label: "New Candidates", value: "28", percentage: "18%", trend: "up" },
    { label: "Screening", value: "45", percentage: "29%", trend: "up" },
    { label: "Client Interviews", value: "32", percentage: "21%", trend: "stable" },
    { label: "Final Rounds", value: "18", percentage: "12%", trend: "up" },
    { label: "Offers Extended", value: "8", percentage: "5%", trend: "up" },
    { label: "Rejected/Withdrawn", value: "25", percentage: "15%", trend: "down" }
  ];

  const recruiterPerformance = [
    { name: "Prashant Gosavi", candidates: "34", placements: "5", fitRate: "8.2" },
    { name: "Jessica Park", candidates: "28", placements: "4", fitRate: "8.7" },
    { name: "Michael Kim", candidates: "22", placements: "3", fitRate: "7.9" },
    { name: "Sarah Chen", candidates: "19", placements: "2", fitRate: "8.4" }
  ];

  const recentActivity = [
    { type: "placement", message: "John Doe placed at TechCorp as Senior Developer", time: "2 hours ago", recruiter: "Prashant Gosavi" },
    { type: "submission", message: "3 candidates submitted for Product Manager role", time: "4 hours ago", recruiter: "Jessica Park" },
    { type: "interview", message: "Final interview scheduled for Sarah Wilson", time: "6 hours ago", recruiter: "Michael Kim" },
    { type: "rejection", message: "Candidate rejected - Fit score 6.2 below threshold", time: "8 hours ago", recruiter: "System" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'placement': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'submission': return <Users className="w-4 h-4 text-blue-600" />;
      case 'interview': return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'rejection': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Recruitment agency performance dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Starting Date" className="pr-10" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="relative">
              <Input placeholder="Ending Date" className="pr-10" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.change && (
                      <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
              </div>
            </div>
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.color} rounded-bl-full flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline and Performance Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Pipeline */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recruitment Pipeline</h3>
          <div className="space-y-4">
            {pipelineStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded"></div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.percentage} of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{item.value}</span>
                  <div className={`text-xs ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recruiter Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recruiter Performance</h3>
          <div className="space-y-4">
            {recruiterPerformance.map((recruiter, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{recruiter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {recruiter.candidates} candidates • {recruiter.placements} placements
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    Avg Fit: {recruiter.fitRate}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.recruiter}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View All Activity
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
