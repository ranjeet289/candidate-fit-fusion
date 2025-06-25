
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEntities } from "@/context/EntityContext";
import FitScoreBreakdown from "@/components/FitScoreBreakdown";

export default function CandidatesPage() {
  const { candidates, addCandidate, updateCandidate, removeCandidate } = useEntities();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Manage add candidate modal (or inline for brevity)
  const [form, setForm] = useState({ name: "", title: "", fit: "", skills: "" });

  const onSubmit = (e:any) => {
    e.preventDefault();
    if (!(form.name && form.title && form.fit && form.skills)) return;
    addCandidate({
      id: String(Date.now()),
      name: form.name,
      title: form.title,
      fit: Number(form.fit),
      source: "Manual",
      skills: form.skills.split(",").map(s => s.trim()),
    });
    setForm({ name: "", title: "", fit: "", skills: "" });
  };

  const toggleExpanded = (candidateId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Candidates</h2>
      <Card className="mb-8 p-6">
        <form className="flex flex-wrap gap-4" onSubmit={onSubmit}>
          <Input required placeholder="Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          <Input required placeholder="Title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <Input required placeholder="Fit" type="number" min="0" max="10" step="0.1" value={form.fit} onChange={e => setForm(f => ({...f, fit: e.target.value}))} />
          <Input required placeholder="Skills (comma separated)" value={form.skills} onChange={e => setForm(f => ({...f, skills: e.target.value}))} />
          <Button type="submit">Add</Button>
        </form>
      </Card>
      <Card>
        <div className="space-y-4 p-4">
          {candidates.map(c => (
            <div key={c.id} className="border-b last:border-none pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(c.id)}
                    className="p-1"
                  >
                    {expandedRows.has(c.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </Button>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge>{c.fit}</Badge>
                  {c.source === "Sourcing Agent" ? 
                    <Badge variant="secondary">AI</Badge> : 
                    <Badge variant="outline">Manual</Badge>
                  }
                  <div className="space-x-1">
                    {c.skills.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeCandidate(c.id)}>Remove</Button>
                </div>
              </div>
              <Collapsible open={expandedRows.has(c.id)}>
                <CollapsibleContent className="mt-4 pl-8">
                  {c.fitBreakdown ? (
                    <div className="max-w-md">
                      <FitScoreBreakdown 
                        fitBreakdown={c.fitBreakdown} 
                        overallFit={c.fit} 
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Fit score breakdown not available for manually added candidates.
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
