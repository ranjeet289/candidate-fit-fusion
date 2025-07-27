import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: {
    id: string;
    name: string;
    title: string;
    fit: number;
  };
  onSubmitFeedback: (feedback: CandidateFeedback) => void;
}

export interface CandidateFeedback {
  candidateId: string;
  overallRating: number;
  profileAccuracy: "excellent" | "good" | "fair" | "poor";
  skillsMatch: "excellent" | "good" | "fair" | "poor";
  experienceRelevance: "excellent" | "good" | "fair" | "poor";
  overallQuality: "excellent" | "good" | "fair" | "poor";
  wouldInterview: boolean;
  comments?: string;
  timestamp: number;
}

export function FeedbackModal({ open, onOpenChange, candidate, onSubmitFeedback }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [profileAccuracy, setProfileAccuracy] = useState<CandidateFeedback["profileAccuracy"]>("good");
  const [skillsMatch, setSkillsMatch] = useState<CandidateFeedback["skillsMatch"]>("good");
  const [experienceRelevance, setExperienceRelevance] = useState<CandidateFeedback["experienceRelevance"]>("good");
  const [overallQuality, setOverallQuality] = useState<CandidateFeedback["overallQuality"]>("good");
  const [wouldInterview, setWouldInterview] = useState<boolean>(true);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    const feedback: CandidateFeedback = {
      candidateId: candidate.id,
      overallRating: rating,
      profileAccuracy,
      skillsMatch,
      experienceRelevance,
      overallQuality,
      wouldInterview,
      comments: comments.trim() || undefined,
      timestamp: Date.now()
    };
    
    onSubmitFeedback(feedback);
    onOpenChange(false);
    
    // Reset form
    setRating(0);
    setProfileAccuracy("good");
    setSkillsMatch("good");
    setExperienceRelevance("good");
    setOverallQuality("good");
    setWouldInterview(true);
    setComments("");
  };

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Provide Feedback on Sourced Candidate
          </DialogTitle>
          <DialogDescription>
            Your feedback helps improve our AI sourcing algorithm for better candidate matches.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">{candidate.name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-semibold">{candidate.name}</h4>
              <p className="text-sm text-muted-foreground">{candidate.title}</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              AI Fit: {candidate.fit}
            </Badge>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Overall Rating */}
          <div>
            <Label className="text-sm font-medium">Overall Rating *</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {ratingLabels[rating - 1]}
                </span>
              )}
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Profile Accuracy</Label>
              <RadioGroup value={profileAccuracy} onValueChange={(value) => setProfileAccuracy(value as CandidateFeedback["profileAccuracy"])} className="mt-2">
                {["excellent", "good", "fair", "poor"].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`profile-${value}`} />
                    <Label htmlFor={`profile-${value}`} className="capitalize text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Skills Match</Label>
              <RadioGroup value={skillsMatch} onValueChange={(value) => setSkillsMatch(value as CandidateFeedback["skillsMatch"])} className="mt-2">
                {["excellent", "good", "fair", "poor"].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`skills-${value}`} />
                    <Label htmlFor={`skills-${value}`} className="capitalize text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Experience Relevance</Label>
              <RadioGroup value={experienceRelevance} onValueChange={(value) => setExperienceRelevance(value as CandidateFeedback["experienceRelevance"])} className="mt-2">
                {["excellent", "good", "fair", "poor"].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`experience-${value}`} />
                    <Label htmlFor={`experience-${value}`} className="capitalize text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">Overall Quality</Label>
              <RadioGroup value={overallQuality} onValueChange={(value) => setOverallQuality(value as CandidateFeedback["overallQuality"])} className="mt-2">
                {["excellent", "good", "fair", "poor"].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`quality-${value}`} />
                    <Label htmlFor={`quality-${value}`} className="capitalize text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Would Interview */}
          <div>
            <Label className="text-sm font-medium">Would you interview this candidate?</Label>
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => setWouldInterview(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                  wouldInterview
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-gray-50 border-gray-300 text-gray-600"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldInterview(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                  !wouldInterview
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-gray-50 border-gray-300 text-gray-600"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                No
              </button>
            </div>
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comments" className="text-sm font-medium">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share any additional thoughts about this candidate or suggestions for improvement..."
              className="mt-2"
              rows={3}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}