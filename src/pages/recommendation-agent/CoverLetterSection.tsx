
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  coverLetter: string;
  setCoverLetter: (letter: string) => void;
  isGeneratingCover: boolean;
  handleGenerateCoverLetter: () => void;
  disabled: boolean;
}

// Cover letter textarea and AI generate button
const CoverLetterSection: React.FC<Props> = ({
  coverLetter,
  setCoverLetter,
  isGeneratingCover,
  handleGenerateCoverLetter,
  disabled,
}) => (
  <div>
    <label className="block font-semibold mb-2">AI-Generated Cover Letter</label>
    <Textarea
      value={coverLetter}
      onChange={(e) => setCoverLetter(e.target.value)}
      placeholder="Click 'Generate AI Cover Letter' to create a personalized cover letter based on the candidate and job match..."
      className="min-h-48"
    />
    <Button
      type="button"
      variant="outline"
      className="mt-2"
      disabled={disabled}
      onClick={handleGenerateCoverLetter}
    >
      {isGeneratingCover ? "Generating..." : "Generate AI Cover Letter"}
    </Button>
  </div>
);

export default CoverLetterSection;
