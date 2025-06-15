import { Users, Briefcase, Home, Search, Target, Send, MessageSquare, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Premium badge for premium features
function PremiumBadge() {
  return (
    <span className="ml-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded select-none flex items-center">
      Premium
    </span>
  );
}

// New badge with icon for new features
function NewBadge() {
  return (
    <span className="ml-auto flex items-center gap-1 bg-muted text-muted-foreground text-xs font-semibold px-2 py-0.5 rounded select-none">
      <Sparkles className="w-3.5 h-3.5" />
      New
    </span>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Home className="mr-2" size={18} />
                    <span>Overview</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* "AI Agents" are all premium, so "Premium" label next to header */}
          <SidebarGroupLabel>
            <span className="flex items-center">
              AI Agents
              <PremiumBadge />
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/sourcing-agent">
                    <Target className="mr-2" size={18} />
                    <span>Sourcing Agent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/outreach-agent">
                    <MessageSquare className="mr-2" size={18} />
                    <span>Outreach Agent</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/submission-agent">
                    <Send className="mr-2" size={18} />
                    <span>Submission Agent</span>
                    <NewBadge />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recruitment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/candidates">
                    <Users className="mr-2" size={18} />
                    <span>Candidates</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/jobs">
                    <Briefcase className="mr-2" size={18} />
                    <span>Jobs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/faq">
                    <Search className="mr-2" size={18} />
                    <span>FAQ</span>
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
