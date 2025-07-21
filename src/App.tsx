
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Bell, Search, Settings } from 'lucide-react';
import Index from './pages/Index';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import SourcingAgent from './pages/SourcingAgent';
import OutreachAgent from './pages/OutreachAgent';
import SubmissionAgent from './pages/SubmissionAgent';
import AIRecruiter from './pages/AIRecruiter';
import AIAgentsOverview from './pages/AIAgentsOverview';
import NotFound from './pages/NotFound';
import { EntityProvider } from './context/EntityContext';

function App() {
  return (
    <EntityProvider>
      <Router>
        <SidebarProvider>
        <div className="flex min-h-screen bg-white w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            {/* Top header with notification icons */}
            <div className="flex justify-end items-center p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center ml-2">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
            </div>
            
            {/* Page content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/sourcing-agent" element={<SourcingAgent />} />
                <Route path="/outreach-agent" element={<OutreachAgent />} />
                <Route path="/submission-agent" element={<SubmissionAgent />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Router>
    </EntityProvider>
  );
}

export default App;
