
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import FitScoreBreakdown from "@/components/FitScoreBreakdown";

export default function JobsPage() {
  const { jobs, addJob, removeJob } = useEntities();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ title: "", company: "", fit: "", urgency: "Medium", location: "" });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!(form.title && form.company && form.fit && form.urgency && form.location)) return;
    addJob({
      id: String(Date.now()),
      title: form.title,
      company: form.company,
      fit: Number(form.fit),
      urgency: form.urgency,
      location: form.location
    });
    setForm({ title: "", company: "", fit: "", urgency: "Medium", location: "" });
  };

  const toggleExpanded = (jobId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      <Card className="mb-8 p-6">
        <form className="flex flex-wrap gap-4" onSubmit={onSubmit}>
          <Input required placeholder="Title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <Input required placeholder="Company" value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
          <Input required placeholder="Fit" type="number" min="0" max="10" step="0.1" value={form.fit} onChange={e => setForm(f => ({...f, fit: e.target.value}))} />
          <select required className="rounded border p-2" value={form.urgency} onChange={e => setForm(f => ({...f, urgency: e.target.value}))}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <Input required placeholder="Location" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} />
          <Button type="submit">Add</Button>
        </form>
      </Card>
      <Card>
        <div className="space-y-4 p-4">
          {jobs.map(j => (
            <div key={j.id} className="border-b last:border-none pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(j.id)}
                    className="p-1"
                  >
                    {expandedRows.has(j.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </Button>
                  <div>
                    <p className="font-medium">{j.title}</p>
                    <p className="text-sm text-muted-foreground">{j.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge>{j.fit}</Badge>
                  <Badge variant={j.urgency === "High" ? "destructive" : "outline"}>{j.urgency}</Badge>
                  <span className="text-sm">{j.location}</span>
                  <Button size="sm" variant="ghost" onClick={() => removeJob(j.id)}>Remove</Button>
                </div>
              </div>
              <Collapsible open={expandedRows.has(j.id)}>
                <CollapsibleContent className="mt-4 pl-8">
                  {j.fitBreakdown ? (
                    <div className="max-w-md">
                      <FitScoreBreakdown 
                        fitBreakdown={j.fitBreakdown} 
                        overallFit={j.fit} 
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Fit score breakdown not available for manually added jobs.
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
