
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Send, MessageSquare, ArrowRight, Star } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const Index = () => {
  const { setTitle, setIcon, setBadge } = usePageTitle();

  useEffect(() => {
    setTitle("Synapse Recruitment AI");
    setIcon(<Star className="w-6 h-6 text-primary" />);
    setBadge(null);
  }, [setTitle, setIcon, setBadge]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-4xl w-full mx-auto px-4">
        <Card className="py-14 px-10 mb-8 text-center bg-background shadow-xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            Synapse Recruitment AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Revolutionize your recruitment with AI-powered agents that source, submit, and engage candidates automatically.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Sourcing Agent</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI finds perfect candidates from multiple platforms using advanced matching algorithms.
              </p>
              <a href="/sourcing-agent">
                <Button variant="outline" className="w-full">
                  Start Sourcing
                </Button>
              </a>
            </Card>
            
            <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
              <Send className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Submission Agent</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Automatically match and submit candidates to relevant job openings with smart tracking.
              </p>
              <a href="/submission-agent">
                <Button variant="outline" className="w-full">
                  Manage Submissions
                </Button>
              </a>
            </Card>
            
            <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Outreach Agent</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Personalized outreach messages and automated follow-ups to engage top talent.
              </p>
              <a href="/outreach-agent">
                <Button variant="outline" className="w-full">
                  Start Outreach
                </Button>
              </a>
            </Card>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">Premium AI Features</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          
          <a href="/sourcing-agent">
            <Button size="lg" className="bg-primary text-white text-lg gap-2 px-8">
              Try AI Agents Free <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </Card>
        
        <div className="text-center text-muted-foreground">
          <p className="mb-2">Need manual control? Use our classic tools:</p>
          <div className="flex justify-center gap-4">
            <a href="/candidates" className="text-primary hover:underline">Candidates</a>
            <span>•</span>
            <a href="/jobs" className="text-primary hover:underline">Jobs</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
