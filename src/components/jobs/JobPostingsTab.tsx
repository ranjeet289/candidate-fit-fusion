import { useState } from "react";
import { useEntities } from "@/context/EntityContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  Users, 
  Clock,
  Eye,
  Play,
  Pause,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export default function JobPostingsTab() {
  const { jobs } = useEntities();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredJobs = jobs.filter((job: any) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const handleStatusChange = (jobId: string, newStatus: string) => {
    toast.success(`Job status updated to ${newStatus}`);
    // In real implementation, this would update the job status
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'filled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Job Postings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage active job postings and track hiring progress
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Building2 className="w-4 h-4 mr-2" />
          Add Job Posting
        </Button>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        {filteredJobs.length} job posting(s) found
      </div>

      {/* Job Cards */}
      <div className="grid gap-4">
        {filteredJobs.map((job: any) => (
          <Card key={job.id} className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Job Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{job.company}</span>
                      {job.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge className={getStatusColor(job.status || 'active')}>
                    {job.status || 'Active'}
                  </Badge>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  {job.applicants && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Posted {job.postedDate || '2 days ago'}</span>
                  </div>
                </div>

                {/* Skills */}
                {job.skills && Array.isArray(job.skills) && (
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(job)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {job.status === 'active' ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(job.id, 'paused')}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(job.id, 'active')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleStatusChange(job.id, 'filled')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Filled
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Job Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedJob.title}</h3>
                <p className="text-muted-foreground">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge className={getStatusColor(selectedJob.status || 'active')}>
                    {selectedJob.status || 'Active'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Salary</label>
                  <p className="text-sm">{selectedJob.salary || 'Not specified'}</p>
                </div>
              </div>

              {selectedJob.description && (
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedJob.description}
                  </p>
                </div>
              )}

              {selectedJob.requirements && (
                <div>
                  <label className="text-sm font-medium">Requirements</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedJob.requirements}
                  </p>
                </div>
              )}

              {selectedJob.skills && Array.isArray(selectedJob.skills) && (
                <div>
                  <label className="text-sm font-medium">Required Skills</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedJob.skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button>
                  Find Candidates
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}