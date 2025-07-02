
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, MapPin, Calendar, Users, DollarSign, Briefcase, Clock } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock jobs data for recruiting agency
const mockJobs = [
  {
    id: "SRN2025-10615",
    title: "Senior Software Engineer",
    company: "Altios",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    assignedRecruiter: "Prashant Gosavi",
    status: "Active",
    urgency: "High",
    postedDate: "15 May 2025",
    candidatesSubmitted: 8,
    candidatesInPipeline: 5,
    description: "We're looking for a senior software engineer to join our growing team...",
    requirements: ["5+ years experience", "React", "Node.js", "AWS"],
    benefits: ["Health Insurance", "401k", "Remote Work"]
  },
  {
    id: "SRN2025-10620",
    title: "Product Manager",
    company: "TechFlow",
    location: "New York, NY", 
    type: "Full-time",
    salary: "$100k - $130k",
    assignedRecruiter: "Jessica Park",
    status: "Active",
    urgency: "Medium",
    postedDate: "12 May 2025",
    candidatesSubmitted: 12,
    candidatesInPipeline: 8,
    description: "Join our product team to drive innovation and growth...",
    requirements: ["3+ years PM experience", "Agile", "Analytics"],
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours"]
  },
  {
    id: "SRN2025-10618",
    title: "UX Designer",
    company: "Design Studios",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$80k - $100k",
    assignedRecruiter: "Michael Kim",
    status: "On Hold",
    urgency: "Low",
    postedDate: "10 May 2025",
    candidatesSubmitted: 3,
    candidatesInPipeline: 2,
    description: "Create exceptional user experiences for our digital products...",
    requirements: ["Figma", "User Research", "Prototyping"],
    benefits: ["Hourly Rate", "Flexible Schedule"]
  },
  {
    id: "SRN2025-10612",
    title: "Data Scientist",
    company: "DataCorp",
    location: "Austin, TX",
    type: "Full-time", 
    salary: "$90k - $120k",
    assignedRecruiter: "Prashant Gosavi",
    status: "Filled",
    urgency: "High",
    postedDate: "08 May 2025",
    candidatesSubmitted: 15,
    candidatesInPipeline: 0,
    description: "Analyze complex datasets to drive business insights...",
    requirements: ["Python", "Machine Learning", "SQL"],
    benefits: ["Health Insurance", "401k", "Learning Budget"]
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.assignedRecruiter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Filled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';    
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statuses = ['all', 'Active', 'On Hold', 'Filled', 'Cancelled'];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
          <p className="text-muted-foreground">
            Manage job postings and track recruitment progress
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Job
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search jobs, companies, or recruiters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background border shadow-lg">
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status)}
                className="cursor-pointer"
              >
                {status === 'all' ? 'All Statuses' : status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Jobs</div>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{mockJobs.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Active Jobs</div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockJobs.filter(j => j.status === 'Active').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Candidates</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockJobs.reduce((sum, job) => sum + job.candidatesSubmitted, 0)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Filled Positions</div>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockJobs.filter(j => j.status === 'Filled').length}
          </div>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card>
        <TableComponent>
          <TableHeader>
            <TableRow>
              <TableHead>Job Details</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Assigned Recruiter</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{job.company}</TableCell>
                <TableCell>{job.assignedRecruiter}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Submitted: {job.candidatesSubmitted}</div>
                    <div className="text-muted-foreground">Pipeline: {job.candidatesInPipeline}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getUrgencyColor(job.urgency)}>
                    {job.urgency}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{job.postedDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border shadow-lg">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        View Candidates
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </Card>
    </div>
  );
}
