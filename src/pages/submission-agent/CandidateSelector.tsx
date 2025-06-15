
import { useEntities } from "@/context/EntityContext";
import { Input } from "@/components/ui/input";

interface Props {
  selectedCandidate: string;
  setSelectedCandidate: (id: string) => void;
  showManualForm: boolean;
  manualCandidate: {
    name: string;
    title: string;
    fit: string;
    skills: string;
  };
  setManualCandidate: (val: Props["manualCandidate"]) => void;
}

const CandidateSelector: React.FC<Props> = ({
  selectedCandidate,
  setSelectedCandidate,
  showManualForm,
  manualCandidate,
  setManualCandidate,
}) => {
  const { candidates } = useEntities();

  return (
    <div>
      <label className="block font-semibold mb-2">Select Candidate</label>
      <select
        className="w-full rounded border p-2"
        value={selectedCandidate}
        onChange={e => setSelectedCandidate(e.target.value)}
      >
        <option value="">-- Select --</option>
        {candidates.map(c => (
          <option key={c.id} value={c.id}>{c.name} ({c.title})</option>
        ))}
        <option value="manual">Add Manual Candidate</option>
      </select>
      {showManualForm && (
        <div className="mt-4 space-y-2">
          <Input
            placeholder="Name"
            value={manualCandidate.name}
            onChange={e => setManualCandidate({ ...manualCandidate, name: e.target.value })}
          />
          <Input
            placeholder="Title"
            value={manualCandidate.title}
            onChange={e => setManualCandidate({ ...manualCandidate, title: e.target.value })}
          />
          <Input
            placeholder="Fit (0-10)"
            type="number"
            min="0"
            max="10"
            value={manualCandidate.fit}
            onChange={e => setManualCandidate({ ...manualCandidate, fit: e.target.value })}
          />
          <Input
            placeholder="Skills (comma separated)"
            value={manualCandidate.skills}
            onChange={e => setManualCandidate({ ...manualCandidate, skills: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};

export default CandidateSelector;
