
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    additionalNotes: '',
    fitScore: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    status: 'idle' | 'accepted' | 'rejected';
    message: string;
  }>({ status: 'idle', message: '' });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fitScore = parseFloat(formData.fitScore);
    
    if (!fitScore || fitScore < 0 || fitScore > 10) {
      toast({
        title: "Invalid Fit Score",
        description: "Please enter a valid fit score between 0 and 10",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (fitScore < 7.5) {
        setValidationResult({
          status: 'rejected',
          message: `Candidate rejected: Fit score ${fitScore} is below the minimum threshold of 7.5`
        });
        toast({
          title: "Candidate Rejected",
          description: "Fit score is below minimum threshold",
          variant: "destructive",
        });
      } else {
        setValidationResult({
          status: 'accepted',
          message: `Candidate accepted: Fit score ${fitScore} meets the requirements`
        });
        toast({
          title: "Candidate Submitted Successfully",
          description: "Candidate has been added to the system",
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset validation when fit score changes
    if (field === 'fitScore') {
      setValidationResult({ status: 'idle', message: '' });
    }
  };

  return (
    <div className="mt-6">
      <div className="text-sm text-muted-foreground mb-6">
        Before beginning the submission process, please ensure that you have the Job ID ready (SRNXXXX-XXXXX format) and have confirmed with the candidate that they meet the basic requirements.
      </div>
      
      <div className="text-sm text-muted-foreground mb-6">
        If the submission for this role have reached screening questions, please answer them in the notes section on the field mark (Instructions).
      </div>

      {validationResult.status !== 'idle' && (
        <Alert className={`mb-6 ${validationResult.status === 'accepted' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {validationResult.status === 'accepted' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={validationResult.status === 'accepted' ? 'text-green-700' : 'text-red-700'}>
            {validationResult.message}
          </AlertDescription>
        </Alert>
      )}

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
            required
          />
        </div>

        {/* Candidate Type */}
        <div>
          <Label htmlFor="candidateType">Choose an Existing Candidate</Label>
          <Select onValueChange={(value) => handleInputChange('candidateType', value)} required>
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
              required
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
              required
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
              required
            />
          </div>
          <div>
            <Label htmlFor="noticePeriod">Notice Period</Label>
            <Input
              id="noticePeriod"
              placeholder="Notice Period"
              value={formData.noticePeriod}
              onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
              className="mt-1"
              required
            />
          </div>
        </div>

        {/* Work Status and Years Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="workStatus">Working Status</Label>
            <Select onValueChange={(value) => handleInputChange('workStatus', value)} required>
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
            <Label htmlFor="yrsStatus">Years of Experience</Label>
            <Select onValueChange={(value) => handleInputChange('yrsStatus', value)} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="2-5">2-5 years</SelectItem>
                <SelectItem value="5-8">5-8 years</SelectItem>
                <SelectItem value="8+">8+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compensation and LinkedIn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="compensation">Expected Compensation</Label>
            <Input
              id="compensation"
              placeholder="$XX,XXX"
              value={formData.compensation}
              onChange={(e) => handleInputChange('compensation', e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="mt-1"
              required
            />
          </div>
        </div>

        {/* Fit Score - Critical Field */}
        <div>
          <Label htmlFor="fitScore" className="text-base font-semibold">
            Fit Score (0-10) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fitScore"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Enter fit score (minimum 7.5 required)"
            value={formData.fitScore}
            onChange={(e) => handleInputChange('fitScore', e.target.value)}
            className="mt-1"
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            Candidates with fit score below 7.5 will be automatically rejected
          </p>
        </div>

        {/* Motivation */}
        <div>
          <Label htmlFor="motivation">Candidate Motivation</Label>
          <Textarea
            id="motivation"
            placeholder="Why is this candidate interested in the role?"
            value={formData.motivation}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
            className="mt-1"
            rows={3}
            required
          />
        </div>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="additionalNotes">Additional Notes & Screening Answers</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Include screening question answers and any additional relevant information"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>

        {/* Upload Section */}
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="p-6">
            <div className="text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <Button variant="link" className="text-primary">
                Upload CV/Resume
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                PDF, DOC, or DOCX files accepted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Processing..." : "Submit Candidate"}
          </Button>
        </div>
      </form>
    </div>
  );
}
