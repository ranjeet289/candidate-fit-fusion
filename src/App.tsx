
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import Index from './pages/Index';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import SourcingAgent from './pages/SourcingAgent';
import OutreachAgent from './pages/OutreachAgent';
import SubmissionAgent from './pages/SubmissionAgent';
import AIRecruiter from './pages/AIRecruiter';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-50 w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/sourcing-agent" element={<SourcingAgent />} />
              <Route path="/outreach-agent" element={<OutreachAgent />} />
              <Route path="/submission-agent" element={<SubmissionAgent />} />
              <Route path="/ai-recruiter" element={<AIRecruiter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
