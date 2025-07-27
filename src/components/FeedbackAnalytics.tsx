import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Star, Target, ArrowUp, ArrowDown, AlertTriangle } from "lucide-react";
import { RescrapeReason } from "./RescrapeReasonModal";

// Define CandidateFeedback interface locally since we removed the FeedbackModal
interface CandidateFeedback {
  candidateId: string;
  overallRating: number;
  profileAccuracy: "excellent" | "good" | "fair" | "poor";
  skillsMatch: "excellent" | "good" | "fair" | "poor";
  experienceRelevance: "excellent" | "good" | "fair" | "poor";
  overallQuality: "excellent" | "good" | "fair" | "poor";
  wouldInterview: boolean;
  comments?: string;
  timestamp: number;
}

interface FeedbackAnalyticsProps {
  feedbackData?: CandidateFeedback[];
  rescrapeReasons?: RescrapeReason[];
}

export function FeedbackAnalytics({ feedbackData = [], rescrapeReasons = [] }: FeedbackAnalyticsProps) {
  // Calculate metrics
  const totalFeedback = feedbackData.length;
  const avgRating = totalFeedback > 0 ? feedbackData.reduce((sum, f) => sum + f.overallRating, 0) / totalFeedback : 0;
  const interviewRate = totalFeedback > 0 ? (feedbackData.filter(f => f.wouldInterview).length / totalFeedback) * 100 : 0;
  
  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
    count: feedbackData.filter(f => f.overallRating === rating).length,
    percentage: totalFeedback > 0 ? (feedbackData.filter(f => f.overallRating === rating).length / totalFeedback) * 100 : 0
  }));

  // Quality metrics breakdown
  const qualityMetrics = [
    {
      metric: "Profile Accuracy",
      excellent: feedbackData.filter(f => f.profileAccuracy === "excellent").length,
      good: feedbackData.filter(f => f.profileAccuracy === "good").length,
      fair: feedbackData.filter(f => f.profileAccuracy === "fair").length,
      poor: feedbackData.filter(f => f.profileAccuracy === "poor").length,
    },
    {
      metric: "Skills Match",
      excellent: feedbackData.filter(f => f.skillsMatch === "excellent").length,
      good: feedbackData.filter(f => f.skillsMatch === "good").length,
      fair: feedbackData.filter(f => f.skillsMatch === "fair").length,
      poor: feedbackData.filter(f => f.skillsMatch === "poor").length,
    },
    {
      metric: "Experience Relevance",
      excellent: feedbackData.filter(f => f.experienceRelevance === "excellent").length,
      good: feedbackData.filter(f => f.experienceRelevance === "good").length,
      fair: feedbackData.filter(f => f.experienceRelevance === "fair").length,
      poor: feedbackData.filter(f => f.experienceRelevance === "poor").length,
    },
    {
      metric: "Overall Quality",
      excellent: feedbackData.filter(f => f.overallQuality === "excellent").length,
      good: feedbackData.filter(f => f.overallQuality === "good").length,
      fair: feedbackData.filter(f => f.overallQuality === "fair").length,
      poor: feedbackData.filter(f => f.overallQuality === "poor").length,
    }
  ];

  // Interview intent by rating
  const interviewByRating = [1, 2, 3, 4, 5].map(rating => {
    const ratingFeedback = feedbackData.filter(f => f.overallRating === rating);
    const wouldInterview = ratingFeedback.filter(f => f.wouldInterview).length;
    return {
      rating: `${rating}★`,
      total: ratingFeedback.length,
      wouldInterview,
      percentage: ratingFeedback.length > 0 ? (wouldInterview / ratingFeedback.length) * 100 : 0
    };
  }).filter(item => item.total > 0);

  // Time series data (last 30 days)
  const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayFeedback = feedbackData.filter(f => {
      const feedbackDate = new Date(f.timestamp);
      return feedbackDate.toDateString() === date.toDateString();
    });
    const dayRescrapes = rescrapeReasons.filter(r => {
      const rescrapeDate = new Date(r.timestamp);
      return rescrapeDate.toDateString() === date.toDateString();
    });
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      feedback: dayFeedback.length,
      rescrapes: dayRescrapes.length,
      avgRating: dayFeedback.length > 0 ? dayFeedback.reduce((sum, f) => sum + f.overallRating, 0) / dayFeedback.length : 0,
      interviewRate: dayFeedback.length > 0 ? (dayFeedback.filter(f => f.wouldInterview).length / dayFeedback.length) * 100 : 0
    };
  });

  // Rescrape reasons analysis
  const rescrapeInsights = {
    totalRescrapes: rescrapeReasons.length,
    topReasons: rescrapeReasons.reduce((acc, reason) => {
      reason.reasons.forEach(r => {
        acc[r] = (acc[r] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    commonMissingSkills: rescrapeReasons.flatMap(r => r.missingSkills).reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

  if (totalFeedback === 0 && rescrapeReasons.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">No Data Available Yet</h3>
            <p className="text-muted-foreground">
              Start collecting feedback and rescrape data to see analytics and insights.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
              <p className="text-2xl font-bold">{totalFeedback}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Rescrapes</p>
              <p className="text-2xl font-bold">{rescrapeInsights.totalRescrapes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {totalFeedback > 0 ? "Interview Rate" : "Sourcing Sessions"}
              </p>
              <p className="text-2xl font-bold">
                {totalFeedback > 0 ? `${interviewRate.toFixed(0)}%` : rescrapeInsights.totalRescrapes + totalFeedback}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="rescrapes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rescrapes">Rescrape Analysis</TabsTrigger>
          {totalFeedback > 0 && <TabsTrigger value="overview">Overview</TabsTrigger>}
          {totalFeedback > 0 && <TabsTrigger value="quality">Quality Metrics</TabsTrigger>}
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="rescrapes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Rescrape Reasons */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Most Common Issues</h3>
              {Object.keys(rescrapeInsights.topReasons).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(rescrapeInsights.topReasons)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([reason, count]) => (
                      <div key={reason} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{reason.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${(count / rescrapeInsights.totalRescrapes) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No rescrape data available yet.</p>
              )}
            </Card>

            {/* Missing Skills Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Most Requested Skills</h3>
              {Object.keys(rescrapeInsights.commonMissingSkills).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(rescrapeInsights.commonMissingSkills)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <Badge variant="outline">{skill}</Badge>
                        <span className="text-sm font-medium">{count}x requested</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No missing skills data available yet.</p>
              )}
            </Card>
          </div>

          {/* Rescrape vs Success Rate */}
          {rescrapeInsights.totalRescrapes > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Rescrape Impact Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{rescrapeInsights.totalRescrapes}</div>
                  <div className="text-sm text-muted-foreground">Total Rescrapes</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {((rescrapeInsights.totalRescrapes / (totalFeedback + rescrapeInsights.totalRescrapes)) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Rescrape Rate</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Object.keys(rescrapeInsights.commonMissingSkills).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Unique Missing Skills</div>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {totalFeedback > 0 && (
          <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={ratingDistribution.filter(d => d.count > 0)}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ rating, percentage }) => `${rating}: ${percentage.toFixed(0)}%`}
                  >
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Interview Intent by Rating */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Interview Intent by Rating</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={interviewByRating}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Would Interview']}
                    labelFormatter={(label) => `Rating: ${label}`}
                  />
                  <Bar dataKey="percentage" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
        )}

        {totalFeedback > 0 && (
        <TabsContent value="quality" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quality Metrics Breakdown</h3>
            <div className="space-y-6">
              {qualityMetrics.map((metric) => {
                const total = metric.excellent + metric.good + metric.fair + metric.poor;
                if (total === 0) return null;
                
                return (
                  <div key={metric.metric}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{metric.metric}</span>
                      <span className="text-sm text-muted-foreground">{total} responses</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Excellent", value: metric.excellent, color: "bg-green-500" },
                        { label: "Good", value: metric.good, color: "bg-blue-500" },
                        { label: "Fair", value: metric.fair, color: "bg-yellow-500" },
                        { label: "Poor", value: metric.poor, color: "bg-red-500" }
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className="w-16 text-sm">{item.label}</div>
                          <div className="flex-1">
                            <Progress 
                              value={(item.value / total) * 100} 
                              className="h-2"
                            />
                          </div>
                          <div className="w-12 text-sm text-right">
                            {((item.value / total) * 100).toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
        )}

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {totalFeedback > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Rating Trends (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgRating" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            )}

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Rescrape Trends</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Rescrapes']} />
                  <Line type="monotone" dataKey="rescrapes" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Improvement Suggestions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">AI Sourcing Improvement Suggestions</h3>
        <div className="space-y-3">
          {rescrapeInsights.totalRescrapes > 5 && (
            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800">High Rescrape Rate Detected</p>
                <p className="text-sm text-orange-700">
                  Consider adjusting initial sourcing criteria based on common rescrape reasons: {Object.keys(rescrapeInsights.topReasons).slice(0, 2).join(', ')}.
                </p>
              </div>
            </div>
          )}
          
          {Object.keys(rescrapeInsights.commonMissingSkills).length > 0 && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Target className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Missing Skills Pattern</p>
                <p className="text-sm text-blue-700">
                  Frequently requested missing skills: {Object.entries(rescrapeInsights.commonMissingSkills).slice(0, 3).map(([skill]) => skill).join(', ')}. 
                  Consider adding these to initial sourcing criteria.
                </p>
              </div>
            </div>
          )}
          
          {totalFeedback > 0 && avgRating < 3 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <ArrowDown className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Low Average Rating Detected</p>
                <p className="text-sm text-red-700">
                  Consider adjusting sourcing criteria or fit score thresholds to improve candidate quality.
                </p>
              </div>
            </div>
          )}

          {totalFeedback > 0 && interviewRate < 50 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Low Interview Rate</p>
                <p className="text-sm text-yellow-700">
                  Focus on improving skills matching and experience relevance to increase interview likelihood.
                </p>
              </div>
            </div>
          )}
          
          {totalFeedback > 0 && avgRating >= 4 && interviewRate >= 70 && (
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <ArrowUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Excellent Performance!</p>
                <p className="text-sm text-green-700">
                  Your AI sourcing is performing well. Consider expanding to more job positions.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}