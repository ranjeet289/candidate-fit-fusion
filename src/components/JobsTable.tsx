
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, Table as TableIcon, List, Upload, Plus, MoreHorizontal, Edit, Eye, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const JobsTable = () => {
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [showFilters, setShowFilters] = useState(false);

  const jobs = [
    {
      id: "SRN2025-10668",
      company: "Hightouchhh",
      title: "ML Engineer, AI Decisioning",
      location: "San Francisco, CA",
      totalFee: "$36,900",
      commission: "$18,450",
      priority: "Medium",
      status: "Active",
      workType: "Remote",
      industry: "Finance & Accounting"
    },
    {
      id: "SRN2025-10668",
      company: "Quanta",
      title: "ML Engineer, AI Decisioning", 
      location: "San Francisco, CA",
      totalFee: "$36,900",
      commission: "$18,450",
      priority: "Medium",
      status: "Active",
      workType: "Remote",
      industry: "Finance & Accounting"
    },
    {
      id: "SRN2025-10668",
      company: "Datalogyai",
      title: "ML Engineer, AI Decisioning",
      location: "San Francisco, CA", 
      totalFee: "$36,900",
      commission: "$18,450",
      priority: "Medium",
      status: "Active",
      workType: "Remote",
      industry: "Finance & Accounting"
    },
    {
      id: "SRN2025-10668",
      company: "BioRenderase",
      title: "ML Engineer, AI Decisioning",
      location: "San Francisco, CA",
      totalFee: "$36,900", 
      commission: "$18,450",
      priority: "Medium",
      status: "Active",
      workType: "Remote",
      industry: "Finance & Accounting"
    },
    {
      id: "SRN2025-10668",
      company: "Memorial Medical Cr",
      title: "ML Engineer, AI Decisioning",
      location: "San Francisco, CA",
      totalFee: "$36,900",
      commission: "$18,450",
      priority: "Medium", 
      status: "Active",
      workType: "Remote",
      industry: "Finance & Accounting"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Resume
          </Button>
          <Button className="flex items-center gap-2 bg-primary">
            <Plus className="w-4 h-4" />
            Add Job
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search" className="pl-10" />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="w-4 h-4" />
              Table
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
              List
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Priority Level</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Commission</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Select Commission</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Role Type</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Choose an option</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Source</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Job Source</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Work Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Work Type</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Role Type</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Location</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Account Manager</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Select Account Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recruiter</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Job Recruiter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Job Status</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary">Apply Filter</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Jobs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Job ID</TableHead>
              <TableHead>Total Fee</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Job Status</TableHead>
              <TableHead>Work Type</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {job.company.charAt(0)}
                    </div>
                    {job.company}
                  </div>
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.totalFee}</TableCell>
                <TableCell>{job.commission}</TableCell>
                <TableCell>
                  <Badge variant={job.priority === 'High' ? 'destructive' : 'secondary'}>
                    {job.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{job.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{job.workType}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{job.industry}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span>...</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default JobsTable;
