
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl w-full mx-auto">
        <Card className="py-14 px-10 mb-8 text-center bg-background shadow-xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            Synapse Recruitment AI
          </h1>
          <p className="text-xl text-muted-foreground mb-5">
            Effortlessly source, match, and recommend candidates with powerful AI agents. Address your recruitment needs in seconds.
          </p>
          <a href="/ai-recruiter">
            <Button size="lg" className="bg-primary text-white text-lg gap-2 w-full justify-center">
              <UserPlus className="w-5 h-5" /> Try the AI Recruiter <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </Card>
        <div className="mt-4 text-center text-muted-foreground font-medium">
          For existing workflows, explore classic Candidates and Jobs dashboards in the sidebar.
        </div>
      </div>
    </div>
  );
};

export default Index;
