
import React, { createContext, useContext, useState, ReactNode } from "react";

// Subcategories for fit score breakdown
export interface FitScoreBreakdown {
  education: number;
  experience: number;
  skills: number;
  culture: number;
  location: number;
}

// Types for candidates and jobs, matching your previous structure
export interface Candidate {
  id: string;
  name: string;
  title: string;
  fit: number;
  source: string;
  skills: string[];
  fitBreakdown?: FitScoreBreakdown;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  fit: number;
  urgency: "High" | "Medium" | "Low" | string;
  location: string;
  fitBreakdown?: FitScoreBreakdown;
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
  { 
    id: "C001", 
    name: "Sarah Chen", 
    title: "Senior AI Engineer", 
    fit: 9.2, 
    source: "Sourcing Agent", 
    skills: ["Python", "TensorFlow", "AWS"],
    fitBreakdown: { education: 9.5, experience: 9.0, skills: 9.8, culture: 8.5, location: 9.2 }
  },
  { 
    id: "C002", 
    name: "Marcus Johnson", 
    title: "ML Research Scientist", 
    fit: 8.8, 
    source: "Sourcing Agent", 
    skills: ["PyTorch", "NLP", "Computer Vision"],
    fitBreakdown: { education: 9.8, experience: 8.5, skills: 9.2, culture: 8.0, location: 8.5 }
  },
  { 
    id: "C003", 
    name: "Priya Patel", 
    title: "Data Scientist", 
    fit: 8.5, 
    source: "Sourcing Agent", 
    skills: ["Machine Learning", "SQL", "R"],
    fitBreakdown: { education: 8.0, experience: 8.8, skills: 8.9, culture: 9.0, location: 7.8 }
  }
];

const defaultJobs: Job[] = [
  { 
    id: "J001", 
    title: "AI Engineer", 
    company: "Inferred Tech Solutions", 
    fit: 9.1, 
    urgency: "High", 
    location: "San Francisco, CA",
    fitBreakdown: { education: 9.0, experience: 9.5, skills: 9.8, culture: 8.5, location: 8.7 }
  },
  { 
    id: "J002", 
    title: "ML Ops Lead", 
    company: "Fintech Analytics", 
    fit: 8.7, 
    urgency: "Medium", 
    location: "Remote",
    fitBreakdown: { education: 8.2, experience: 9.0, skills: 9.2, culture: 8.8, location: 8.3 }
  },
  { 
    id: "J003", 
    title: "NLP Scientist", 
    company: "HealthcareAI", 
    fit: 9.3, 
    urgency: "High", 
    location: "Boston, MA",
    fitBreakdown: { education: 9.8, experience: 9.0, skills: 9.5, culture: 9.2, location: 9.0 }
  }
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
