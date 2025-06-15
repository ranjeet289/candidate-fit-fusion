
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import React from "react";

interface ManualCandidate {
  name: string;
  title: string;
  fit: string;
  skills: string;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  fit: number | string;
  source: string;
  skills: string[] | string;
}

interface Props {
  candidatesFromPipeline: Candidate[];
  selectedCandidate: string;
  setSelectedCandidate: (id: string) => void;
  showManualForm: boolean;
  manualCandidate: ManualCandidate;
  setManualCandidate: React.Dispatch<React.SetStateAction<ManualCandidate>>;
}

// Candidate dropdown and manual form
const CandidateSelector: React.FC<Props> = ({
  candidatesFromPipeline,
  selectedCandidate,
  setSelectedCandidate,
  showManualForm,
  manualCandidate,
  setManualCandidate
}) => (
  <div>
    <label className="block font-semibold mb-2">Select Candidate from Pipeline</label>
    <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
      <SelectTrigger>
        <SelectValue placeholder="Choose a candidate..." />
      </SelectTrigger>
      <SelectContent>
        {candidatesFromPipeline.map((candidate) => (
          <SelectItem key={candidate.id} value={candidate.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{candidate.name} - {candidate.title}</span>
              </div>
              <Badge variant="outline" className="ml-2">
                Fit: {candidate.fit}
              </Badge>
            </div>
          </SelectItem>
        ))}
        <SelectItem value="manual">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Manually Add Candidate</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
    {showManualForm && (
      <div className="mt-4 bg-muted rounded p-4 flex flex-col gap-3 border">
        <div>
          <label className="text-sm font-semibold mb-1 block">Full Name</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            value={manualCandidate.name}
            onChange={e =>
              setManualCandidate((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Title</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            value={manualCandidate.title}
            onChange={e =>
              setManualCandidate((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Fit Score (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            step="0.1"
            className="w-full px-2 py-1 border rounded"
            value={manualCandidate.fit}
            onChange={e =>
              setManualCandidate((prev) => ({ ...prev, fit: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Skills (comma separated)</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            value={manualCandidate.skills}
            onChange={e =>
              setManualCandidate((prev) => ({ ...prev, skills: e.target.value }))
            }
            placeholder="E.g., Python, NLP, SQL"
            required
          />
        </div>
      </div>
    )}
  </div>
);

export default CandidateSelector;
