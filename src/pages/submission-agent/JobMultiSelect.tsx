
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useEntities } from "@/context/EntityContext";

interface Props {
  selectedJobs: string[];
  toggleJob: (id: string) => void;
}

const JobMultiSelect: React.FC<Props> = ({ selectedJobs, toggleJob }) => {
  const { jobs } = useEntities();

  return (
    <div>
      <label className="block font-semibold mb-2">Select Job(s)</label>
      <div className="flex flex-col gap-2">
        {jobs.map(job => (
          <label
            key={job.id}
            className={`flex items-center gap-2 cursor-pointer rounded border px-3 py-2 transition ${
              selectedJobs.includes(job.id)
                ? "bg-primary/10 border-primary"
                : "hover:bg-muted"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedJobs.includes(job.id)}
              onChange={() => toggleJob(job.id)}
              className="accent-primary"
            />
            <div className="flex items-center gap-2 flex-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.title} at {job.company}</span>
              <Badge
                variant={job.urgency === 'High' ? 'destructive' : 'outline'}
                className="text-xs ml-2"
              >
                {job.urgency}
              </Badge>
              <Badge variant="outline">{job.fit}</Badge>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default JobMultiSelect;
