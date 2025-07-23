
import { Card } from "@/components/ui/card";
import { User, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Submission {
  id: string;
  candidate: string;
  job: string;
  status: string;
  submittedAt: string;
  fit: number;
  candidateFit: number;
  jobFit: number;
}

interface Props {
  recentSubmissions: Submission[];
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
}

const SubmissionHistory: React.FC<Props> = ({
  recentSubmissions,
  getStatusIcon,
  getStatusText
}) => (
  <Card className="p-8 bg-white shadow-xl border">
    <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
    <div className="space-y-4">
      {recentSubmissions.map((submission) => (
        <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{submission.candidate}</p>
              <p className="text-sm text-muted-foreground">{submission.job}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground">
                  Candidate Fit: {submission.candidateFit}
                </span>
                <span className="text-xs text-muted-foreground">
                  Job Fit: {submission.jobFit}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                {getStatusIcon(submission.status)}
                <span className="text-sm font-medium">{getStatusText(submission.status)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
            </div>
            <Badge variant="outline">Overall: {submission.fit}</Badge>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default SubmissionHistory;
