
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEntities } from "@/context/EntityContext";
import { Search, MapPin, Linkedin, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Simple tokenization
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

export default function ATSSearchPage() {
  const { candidates, jobs } = useEntities();
  // Draft inputs (change freely)
  const [roleInput, setRoleInput] = useState("");
  const [jdInput, setJdInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  // Applied inputs (used for searching)
  const [appliedRole, setAppliedRole] = useState("");
  const [appliedJd, setAppliedJd] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");
  const [mode, setMode] = useState<"keyword" | "semantic" | "both">("both");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitCandidate, setSubmitCandidate] = useState<any | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  // Filters: draft vs applied so changes only take effect on Apply/Search
  const defaultFilters = { stage: "all", titleInclude: "", skillsInclude: "", skillsExclude: "" };
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const queryText = `${appliedRole} ${appliedJd} ${appliedLocation}`.trim();
  const hasQueryOrFilters =
    Boolean(queryText) ||
    Boolean(
      appliedFilters.titleInclude ||
        appliedFilters.skillsInclude ||
        appliedFilters.skillsExclude ||
        (appliedFilters.stage && appliedFilters.stage !== "all")
    );
  
  // Stage options (align with Candidates page)
  const stages = ['all', 'Active', 'Submitted to AM', 'Submitted to Client', 'Sendout', 'Next Interview', 'Final Interview', 'Offer', 'Rejected'];
  
  // Handlers to control when search actually runs
  const applyFiltersOnly = () => setAppliedFilters(draftFilters);
  const onSearchClick = () => {
    setAppliedRole(roleInput);
    setAppliedJd(jdInput);
    setAppliedLocation(locationInput);
    setAppliedFilters(draftFilters);
  };

  // Draft activity vs applied activity
  const draftQueryText = `${roleInput} ${jdInput} ${locationInput}`.trim();
  const hasDraftFilters = Boolean(
    draftFilters.titleInclude ||
    draftFilters.skillsInclude ||
    draftFilters.skillsExclude ||
    (draftFilters.stage && draftFilters.stage !== "all")
  );
  const canSearch = Boolean(draftQueryText || hasDraftFilters);

  const results = useMemo(() => {
    const filtersActive = Boolean(
      appliedFilters.titleInclude ||
        appliedFilters.skillsInclude ||
        appliedFilters.skillsExclude ||
        (appliedFilters.stage && appliedFilters.stage !== "all")
    );
    if (!queryText && !filtersActive) return [] as any[];
    const qTokens = tokenize(queryText);
    const qVec = vectorize(qTokens);

    const titleNeedle = (appliedFilters.titleInclude || "").toLowerCase().trim();
    const includeSkills = (appliedFilters.skillsInclude || "")
      .toLowerCase()
      .split(/[\,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const excludeSkills = (appliedFilters.skillsExclude || "")
      .toLowerCase()
      .split(/[\,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    return candidates
      .map((c: any) => {
        const textParts = [c.name, c.title, c.location, Array.isArray(c.skills) ? c.skills.join(" ") : (c.skills || "")].filter(Boolean);
        const blob = textParts.join(" ").toLowerCase();
        const cTokens = tokenize(blob);
        const cVec = vectorize(cTokens);

        // Keyword score: count of query tokens present + bonus for location match
        const matched = unique(qTokens.filter((t) => cTokens.includes(t)));
        let keywordScore = matched.length;
        if (appliedLocation && c.location && String(c.location).toLowerCase().includes(appliedLocation.toLowerCase())) keywordScore += 1.5;

        // Semantic score via cosine on bag-of-words
        const semanticScore = cosineSim(qVec, cVec);

        let finalScore = 0;
        if (mode === "keyword") finalScore = keywordScore;
        else if (mode === "semantic") finalScore = semanticScore * 10; // scale to be comparable
        else finalScore = keywordScore * 0.5 + semanticScore * 10 * 0.5;

        // Why shown snippet
        const why: string[] = [];
        if (matched.length) why.push(`Matched terms: ${matched.slice(0, 5).join(", ")}`);
        if (appliedLocation && c.location && String(c.location).toLowerCase().includes(appliedLocation.toLowerCase())) why.push(`Location match: ${c.location}`);
        if (titleNeedle && String(c.title || "").toLowerCase().includes(titleNeedle)) why.push(`Title match: ${String(c.title || "").slice(0, 40)}`);
        if (Array.isArray(c.skills)) {
          const cSkillsLower = c.skills.map((s: string) => String(s).toLowerCase());
          const incHit = includeSkills.filter((s) => cSkillsLower.includes(s));
          if (incHit.length) why.push(`Skills: ${incHit.slice(0, 5).join(", ")}`);
        }
        if (!why.length && semanticScore > 0) {
          // Take overlapping top tokens as justification
          const overlaps = unique(cTokens.filter((t) => qTokens.includes(t))).slice(0, 5);
          if (overlaps.length) why.push(`Relevant skills/keywords: ${overlaps.join(", ")}`);
        }

        return {
          candidate: c,
          score: Number(finalScore.toFixed(3)),
          keywordScore: Number(keywordScore.toFixed(3)),
          semanticScore: Number(semanticScore.toFixed(3)),
          why: why.join(" • "),
        };
      })
      .filter((r) => {
        const c = r.candidate;
        if (appliedFilters.stage && appliedFilters.stage !== "all") {
          if (!c.stage || c.stage !== appliedFilters.stage) return false;
        }
        if (titleNeedle && !String(c.title || "").toLowerCase().includes(titleNeedle)) return false;
        const cSkills = Array.isArray(c.skills) ? c.skills.map((s: string) => String(s).toLowerCase()) : [];
        if (includeSkills.length > 0) {
          for (const s of includeSkills) if (!cSkills.includes(s)) return false;
        }
        if (excludeSkills.length > 0) {
          for (const s of excludeSkills) if (cSkills.includes(s)) return false;
        }
        if (r.score <= 0 && !filtersActive) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score);
  }, [candidates, appliedJd, appliedRole, appliedLocation, mode, queryText, appliedFilters]);

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

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">ATS Candidate Search</h1>
        <p className="text-muted-foreground">Search the database using a JD brief, role, and location with keyword and AI semantic matching.</p>
      </header>

      <section className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-1 space-y-4">
            <div>
              <label className="block font-semibold mb-2">Role</label>
              <Input value={roleInput} onChange={(e) => setRoleInput(e.target.value)} placeholder="e.g., Senior Frontend Engineer" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Location</label>
              <Input value={locationInput} onChange={(e) => setLocationInput(e.target.value)} placeholder="e.g., Bengaluru, Remote" />
            </div>
            <div>
              <label className="block font-semibold mb-2">JD Brief</label>
              <Textarea value={jdInput} onChange={(e) => setJdInput(e.target.value)} placeholder="Paste a short JD or requirements…" className="min-h-[140px]" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="text-sm font-semibold">Filters</div>
              <div>
                <label className="block text-sm mb-1">Title contains</label>
                <Input
                  value={draftFilters.titleInclude}
                  onChange={(e) => setDraftFilters({ ...draftFilters, titleInclude: e.target.value })}
                  placeholder="e.g., frontend, recruiter"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Skills include</label>
                  <Input
                    value={draftFilters.skillsInclude}
                    onChange={(e) => setDraftFilters({ ...draftFilters, skillsInclude: e.target.value })}
                    placeholder="e.g., react, typescript"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Skills exclude</label>
                  <Input
                    value={draftFilters.skillsExclude}
                    onChange={(e) => setDraftFilters({ ...draftFilters, skillsExclude: e.target.value })}
                    placeholder="e.g., angular, php"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Stage</label>
                <Select value={draftFilters.stage} onValueChange={(val) => setDraftFilters({ ...draftFilters, stage: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All stages" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s === 'all' ? 'All' : s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={applyFiltersOnly}>Apply filters</Button>
                <span className="text-xs text-muted-foreground">Results update only when you click Search or Apply filters.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Match Mode:</span>
              <div className="flex rounded-md border border-border overflow-hidden">
                {(["keyword", "semantic", "both"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 text-sm ${mode === m ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}
                    aria-pressed={mode === m}
                  >
                    {m === "semantic" ? (
                      <span className="inline-flex items-center gap-1"><Sparkles className="w-4 h-4" /> Semantic</span>
                    ) : m === "keyword" ? (
                      <span className="inline-flex items-center gap-1"><Search className="w-4 h-4" /> Keyword</span>
                    ) : (
                      <span className="inline-flex items-center gap-1">Both</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>

        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {hasQueryOrFilters ? `${results.length} candidate(s) found` : "Enter search or apply filters"}
            </div>
            <Button variant="default" disabled={!canSearch} onClick={onSearchClick}>
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>

          <div className="grid gap-3">
            {results.map((r) => {
              const c = r.candidate;
              const linkedin = c.linkedinUrl || c.linkedin;
              const resume = c.resumeUrl;
              return (
                <Card key={c.id || c.name} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <button onClick={() => onOpen(c)} className="text-left font-semibold text-foreground hover:underline">
                        {c.name}
                      </button>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{c.title}</span>
                        {c.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {c.location}
                          </span>
                        )}
                      </div>
                      {Array.isArray(c.skills) && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {c.skills.slice(0, 6).map((s: string) => (
                            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <div className="text-xs text-muted-foreground">
                        Score: {r.score} {mode !== "keyword" && <span className="opacity-80">(sem {r.semanticScore.toFixed(2)})</span>}
                      </div>
                      <div className="text-sm text-foreground/90">
                        {r.why || "Relevant profile based on semantic similarity"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => openSubmit(c)}>
                          Submit now
                        </Button>
                        <Button variant="outline" size="sm" asChild disabled={!resume}>
                          <a href={resume || "#"} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-1" /> View Resume
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild disabled={!linkedin}>
                          <a href={linkedin ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`) : "#"} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-3">
              <div>
                <div className="text-lg font-semibold">{active.name}</div>
                <div className="text-sm text-muted-foreground">{active.title}</div>
                {active.location && (
                  <div className="text-sm text-muted-foreground inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {active.location}</div>
                )}
              </div>
              {Array.isArray(active.skills) && (
                <div className="flex flex-wrap gap-1">
                  {active.skills.map((s: string) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                {active.resumeUrl && (
                  <Button variant="outline" asChild size="sm"><a href={active.resumeUrl} target="_blank" rel="noopener noreferrer"><FileText className="w-4 h-4 mr-1" /> Resume</a></Button>
                )}
                {(active.linkedinUrl || active.linkedin) && (
                  <Button variant="outline" asChild size="sm"><a href={(active.linkedinUrl || active.linkedin).startsWith("http") ? (active.linkedinUrl || active.linkedin) : `https://${active.linkedinUrl || active.linkedin}`} target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4 mr-1" /> LinkedIn</a></Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit candidate to a Job</DialogTitle>
          </DialogHeader>
          {submitCandidate ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Candidate: <span className="font-medium text-foreground">{submitCandidate.name}</span>
              </div>
              <div>
                <label className="block font-semibold mb-2">Select Job (JD)</label>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((j: any) => (
                      <SelectItem key={j.id} value={String(j.id)}>
                        {j.title} — {j.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setSubmitOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitNow} disabled={!selectedJobId}>Submit now</Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

