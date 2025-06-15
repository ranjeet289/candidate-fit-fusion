
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEntities } from "@/context/EntityContext";

export default function JobsPage() {
  const { jobs, addJob, removeJob } = useEntities();
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

  return (
    <div className="px-8 py-6 max-w-3xl mx-auto">
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
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Company</th>
              <th className="p-2">Fit</th>
              <th className="p-2">Urgency</th>
              <th className="p-2">Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id} className="border-b last:border-none">
                <td className="p-2">{j.title}</td>
                <td className="p-2">{j.company}</td>
                <td className="p-2"><Badge>{j.fit}</Badge></td>
                <td className="p-2"><Badge variant={j.urgency === "High" ? "destructive" : "outline"}>{j.urgency}</Badge></td>
                <td className="p-2">{j.location}</td>
                <td className="p-2">
                  <Button size="sm" variant="ghost" onClick={() => removeJob(j.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
