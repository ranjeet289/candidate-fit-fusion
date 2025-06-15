
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEntities } from "@/context/EntityContext";

export default function CandidatesPage() {
  const { candidates, addCandidate, updateCandidate, removeCandidate } = useEntities();

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

  return (
    <div className="px-8 py-6 max-w-3xl mx-auto">
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
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2">Fit</th>
              <th className="p-2">Source</th>
              <th className="p-2">Skills</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(c => (
              <tr key={c.id} className="border-b last:border-none">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.title}</td>
                <td className="p-2"><Badge>{c.fit}</Badge></td>
                <td className="p-2">{c.source === "Sourcing Agent" ? <Badge variant="secondary">AI</Badge> : <Badge variant="outline">Manual</Badge>}</td>
                <td className="p-2">
                  <span className="space-x-1">{c.skills.map(s => <Badge key={s} variant="outline">{s}</Badge>)}</span>
                </td>
                <td className="p-2">
                  <Button size="sm" variant="ghost" onClick={() => removeCandidate(c.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
