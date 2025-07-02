
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface SubmitCandidateFormProps {
  onClose: () => void;
}

export default function SubmitCandidateForm({ onClose }: SubmitCandidateFormProps) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    candidateType: '',
    firstName: '',
    lastName: '',
    location: '',
    noticePeriod: '',
    workStatus: '',
    yrsStatus: '',
    compensation: '',
    linkedinUrl: '',
    motivation: '',
    additionalNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitting candidate:', formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-6">
      <div className="text-sm text-gray-600 mb-6">
        Before beginning the submission process, please ensure that you have the Job ID ready (SRNXXXX-XXXXX format) and have confirmed with the candidate that they meet the basic requirements.
      </div>
      
      <div className="text-sm text-gray-600 mb-6">
        If the submission for this role have reached screening questions, please answer them in the notes section on the field mark (Instructions).
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <Label htmlFor="jobTitle">Add the Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="Search the Job Title"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Candidate Type */}
        <div>
          <Label htmlFor="candidateType">Choose an Existing Candidate</Label>
          <Select onValueChange={(value) => handleInputChange('candidateType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Candidate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="existing">Existing Candidate</SelectItem>
              <SelectItem value="new">New Candidate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Candidate First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Candidate Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Location and Notice Period */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="noticeperiod">Notice Period</Label>
            <Input
              id="noticeperiod"
              placeholder="Notice Period"
              value={formData.noticeperiod}
              onChange={(e) => handleInputChange('noticeperiod', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Work Status and Years Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="workStatus">Working Status</Label>
            <Select onValueChange={(value) => handleInputChange('workStatus', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Work Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Currently Employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="yrsStatus">Yrs Status</Label>
            <Select onValueChange={(value) => handleInputChange('yrsStatus', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Yrs Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="2-5">2-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compensation and LinkedIn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="compensation">Compensation</Label>
            <Input
              id="compensation"
              placeholder="$"
              value={formData.compensation}
              onChange={(e) => handleInputChange('compensation', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              placeholder="LinkedIn URL"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Motivation */}
        <div>
          <Label htmlFor="motivation">Motivation</Label>
          <Textarea
            id="motivation"
            placeholder="Motivation"
            value={formData.motivation}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Write the Notes Here"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Upload Section */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6">
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <Button variant="link" className="text-blue-600">
                Upload CV/Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}
