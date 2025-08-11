import { useState } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlatformCandidates from "@/components/candidates/PlatformCandidates";
import ATSSearchTab from "@/components/candidates/ATSSearchTab";

export default function CandidatesPage() {
  const { setTitle } = usePageTitle();
  const [activeTab, setActiveTab] = useState("platform");

  // Set page title
  setTitle("Candidates");

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track candidates from platform and external sources
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="platform">Platform Candidates</TabsTrigger>
            <TabsTrigger value="ats">ATS Search</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform" className="space-y-0">
            <PlatformCandidates />
          </TabsContent>
          
          <TabsContent value="ats" className="space-y-0">
            <ATSSearchTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
