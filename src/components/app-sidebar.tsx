
import { Users, Briefcase, BarChart3, Search, Target, Send, MessageSquare, Sparkles, Settings, LogOut, Calendar, Bell, FileText, HelpCircle, Bot, Zap, Grid3X3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Premium badge for premium features
function PremiumBadge() {
  return (
    <span className="ml-2 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded select-none flex items-center">
      Premium
    </span>
  );
}

// New badge with icon for new features
function NewBadge() {
  return (
    <span className="ml-auto flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded select-none">
      <Sparkles className="w-3.5 h-3.5" />
      New
    </span>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 bg-white w-64">
      <SidebarHeader className="p-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/c400e8e7-acd7-4e89-85c8-4e16750ece3b.png" 
            alt="Synapse Logo" 
            className="w-8 h-8"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 bg-white">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/overview">
                    <Grid3X3 className="mr-2" size={18} />
                    <span>Overview</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* "AI Agents" are all premium, so "Premium" label next to header */}
          <SidebarGroupLabel className="text-gray-600 bg-white">
            <span className="flex items-center">
              AI Agents
              <PremiumBadge />
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/sourcing-agent">
                    <Search className="mr-2" size={18} />
                    <span>Sourcing Agent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/outreach-agent">
                    <MessageSquare className="mr-2" size={18} />
                    <span>Outreach Agent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/submission-agent">
                    <Send className="mr-2" size={18} />
                    <span>Submission Agent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 bg-white">Recruitment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/jobs">
                    <Briefcase className="mr-2" size={18} />
                    <span>Jobs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/candidates">
                    <Users className="mr-2" size={18} />
                    <span>Candidates</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/recruiters">
                    <Users className="mr-2" size={18} />
                    <span>Recruiters</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/trackers">
                    <Target className="mr-2" size={18} />
                    <span>Trackers</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 bg-white">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/tickets">
                    <HelpCircle className="mr-2" size={18} />
                    <span>Tickets</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/referrals">
                    <Send className="mr-2" size={18} />
                    <span>Referrals</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/curated-lists">
                    <FileText className="mr-2" size={18} />
                    <span>Curated lists</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 bg-white">Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/users">
                    <Users className="mr-2" size={18} />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/calendar">
                    <Calendar className="mr-2" size={18} />
                    <span>Calendar</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/notifications">
                    <Bell className="mr-2" size={18} />
                    <span>Notifications</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 bg-white">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=title]:text-purple-700">
                  <a href="/update-terms">
                    <FileText className="mr-2" size={18} />
                    <span>Update Terms</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/settings">
                    <Settings className="mr-2" size={18} />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-700 hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700">
                  <a href="/logout">
                    <LogOut className="mr-2" size={18} />
                    <span>Log Out</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
