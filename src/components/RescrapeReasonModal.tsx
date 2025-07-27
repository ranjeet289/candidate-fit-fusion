import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, AlertTriangle, Search } from "lucide-react";

interface RescrapeReasonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  currentCandidateCount: number;
  onConfirmRescrape: (feedback: RescrapeReason) => void;
}

export interface RescrapeReason {
  reasons: string[];
  missingSkills: string[];
  locationIssues: boolean;
  experienceIssues: boolean;
  diversityNeeds: boolean;
  qualityTooLow: boolean;
  quantityTooLow: boolean;
  specificRequirements: string;
  additionalComments: string;
  timestamp: number;
  jobTitle: string;
  candidateCount: number;
}

const commonReasons = [
  {
    id: "quantity",
    label: "Not enough candidates found",
    description: "Need more candidates to choose from"
  },
  {
    id: "quality",
    label: "Candidate quality too low",
    description: "Fit scores don't match actual candidate quality"
  },
  {
    id: "skills",
    label: "Missing specific skills",
    description: "Candidates lack required technical skills"
  },
  {
    id: "experience",
    label: "Wrong experience level",
    description: "Too junior/senior or different domain experience"
  },
  {
    id: "location",
    label: "Location mismatch",
    description: "Candidates not in preferred locations"
  },
  {
    id: "diversity",
    label: "Need more diverse candidates",
    description: "Seeking broader representation"
  },
  {
    id: "industry",
    label: "Wrong industry background",
    description: "Candidates from irrelevant industries"
  },
  {
    id: "freshness",
    label: "Results seem outdated",
    description: "Profiles may not be current"
  }
];

export function RescrapeReasonModal({ 
  open, 
  onOpenChange, 
  jobTitle, 
  currentCandidateCount, 
  onConfirmRescrape 
}: RescrapeReasonModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState("");
  const [specificRequirements, setSpecificRequirements] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const handleReasonToggle = (reasonId: string, checked: boolean) => {
    setSelectedReasons(prev => 
      checked 
        ? [...prev, reasonId]
        : prev.filter(id => id !== reasonId)
    );
  };

  const handleSubmit = () => {
    const feedback: RescrapeReason = {
      reasons: selectedReasons,
      missingSkills: missingSkills.split(',').map(s => s.trim()).filter(Boolean),
      locationIssues: selectedReasons.includes('location'),
      experienceIssues: selectedReasons.includes('experience'),
      diversityNeeds: selectedReasons.includes('diversity'),
      qualityTooLow: selectedReasons.includes('quality'),
      quantityTooLow: selectedReasons.includes('quantity'),
      specificRequirements: specificRequirements.trim(),
      additionalComments: additionalComments.trim(),
      timestamp: Date.now(),
      jobTitle,
      candidateCount: currentCandidateCount
    };
    
    onConfirmRescrape(feedback);
    onOpenChange(false);
    
    // Reset form
    setSelectedReasons([]);
    setMissingSkills("");
    setSpecificRequirements("");
    setAdditionalComments("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setSelectedReasons([]);
    setMissingSkills("");
    setSpecificRequirements("");
    setAdditionalComments("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Why do you need to rescrape?
          </DialogTitle>
          <DialogDescription>
            Help us improve AI sourcing by telling us what's missing from the current results.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{jobTitle}</h4>
              <p className="text-sm text-muted-foreground">
                Current results: {currentCandidateCount} candidates found
              </p>
            </div>
            <Badge variant="outline">
              <Search className="w-3 h-3 mr-1" />
              Rescraping
            </Badge>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Common Issues */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              What issues do you see with the current results? *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonReasons.map((reason) => (
                <div key={reason.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox 
                    id={reason.id}
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={(checked) => handleReasonToggle(reason.id, checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={reason.id} className="font-medium cursor-pointer">
                      {reason.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          {selectedReasons.includes('skills') && (
            <div>
              <Label htmlFor="missing-skills" className="text-sm font-medium">
                What specific skills are missing?
              </Label>
              <Textarea
                id="missing-skills"
                value={missingSkills}
                onChange={(e) => setMissingSkills(e.target.value)}
                placeholder="e.g., React, AWS, Python, Machine Learning..."
                className="mt-2"
                rows={2}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate multiple skills with commas
              </p>
            </div>
          )}

          {/* Specific Requirements */}
          <div>
            <Label htmlFor="requirements" className="text-sm font-medium">
              Any specific requirements not captured?
            </Label>
            <Textarea
              id="requirements"
              value={specificRequirements}
              onChange={(e) => setSpecificRequirements(e.target.value)}
              placeholder="e.g., Must have startup experience, specific certifications, language requirements..."
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Additional Comments */}
          <div>
            <Label htmlFor="comments" className="text-sm font-medium">
              Additional feedback for our AI (Optional)
            </Label>
            <Textarea
              id="comments"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Any other feedback to help improve our sourcing algorithm..."
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Warning */}
          {selectedReasons.length === 0 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Please select at least one reason</p>
                <p className="text-sm text-yellow-700">
                  This helps us understand what to improve in future sourcing attempts.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel Rescrape
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedReasons.length === 0}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Rescrape with This Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}