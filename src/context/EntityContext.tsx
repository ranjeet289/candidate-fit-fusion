
import React, { createContext, useContext, useState, ReactNode } from "react";

// Subcategories for fit score breakdown
export interface FitScoreBreakdown {
  education: number;
  careerTrajectory: number;
  companyRelevance: number;
  tenureStability: number;
  mostImportantSkills: number;
  bonusSignals: number;
  redFlags: number;
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
  location?: string;
  currentCompany?: string;
  pastCompanies?: string[];
  schools?: string[];
  stage?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  fitBreakdown?: FitScoreBreakdown;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  fit: number;
  location: string;
  workType: "Remote" | "Onsite" | "Hybrid";
  requirements: string[];
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
    location: "San Francisco, CA",
    currentCompany: "Google",
    pastCompanies: ["Meta", "Apple"],
    schools: ["Stanford University", "MIT"],
    stage: "Active",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/sarahchen",
    fitBreakdown: { education: 9.5, careerTrajectory: 9.0, companyRelevance: 9.8, tenureStability: 8.5, mostImportantSkills: 9.2, bonusSignals: 8.0, redFlags: 0.0, location: 9.2 }
  },
  { 
    id: "C002", 
    name: "Marcus Johnson", 
    title: "ML Research Scientist", 
    fit: 8.8, 
    source: "Sourcing Agent", 
    skills: ["PyTorch", "NLP", "Computer Vision"],
    location: "New York, NY",
    currentCompany: "OpenAI",
    pastCompanies: ["Microsoft", "Amazon"],
    schools: ["Carnegie Mellon University"],
    stage: "Submitted to AM",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/marcusjohnson",
    fitBreakdown: { education: 9.8, careerTrajectory: 8.5, companyRelevance: 9.2, tenureStability: 8.0, mostImportantSkills: 8.5, bonusSignals: 7.5, redFlags: 0.0, location: 8.5 }
  },
  { 
    id: "C003", 
    name: "Priya Patel", 
    title: "Data Scientist", 
    fit: 8.5, 
    source: "Sourcing Agent", 
    skills: ["Machine Learning", "SQL", "R"],
    location: "Remote",
    currentCompany: "Netflix",
    pastCompanies: ["Spotify", "Uber"],
    schools: ["UC Berkeley", "IIT Delhi"],
    stage: "Next Interview",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/priyapatel",
    fitBreakdown: { education: 8.0, careerTrajectory: 8.8, companyRelevance: 8.9, tenureStability: 9.0, mostImportantSkills: 7.8, bonusSignals: 6.0, redFlags: 0.0, location: 7.8 }
  },
  { 
    id: "C004", 
    name: "Alex Rodriguez", 
    title: "Frontend Engineer", 
    fit: 8.9, 
    source: "Sourcing Agent", 
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    location: "Austin, TX",
    currentCompany: "Stripe",
    pastCompanies: ["Airbnb", "Dropbox"],
    schools: ["University of Texas", "Coding Bootcamp"],
    stage: "Final Interview",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/alexrodriguez",
    fitBreakdown: { education: 7.5, careerTrajectory: 9.2, companyRelevance: 9.1, tenureStability: 8.8, mostImportantSkills: 9.0, bonusSignals: 7.8, redFlags: 0.0, location: 8.9 }
  },
  { 
    id: "C005", 
    name: "Emily Watson", 
    title: "DevOps Engineer", 
    fit: 8.3, 
    source: "Sourcing Agent", 
    skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    location: "Seattle, WA",
    currentCompany: "Amazon",
    pastCompanies: ["Microsoft", "Tesla"],
    schools: ["University of Washington"],
    stage: "Offer",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/emilywatson",
    fitBreakdown: { education: 8.2, careerTrajectory: 8.5, companyRelevance: 8.7, tenureStability: 9.1, mostImportantSkills: 8.1, bonusSignals: 6.5, redFlags: 0.0, location: 8.3 }
  },
  { 
    id: "C006", 
    name: "David Kim", 
    title: "Full Stack Developer", 
    fit: 7.9, 
    source: "Sourcing Agent", 
    skills: ["JavaScript", "Python", "React", "Django", "PostgreSQL"],
    location: "Los Angeles, CA",
    currentCompany: "Snapchat",
    pastCompanies: ["TikTok", "Pinterest"],
    schools: ["UCLA", "USC"],
    stage: "Active",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/davidkim",
    fitBreakdown: { education: 7.8, careerTrajectory: 8.1, companyRelevance: 8.0, tenureStability: 8.5, mostImportantSkills: 7.7, bonusSignals: 6.8, redFlags: 0.0, location: 7.9 }
  },
  { 
    id: "C007", 
    name: "Aisha Okafor", 
    title: "Product Manager", 
    fit: 8.7, 
    source: "Sourcing Agent", 
    skills: ["Product Strategy", "Agile", "Analytics", "A/B Testing"],
    location: "Chicago, IL",
    currentCompany: "Slack",
    pastCompanies: ["Zoom", "Salesforce"],
    schools: ["Northwestern University", "Harvard Business School"],
    stage: "Submitted to Client",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/aishaokafor",
    fitBreakdown: { education: 9.0, careerTrajectory: 8.8, companyRelevance: 8.9, tenureStability: 8.4, mostImportantSkills: 8.6, bonusSignals: 8.2, redFlags: 0.0, location: 8.7 }
  },
  { 
    id: "C008", 
    name: "James Thompson", 
    title: "Backend Engineer", 
    fit: 8.1, 
    source: "Sourcing Agent", 
    skills: ["Java", "Spring", "Microservices", "Redis", "MySQL"],
    location: "Boston, MA",
    currentCompany: "HubSpot",
    pastCompanies: ["Oracle", "IBM"],
    schools: ["MIT", "Northeastern University"],
    stage: "Rejected",
    resumeUrl: "#",
    linkedinUrl: "linkedin.com/in/jamesthompson",
    fitBreakdown: { education: 8.8, careerTrajectory: 7.9, companyRelevance: 8.2, tenureStability: 8.6, mostImportantSkills: 8.0, bonusSignals: 6.9, redFlags: 0.0, location: 8.1 }
  }
];

