import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useEntities } from "@/context/EntityContext";
import { Search, MapPin, Linkedin, FileText, Filter, CheckSquare, Mail, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Simple tokenization and search functions from ATSSearch
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function cosineSim(a: Record<string, number>, b: Record<string, number>): number {
  let dot = 0,
    na = 0,
    nb = 0;
  const keys = unique([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const va = a[k] || 0;
    const vb = b[k] || 0;
    dot += va * vb;
    na += va * va;
    nb += vb * vb;
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function vectorize(tokens: string[]): Record<string, number> {
  const v: Record<string, number> = {};
  for (const t of tokens) v[t] = (v[t] || 0) + 1;
  return v;
}

function highlightMatches(text: string, matchedTerms: string[]) {
  if (!text || !matchedTerms.length) return text;
  
  const regex = new RegExp(`(${matchedTerms.join("|")})`, "gi");
  return text.split(regex).map((part, index) => {
    const isMatch = matchedTerms.some(term => 
      part.toLowerCase() === term.toLowerCase()
    );
    return isMatch ? { text: part, highlighted: true } : { text: part, highlighted: false };
  });
}

interface Filters {
  locations: string[];
  skillsInclude: string[];
  skillsExclude: string[];
  currentCompanies: string[];
  pastCompanies: string[];
  schools: string[];
}

const emptyFilters: Filters = {
  locations: [],
  skillsInclude: [],
  skillsExclude: [],
  currentCompanies: [],
  pastCompanies: [],
  schools: [],
};

export default function ATSSearchTab() {
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const { candidates, jobs } = useEntities();

  // Draft inputs (change freely)
  const [roleInput, setRoleInput] = useState("");
  // Applied inputs (used for searching)
  const [appliedRole, setAppliedRole] = useState("");
  const [mode, setMode] = useState<"keyword" | "semantic" | "both">("both");

  // Filters: draft vs applied so changes only take effect on Apply/Search
  const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(emptyFilters);

  // UI state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any | null>(null);

  // Submit single
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitCandidate, setSubmitCandidate] = useState<any | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  // Bulk selection + submit
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkJobId, setBulkJobId] = useState<string>("");

  const onSearchClick = () => {
    setAppliedRole(roleInput);
    setAppliedFilters(draftFilters);
  };

  const onClearResults = () => {
    setRoleInput("");
    setAppliedRole("");
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSelectedIds(new Set());
    toast.success("Search results cleared");
  };

  const applyFiltersOnly = () => {
    setAppliedFilters(draftFilters);
    setFiltersOpen(false);
  };
  const clearFilters = () => {
    setDraftFilters(emptyFilters);
  };

  const hasDraftFilters = Object.values(draftFilters).some((v) => v.length > 0);
  const canSearch = Boolean(roleInput.trim() || hasDraftFilters);
  const hasAppliedFilters = Object.values(appliedFilters).some((v) => v.length > 0);

  const suggestions = useMemo(() => {
    const locs = unique(
      candidates
        .map((c: any) => c.location)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const skills = unique(
      candidates.flatMap((c: any) => (Array.isArray(c.skills) ? c.skills : [])).map((s) => String(s))
    ) as string[];

    const currCompanies = unique(
      candidates
        .map((c: any) => c.currentCompany || c.company)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const pastCompanies = unique(
      candidates.flatMap((c: any) => (Array.isArray(c.pastCompanies) ? c.pastCompanies : [])).map((s) => String(s))
    ) as string[];

    const schools = unique(
      candidates.flatMap((c: any) =>
        Array.isArray(c.schools)
          ? c.schools
          : Array.isArray(c.education)
          ? c.education
          : c.school
          ? [c.school]
          : []
      ).map((s: any) => String(s))
    ) as string[];

    return { locs, skills, currCompanies, pastCompanies, schools };
  }, [candidates]);

  const queryText = `${appliedRole}`.trim();
  const results = useMemo(() => {
    const filtersActive = hasAppliedFilters;
    if (!queryText && !filtersActive) return [] as any[];

    const qTokens = tokenize(queryText);
    const qVec = vectorize(qTokens);

    return candidates
      .map((c: any) => {
        const textParts = [c.name, c.title, c.location, Array.isArray(c.skills) ? c.skills.join(" ") : c.skills || ""].filter(Boolean);
        const blob = textParts.join(" ").toLowerCase();
        const cTokens = tokenize(blob);
        const cVec = vectorize(cTokens);

        const matched = unique(qTokens.filter((t) => cTokens.includes(t)));
        let keywordScore = matched.length;

        // Location bonus if any of the applied locations match
        if (
          appliedFilters.locations.length > 0 && c.location && typeof c.location === "string" &&
          appliedFilters.locations.some((loc) => String(c.location).toLowerCase().includes(String(loc).toLowerCase()))
        ) {
          keywordScore += 1.5;
        }

        const semanticScore = cosineSim(qVec, cVec);
        let finalScore = 0;
        if (mode === "keyword") finalScore = keywordScore;
        else if (mode === "semantic") finalScore = semanticScore * 10;
        else finalScore = keywordScore * 0.5 + semanticScore * 10 * 0.5;

        // Create highlighted text segments for candidate display
        const highlightedName = highlightMatches(c.name, matched);
        const highlightedTitle = highlightMatches(c.title, matched);
        const highlightedSkills = Array.isArray(c.skills) ? 
          c.skills.map(skill => highlightMatches(skill, matched)) : [];

        return {
          candidate: c,
          score: Number(finalScore.toFixed(3)),
          keywordScore: Number(keywordScore.toFixed(3)),
          semanticScore: Number(semanticScore.toFixed(3)),
          matched,
          highlightedName,
          highlightedTitle,
          highlightedSkills,
        };
      })
      .filter((r) => {
        const c = r.candidate;
        // Skills include: require all
        const cSkills = Array.isArray(c.skills) ? c.skills.map((s: string) => String(s).toLowerCase()) : [];
        if (appliedFilters.skillsInclude.length > 0) {
          for (const s of appliedFilters.skillsInclude) if (!cSkills.includes(String(s).toLowerCase())) return false;
        }
        if (appliedFilters.skillsExclude.length > 0) {
          for (const s of appliedFilters.skillsExclude) if (cSkills.includes(String(s).toLowerCase())) return false;
        }
        // Location: any of selected
        if (appliedFilters.locations.length > 0) {
          if (!c.location) return false;
          const locOk = appliedFilters.locations.some((loc) => String(c.location).toLowerCase().includes(String(loc).toLowerCase()));
          if (!locOk) return false;
        }
        // Current company
        if (appliedFilters.currentCompanies.length > 0) {
          const curr = c.currentCompany || c.company;
          if (!curr) return false;
          const ok = appliedFilters.currentCompanies.some((co) => String(curr).toLowerCase().includes(String(co).toLowerCase()));
          if (!ok) return false;
        }
        // Past companies
        if (appliedFilters.pastCompanies.length > 0) {
          const past: string[] = Array.isArray(c.pastCompanies) ? c.pastCompanies : [];
          const ok = past.length > 0 && appliedFilters.pastCompanies.some((co) => past.map((p) => String(p).toLowerCase()).includes(String(co).toLowerCase()));
          if (!ok) return false;
        }
        // Schools
        if (appliedFilters.schools.length > 0) {
          const schools: string[] = Array.isArray(c.schools)
            ? c.schools
            : Array.isArray(c.education)
            ? c.education
            : c.school
            ? [c.school]
            : [];
          const ok = schools.length > 0 && appliedFilters.schools.some((s) => schools.map((p) => String(p).toLowerCase()).includes(String(s).toLowerCase()));
          if (!ok) return false;
        }
        if (r.score <= 0 && !filtersActive) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score);
  }, [candidates, appliedRole, mode, queryText, appliedFilters, hasAppliedFilters]);

  const onOpen = (c: any) => {
    setActive(c);
    setOpen(true);
  };

  const openSubmit = (c: any) => {
    setSubmitCandidate(c);
    setSelectedJobId("");
    setSubmitOpen(true);
  };

  const handleSubmitNow = () => {
    if (!submitCandidate) return;
    if (!selectedJobId) {
      toast.error("Please select a job JD to submit.");
      return;
    }
    const job = jobs.find((j: any) => String(j.id) === String(selectedJobId));
    toast.success(`Submitted ${submitCandidate.name} to ${job?.title || selectedJobId}`);
    setSubmitOpen(false);
    setSubmitCandidate(null);
  };

  // Bulk submit
  const toggleAll = (checked: boolean) => {
    if (!checked) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(results.map((r) => String(r.candidate.id || r.candidate.name))));
    }
  };
  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const openBulkSubmit = () => {
    if (selectedIds.size === 0) return;
    setBulkJobId("");
    setBulkOpen(true);
  };
  const handleBulkSubmit = () => {
    if (!bulkJobId) {
      toast.error("Please select a job JD to submit.");
      return;
    }
    const job = jobs.find((j: any) => String(j.id) === String(bulkJobId));
    toast.success(`Submitted ${selectedIds.size} candidate(s) to ${job?.title || bulkJobId}`);
    setBulkOpen(false);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">ATS Search</h2>
        <p className="text-sm text-gray-600 mt-1">
          Search candidates from external ATS database with advanced filters
        </p>
      </div>

      {/* Search section */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSearchClick();
                  }
                }}
                placeholder="Search by role, title, keywords - Press Enter to search"
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setFiltersOpen(true)}>
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {(queryText || hasAppliedFilters) && (
              <Button variant="outline" onClick={onClearResults}>
                <X className="w-4 h-4 mr-2" /> Clear Results
              </Button>
            )}
            <Button variant="secondary" disabled={selectedIds.size === 0} onClick={openBulkSubmit}>
              <CheckSquare className="w-4 h-4 mr-2" /> Submit Selected
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {queryText || hasAppliedFilters ? `${results.length} candidate(s) found` : "Enter search or apply filters"}
        </div>
      </section>

      {/* Results */}
      <section className="space-y-3">
        {results.length > 0 && (
          <div className="flex items-center gap-3">
            <Checkbox
              id="select-all"
              checked={selectedIds.size > 0 && selectedIds.size === results.length}
              onCheckedChange={(v: any) => toggleAll(Boolean(v))}
            />
            <label htmlFor="select-all" className="text-sm text-muted-foreground">Select all</label>
            {selectedIds.size > 0 && (
              <span className="text-sm text-muted-foreground">{selectedIds.size} selected</span>
            )}
          </div>
        )}
        <div className="grid gap-3">
          {results.map((r) => {
            const c = r.candidate;
            const linkedin = c.linkedinUrl || c.linkedin;
            const resume = c.resumeUrl;
            const id = String(c.id || c.name);
            const isChecked = selectedIds.has(id);
            return (
              <Card key={id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(v: any) => toggleOne(id, Boolean(v))}
                      className="mt-1"
                    />
                     <div className="space-y-1">
                       <div className="flex items-center gap-2">
                         <button onClick={() => onOpen(c)} className="text-left font-semibold text-foreground hover:underline">
                           {typeof r.highlightedName === "string" ? r.highlightedName : 
                             r.highlightedName?.map((segment: any, i: number) => (
                               <span key={i} className={segment.highlighted ? "bg-yellow-200 px-1 rounded" : ""}>
                                 {segment.text}
                               </span>
                             )) || c.name
                           }
                         </button>
                         <div className="flex gap-1">
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild disabled={!linkedin}>
                             <a href={linkedin ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`) : "#"} target="_blank" rel="noopener noreferrer">
                               <Linkedin className="w-3 h-3 text-blue-600" />
                             </a>
                           </Button>
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild disabled={!resume}>
                             <a href={resume || "#"} target="_blank" rel="noopener noreferrer">
                               <FileText className="w-3 h-3 text-gray-600" />
                             </a>
                           </Button>
                         </div>
                       </div>
                       <div className="text-sm text-muted-foreground flex items-center gap-2">
                         <span>
                           {typeof r.highlightedTitle === "string" ? r.highlightedTitle :
                             r.highlightedTitle?.map((segment: any, i: number) => (
                               <span key={i} className={segment.highlighted ? "bg-yellow-200 px-1 rounded" : ""}>
                                 {segment.text}
                               </span>
                             )) || c.title
                           }
                         </span>
                         {c.location && (
                           <span className="inline-flex items-center gap-1">
                             <MapPin className="w-3.5 h-3.5" /> {c.location}
                           </span>
                         )}
                       </div>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                         <Mail className="w-3 h-3" />
                         <span>{c.email || `${c.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="h-4 w-4 p-0"
                           onClick={() => copyEmail(c.email || `${c.name.toLowerCase().replace(' ', '.')}@email.com`)}
                         >
                           <Copy className="w-3 h-3" />
                         </Button>
                       </div>
                       {Array.isArray(c.skills) && c.skills.length > 0 && (
                         <div className="flex flex-wrap gap-1 mt-2">
                           {c.skills.slice(0, 3).map((skill: string, idx: number) => (
                             <Badge key={idx} variant="secondary" className="text-xs">
                               {skill}
                             </Badge>
                           ))}
                           {c.skills.length > 3 && (
                             <Badge variant="outline" className="text-xs">+{c.skills.length - 3} more</Badge>
                           )}
                         </div>
                       )}
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">Score: {r.score}</div>
                      <div className="text-xs text-muted-foreground">
                        K: {r.keywordScore} | S: {r.semanticScore.toFixed(2)}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => openSubmit(c)}>
                      Submit
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Filter dialog and other modals would go here - simplified for this example */}
      {/* Filter modal */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Locations filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Locations</label>
              <MultiSelect
                options={suggestions.locs.map((loc) => ({ label: loc, value: loc }))}
                selected={draftFilters.locations}
                onChange={(values) => setDraftFilters((f) => ({ ...f, locations: values }))}
                placeholder="Select locations"
              />
            </div>
            {/* Skills include */}
            <div>
              <label className="block text-sm font-medium mb-1">Skills Include</label>
              <MultiSelect
                options={suggestions.skills.map((skill) => ({ label: skill, value: skill }))}
                selected={draftFilters.skillsInclude}
                onChange={(values) => setDraftFilters((f) => ({ ...f, skillsInclude: values }))}
                placeholder="Select skills to include"
              />
            </div>
            {/* Skills exclude */}
            <div>
              <label className="block text-sm font-medium mb-1">Skills Exclude</label>
              <MultiSelect
                options={suggestions.skills.map((skill) => ({ label: skill, value: skill }))}
                selected={draftFilters.skillsExclude}
                onChange={(values) => setDraftFilters((f) => ({ ...f, skillsExclude: values }))}
                placeholder="Select skills to exclude"
              />
            </div>
            {/* Current companies */}
            <div>
              <label className="block text-sm font-medium mb-1">Current Companies</label>
              <MultiSelect
                options={suggestions.currCompanies.map((co) => ({ label: co, value: co }))}
                selected={draftFilters.currentCompanies}
                onChange={(values) => setDraftFilters((f) => ({ ...f, currentCompanies: values }))}
                placeholder="Select current companies"
              />
            </div>
            {/* Past companies */}
            <div>
              <label className="block text-sm font-medium mb-1">Past Companies</label>
              <MultiSelect
                options={suggestions.pastCompanies.map((co) => ({ label: co, value: co }))}
                selected={draftFilters.pastCompanies}
                onChange={(values) => setDraftFilters((f) => ({ ...f, pastCompanies: values }))}
                placeholder="Select past companies"
              />
            </div>
            {/* Schools */}
            <div>
              <label className="block text-sm font-medium mb-1">Schools</label>
              <MultiSelect
                options={suggestions.schools.map((s) => ({ label: s, value: s }))}
                selected={draftFilters.schools}
                onChange={(values) => setDraftFilters((f) => ({ ...f, schools: values }))}
                placeholder="Select schools"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={clearFilters}>Clear</Button>
              <Button onClick={applyFiltersOnly}>Apply</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit single candidate dialog */}
      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Candidate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="font-semibold">{submitCandidate?.name}</div>
              <div className="text-sm text-muted-foreground">{submitCandidate?.title}</div>
            </div>
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job to submit to" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job: any) => (
                  <SelectItem key={job.id} value={String(job.id)}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setSubmitOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitNow}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk submit dialog */}
      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Selected Candidates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>{selectedIds.size} candidate(s) selected</div>
            <Select value={bulkJobId} onValueChange={setBulkJobId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job to submit to" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job: any) => (
                  <SelectItem key={job.id} value={String(job.id)}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setBulkOpen(false)}>Cancel</Button>
              <Button onClick={handleBulkSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
