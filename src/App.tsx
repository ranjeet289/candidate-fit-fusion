import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIRecruiter from "./pages/AIRecruiter";
import SourcingAgent from "./pages/SourcingAgent";
import SubmissionAgent from "./pages/SubmissionAgent";
import OutreachAgent from "./pages/OutreachAgent";
import CandidatesPage from "./pages/Candidates";
import JobsPage from "./pages/Jobs";
import { EntityProvider } from "@/context/EntityContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <EntityProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 min-w-0">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/ai-recruiter" element={<AIRecruiter />} />
                  <Route path="/sourcing-agent" element={<SourcingAgent />} />
                  <Route path="/outreach-agent" element={<OutreachAgent />} />
                  <Route path="/submission-agent" element={<SubmissionAgent />} />
                  <Route path="/candidates" element={<CandidatesPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </main>
          </div>
        </EntityProvider>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
