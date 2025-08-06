import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { User, Target, Globe, Database, Brain, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SourcingLoaderProps {
  isVisible: boolean;
  operation: "sourcing" | "rescraping";
}

const sourcingSteps = [
  { icon: Target, label: "Analyzing job requirements", duration: 4000 },
  { icon: Globe, label: "Searching across multiple platforms", duration: 8000 },
  { icon: Database, label: "Scraping candidate profiles", duration: 12000 },
  { icon: Brain, label: "Running AI fit score analysis", duration: 6000 },
  { icon: CheckCircle, label: "Filtering high-quality matches", duration: 2000 }
];

const rescrapeSteps = [
  { icon: Brain, label: "Processing your feedback", duration: 3000 },
  { icon: Target, label: "Refining search parameters", duration: 4000 },
  { icon: Globe, label: "Searching new sources", duration: 6000 },
  { icon: Database, label: "Finding additional candidates", duration: 4000 },
  { icon: CheckCircle, label: "Validating improved matches", duration: 2000 }
];

export function SourcingLoader({ isVisible, operation }: SourcingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  
  const steps = operation === "sourcing" ? sourcingSteps : rescrapeSteps;
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      setStepProgress(0);
      return;
    }

    let currentTime = 0;
    let stepIndex = 0;
    let stepStartTime = 0;

    const interval = setInterval(() => {
      currentTime += 100;
      
      // Calculate overall progress
      const overallProgress = Math.min((currentTime / totalDuration) * 100, 100);
      setProgress(overallProgress);

      // Calculate which step we're in
      let accumulatedTime = 0;
      let newStepIndex = 0;
      
      for (let i = 0; i < steps.length; i++) {
        if (currentTime <= accumulatedTime + steps[i].duration) {
          newStepIndex = i;
          break;
        }
        accumulatedTime += steps[i].duration;
        newStepIndex = i + 1;
      }

      // If we moved to a new step, reset step timing
      if (newStepIndex !== stepIndex) {
        stepIndex = newStepIndex;
        stepStartTime = currentTime;
        setCurrentStep(stepIndex);
      }

      // Calculate progress within current step
      if (stepIndex < steps.length) {
        const stepElapsed = currentTime - (steps.slice(0, stepIndex).reduce((sum, s) => sum + s.duration, 0));
        const stepProgressPercent = Math.min((stepElapsed / steps[stepIndex].duration) * 100, 100);
        setStepProgress(stepProgressPercent);
      }

      // Stop when complete
      if (currentTime >= totalDuration) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, operation, steps, totalDuration]);

  if (!isVisible) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            {operation === "sourcing" ? "AI Sourcing in Progress" : "Rescraping & Improving Results"}
          </div>
          <p className="text-sm text-muted-foreground">
            {operation === "sourcing" 
              ? "Our AI is analyzing millions of profiles to find the best candidates for you..."
              : "Analyzing your feedback and finding better candidates with improved criteria..."
            }
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/10 border border-primary/20' : 
                isCompleted ? 'bg-muted/50' : 'bg-muted/20'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-primary text-primary-foreground animate-pulse' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isCompleted ? 'text-green-600' :
                      isActive ? 'text-foreground' :
                      'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <Badge variant="secondary" className="text-xs animate-pulse">
                        {Math.round(stepProgress)}%
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                        Complete
                      </Badge>
                    )}
                  </div>
                  
                  {isActive && (
                    <div className="mt-1">
                      <Progress value={stepProgress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Expected Results:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>8-15 high-fit candidates</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3" />
              <span>8.2+ fit score minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>Multiple platform sources</span>
            </div>
          </div>
        </div>

        {/* Skeleton placeholder for results */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Preparing Results...</h4>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 bg-muted/20">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-3 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-14" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}