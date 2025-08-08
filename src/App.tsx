
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Bell, Search, Settings } from 'lucide-react';
import Index from './pages/Index';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Users from './pages/Users';
import SourcingAgent from './pages/SourcingAgent';
import OutreachAgent from './pages/OutreachAgent';
import RecommendationAgent from './pages/RecommendationAgent';
import ATSSearch from './pages/ATSSearch';
import AIRecruiter from './pages/AIRecruiter';
import AIAgentsOverview from './pages/AIAgentsOverview';
import NotFound from './pages/NotFound';
import { EntityProvider } from './context/EntityContext';
import { PageTitleProvider, usePageTitle } from './hooks/use-page-title';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <EntityProvider>
      <PageTitleProvider>
        <Router>
        <SidebarProvider>
        <div className="flex min-h-screen bg-white w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            {/* Top header with page title and notification icons */}
            <HeaderWithTitle />
            
            
            {/* Page content */}
            <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/sourcing-agent" element={<SourcingAgent />} />
                  <Route path="/outreach-agent" element={<OutreachAgent />} />
                  <Route path="/recommendation-agent" element={<RecommendationAgent />} />
                  <Route path="/ats-search" element={<ATSSearch />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
          </main>
        </div>
        <Toaster />
      </SidebarProvider>
    </Router>
    </PageTitleProvider>
    </EntityProvider>
  );
}

function HeaderWithTitle() {
  const { title, icon, badge } = usePageTitle();
  
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        {icon}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {badge}
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-2">
          <span className="text-white text-sm font-medium">U</span>
        </div>
      </div>
    </div>
  );
}

export default App;
