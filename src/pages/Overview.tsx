
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Download, RefreshCw, TrendingUp, Users, Briefcase, UserCheck, Shield } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Active Jobs",
      value: "257",
      change: "+12%",
      subtitle: "Increased since last month",
      icon: Briefcase,
      color: "bg-purple-500"
    },
    {
      title: "Active Candidates", 
      value: "165",
      change: "+8%",
      subtitle: "Increased since last month",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Recruiters",
      value: "791", 
      change: "+20%",
      subtitle: "Increased since last month",
      icon: UserCheck,
      color: "bg-green-500"
    },
    {
      title: "Guarantee Period",
      value: "0",
      change: "",
      subtitle: "All Placements completed",
      icon: Shield,
      color: "bg-gray-500"
    }
  ];

  const pipelineStats = [
    { label: "Submitted to SRN", value: "22", percentage: "25.5%" },
    { label: "Sendout", value: "8", percentage: "100%" },
    { label: "Submitted to Client", value: "87", percentage: "9.2%" },
    { label: "Assignment Stage", value: "6", percentage: "6.9%" }
  ];

  const detailedStats = [
    { label: "Submitted to AM", value: "22", percentage: "25.5%" },
    { label: "Submitted to Client", value: "87", percentage: "100%" },
    { label: "Sendout", value: "8", percentage: "9.2%" },
    { label: "Assignment Stage", value: "6", percentage: "6.9%" }
  ];

  const finalStats = [
    { label: "Client Interview", value: "6", percentage: "6.9%" },
    { label: "Final Interview", value: "3", percentage: "3.4%" },
    { label: "Offer", value: "0", percentage: "0%" },
    { label: "Hired", value: "7", percentage: "8%" }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Starting Date" className="pr-10" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <Input placeholder="Ending Date" className="pr-10" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset
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
                  <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    {stat.change && (
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </div>
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.color} rounded-bl-full flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline and Status Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruiter Pipeline */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recruiter Pipeline</h3>
          <div className="space-y-4">
            {pipelineStats.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-500">{item.percentage}</span>
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Interview Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Interview Status</h3>
          <div className="space-y-4">
            {detailedStats.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-500">{item.percentage}</span>
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Metrics</h3>
          <div className="space-y-4">
            {finalStats.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-500">{item.percentage}</span>
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
