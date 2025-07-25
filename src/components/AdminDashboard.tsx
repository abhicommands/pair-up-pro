import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, BarChart3, AlertTriangle } from 'lucide-react';
import { Stats, Match } from '@/types/profile';

interface AdminDashboardProps {
  stats: Stats;
  matches: Match[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats, matches }) => {
  // Mock data for mentorship health (pairs with no recent sessions)
  const healthIssues = [
    { mentee: 'Alex Rivera', mentor: 'Sarah Johnson', daysSinceSession: 45 },
    { mentee: 'Jordan Kim', mentor: 'Michael Chen', daysSinceSession: 32 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Mentors</p>
                <p className="text-3xl font-bold text-primary">{stats.totalMentors}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Mentees</p>
                <p className="text-3xl font-bold text-accent">{stats.totalMentees}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Matched Pairs</p>
                <p className="text-3xl font-bold text-secondary-foreground">{stats.matchedPairs}</p>
              </div>
              <UserCheck className="h-8 w-8 text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary-glow/10 to-primary-glow/5 border-primary-glow/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-3xl font-bold text-primary-glow">{Math.round(stats.avgCompatibilityScore * 100)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary-glow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentorship Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Mentorship Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Pairs with no sessions logged in the last 30 days
          </p>
          
          {healthIssues.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-2xl mb-2">🎉</div>
              <p className="text-sm text-muted-foreground">All mentorship pairs are active!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {healthIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="font-medium">{issue.mentee}</span>
                    <span className="text-muted-foreground">↔</span>
                    <span className="font-medium">{issue.mentor}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {issue.daysSinceSession} days ago
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;