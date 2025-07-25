import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, ArrowRight, Star, Calendar } from 'lucide-react';
import { Match } from '@/types/profile';

interface MatchResultsProps {
  matches: Match[];
}

const MatchResults: React.FC<MatchResultsProps> = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🤝</div>
        <p className="text-muted-foreground">No matches yet. Run the matching algorithm to see results!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Matched Pairs ({matches.length})
        </h2>
        <p className="text-muted-foreground">
          AI-powered mentor-mentee pairings based on skills, goals, and compatibility
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-lg font-bold text-accent">
                    {Math.round(match.score * 100)}%
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Perfect Match
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Mentee */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Mentee</span>
                </div>
                <div className="pl-6">
                  <p className="font-semibold text-foreground">{match.mentee.name}</p>
                  <p className="text-xs text-muted-foreground">{match.mentee.department}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Mentor */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Mentor</span>
                </div>
                <div className="pl-6">
                  <p className="font-semibold text-foreground">{match.mentor.name}</p>
                  <p className="text-xs text-muted-foreground">{match.mentor.department}</p>
                </div>
              </div>

              {/* Shared Skills */}
              {match.sharedSkills.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium text-foreground">Shared Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {match.sharedSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Match Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3 w-3" />
                Matched {match.createdAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchResults;