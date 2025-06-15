
import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for candidates and jobs, matching your previous structure
export interface Candidate {
  id: string;
  name: string;
  title: string;
  fit: number;
  source: string;
  skills: string[];
}
export interface Job {
  id: string;
  title: string;
  company: string;
  fit: number;
  urgency: "High" | "Medium" | "Low" | string;
  location: string;
}

interface EntityContextType {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  addCandidate: (c: Candidate) => void;
  updateCandidate: (c: Candidate) => void;
  removeCandidate: (id: string) => void;
  addJob: (j: Job) => void;
  updateJob: (j: Job) => void;
  removeJob: (id: string) => void;
}

// Default AI pipeline data
const defaultCandidates: Candidate[] = [
  { id: "C001", name: "Sarah Chen", title: "Senior AI Engineer", fit: 9.2, source: "Sourcing Agent", skills: ["Python", "TensorFlow", "AWS"] },
  { id: "C002", name: "Marcus Johnson", title: "ML Research Scientist", fit: 8.8, source: "Sourcing Agent", skills: ["PyTorch", "NLP", "Computer Vision"] },
  { id: "C003", name: "Priya Patel", title: "Data Scientist", fit: 8.5, source: "Sourcing Agent", skills: ["Machine Learning", "SQL", "R"] }
];

const defaultJobs: Job[] = [
  { id: "J001", title: "AI Engineer", company: "Inferred Tech Solutions", fit: 9.1, urgency: "High", location: "San Francisco, CA" },
  { id: "J002", title: "ML Ops Lead", company: "Fintech Analytics", fit: 8.7, urgency: "Medium", location: "Remote" },
  { id: "J003", title: "NLP Scientist", company: "HealthcareAI", fit: 9.3, urgency: "High", location: "Boston, MA" }
];

// Context
const EntityContext = createContext<EntityContextType | undefined>(undefined);

export const useEntities = () => {
  const ctx = useContext(EntityContext);
  if (!ctx) throw new Error("useEntities must be used within EntityProvider");
  return ctx;
};

export function EntityProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([...defaultCandidates]);
  const [jobs, setJobs] = useState<Job[]>([...defaultJobs]);

  // CRUD helpers
  function addCandidate(candidate: Candidate) {
    setCandidates((prev) => [...prev, candidate]);
  }
  function updateCandidate(candidate: Candidate) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidate.id ? candidate : c))
    );
  }
  function removeCandidate(id: string) {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  }
  function addJob(job: Job) {
    setJobs((prev) => [...prev, job]);
  }
  function updateJob(job: Job) {
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? job : j))
    );
  }
  function removeJob(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  return (
    <EntityContext.Provider value={{
      candidates, setCandidates,
      jobs, setJobs,
      addCandidate, updateCandidate, removeCandidate,
      addJob, updateJob, removeJob
    }}>
      {children}
    </EntityContext.Provider>
  );
}
