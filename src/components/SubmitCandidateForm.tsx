
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PersonalInfoSection from "./forms/PersonalInfoSection";
import JobDetailsSection from "./forms/JobDetailsSection";
import FitScoreSection from "./forms/FitScoreSection";

interface SubmitCandidateFormProps {
  onClose: () => void;
}

export default function SubmitCandidateForm({ onClose }: SubmitCandidateFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    jobId: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    availability: '',
    skills: '',
    notes: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFitScore = () => {
    return Math.random() * 3 + 7; // Random score between 7.0 and 10.0
  };

  const fitScore = calculateFitScore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'email', 'location', 'experience', 'jobId', 'skills'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (fitScore < 7.5) {
      toast.error(`Candidate rejected - Fit score ${fitScore.toFixed(1)} is below threshold of 7.5`);
    } else {
      toast.success(`Candidate submitted successfully with fit score ${fitScore.toFixed(1)}`);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <PersonalInfoSection formData={formData} updateFormData={updateFormData} />
      <JobDetailsSection formData={formData} updateFormData={updateFormData} />
      <FitScoreSection fitScore={fitScore} />
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Submit Candidate
        </Button>
      </div>
    </form>
  );
}