const defaultJobs: Job[] = [
  { 
    id: "J001", 
    title: "AI Engineer", 
    company: "Inferred Tech Solutions", 
    fit: 9.1, 
    location: "San Francisco, CA",
    workType: "Onsite",
    requirements: ["Python", "TensorFlow", "AWS", "5+ years experience"],
    fitBreakdown: { education: 9.0, careerTrajectory: 9.5, companyRelevance: 9.8, tenureStability: 8.5, mostImportantSkills: 8.7, bonusSignals: 8.0, redFlags: 0.0, location: 8.7 }
  },
  { 
    id: "J002", 
    title: "ML Ops Lead", 
    company: "Fintech Analytics", 
    fit: 8.7, 
    location: "Remote",
    workType: "Remote",
    requirements: ["Docker", "Kubernetes", "MLOps", "3+ years experience"],
    fitBreakdown: { education: 8.2, careerTrajectory: 9.0, companyRelevance: 9.2, tenureStability: 8.8, mostImportantSkills: 8.3, bonusSignals: 7.0, redFlags: 0.0, location: 8.3 }
  },
  { 
    id: "J003", 
    title: "NLP Scientist", 
    company: "HealthcareAI", 
    fit: 9.3, 
    location: "Boston, MA",
    workType: "Hybrid",
    requirements: ["NLP", "PyTorch", "Research experience", "PhD preferred"],
    fitBreakdown: { education: 9.8, careerTrajectory: 9.0, companyRelevance: 9.5, tenureStability: 9.2, mostImportantSkills: 9.0, bonusSignals: 8.5, redFlags: 0.0, location: 9.0 }
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
