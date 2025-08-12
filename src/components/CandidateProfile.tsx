
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, MapPin, Briefcase } from "lucide-react";

interface CandidateProfileProps {
  candidate: any;
}

export default function CandidateProfile({ candidate }: CandidateProfileProps) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
            {candidate.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1">{candidate.name}</h2>
          <p className="text-gray-600 mb-2">{candidate.title}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Surrey, BC
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Apr 30, 2024
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Badge variant="secondary">Active</Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="support">Support Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Experience</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Inna brings over 10 years of product and growth marketing experience across B2B fintech and SaaS startups, including direct experience scaling PLG-driven platforms in regulated industries. She has led multiple D2H product launches, owned top-funnel growth, and delivered measurable improvements in customer acquisition and engagement metrics.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="communications" className="mt-6 space-y-4">
          <div className="space-y-4">
            <h3 className="font-medium">Communication History</h3>
            
            <div className="space-y-3">
              {[
                {
                  type: "Email",
                  subject: "Initial Outreach - Senior Developer Position",
                  date: "2024-12-10",
                  status: "Sent",
                  platform: "Email"
                },
                {
                  type: "LinkedIn",
                  subject: "Follow-up message",
                  date: "2024-12-08",
                  status: "Read",
                  platform: "LinkedIn"
                },
                {
                  type: "Phone",
                  subject: "Screening call scheduled",
                  date: "2024-12-05",
                  status: "Completed",
                  platform: "Phone"
                }
              ].map((comm, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={comm.status === "Sent" ? "default" : comm.status === "Read" ? "secondary" : "outline"}>
                        {comm.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{comm.platform}</span>
                    </div>
                    <span className="text-sm text-gray-500">{comm.date}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{comm.subject}</p>
                    <p className="text-xs text-gray-600">{comm.type} communication</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <Button size="sm" className="w-full">
                Send New Message
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <p className="text-sm text-gray-500">No notes available.</p>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <p className="text-sm text-gray-500">No scheduled meetings.</p>
        </TabsContent>
        
        <TabsContent value="support" className="mt-6">
          <p className="text-sm text-gray-500">Support status information.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
