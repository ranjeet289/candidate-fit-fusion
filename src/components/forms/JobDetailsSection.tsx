
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface JobDetailsSectionProps {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

export default function JobDetailsSection({ formData, updateFormData }: JobDetailsSectionProps) {
  const mockJobs = [
    { id: "SRN2025-10615", title: "Senior Software Engineer", company: "Altios" },
    { id: "SRN2025-10620", title: "Product Manager", company: "TechFlow" },
    { id: "SRN2025-10618", title: "UX Designer", company: "Design Studios" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Job Details</h3>
      
      <div>
        <Label htmlFor="jobId">Job Position *</Label>
        <Select value={formData.jobId} onValueChange={(value) => updateFormData('jobId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select job position" />
          </SelectTrigger>
          <SelectContent>
            {mockJobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title} - {job.company} ({job.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentSalary">Current Salary</Label>
          <Input
            id="currentSalary"
            value={formData.currentSalary}
            onChange={(e) => updateFormData('currentSalary', e.target.value)}
            placeholder="e.g., $80,000"
          />
        </div>
        
        <div>
          <Label htmlFor="expectedSalary">Expected Salary</Label>
          <Input
            id="expectedSalary"
            value={formData.expectedSalary}
            onChange={(e) => updateFormData('expectedSalary', e.target.value)}
            placeholder="e.g., $90,000"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Select value={formData.noticePeriod} onValueChange={(value) => updateFormData('noticePeriod', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select notice period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="2-weeks">2 weeks</SelectItem>
              <SelectItem value="1-month">1 month</SelectItem>
              <SelectItem value="2-months">2 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => updateFormData('availability', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="skills">Skills (comma-separated) *</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => updateFormData('skills', e.target.value)}
          placeholder="e.g., React, Node.js, Python"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => updateFormData('notes', e.target.value)}
          placeholder="Any additional information about the candidate..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
