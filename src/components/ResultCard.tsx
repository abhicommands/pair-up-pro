import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight } from 'lucide-react';

interface Person {
  name: string;
  skills: string[];
}

interface ResultCardProps {
  mentee: Person;
  mentor: Person;
  matchScore?: number;
}

// Card component displaying a matched mentor-mentee pair with skills
const ResultCard: React.FC<ResultCardProps> = ({ mentee, mentor, matchScore }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-muted/10 border-border/50 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 rounded-2xl group">
      <div className="space-y-4">
        {/* Match Score */}
        {matchScore && (
          <div className="flex justify-end">
            <Badge variant="secondary" className="text-xs font-medium">
              {Math.round(matchScore * 100)}% Match
            </Badge>
          </div>
        )}

        {/* Mentee Section */}
        <div className="space-y-2">
          <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {mentee.name}
          </h4>
          <div className="flex flex-wrap gap-1">
            {mentee.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-background/60 border-primary/20 text-foreground"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Connection Icon */}
        <div className="flex justify-center py-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
            <ArrowLeftRight className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
          </div>
        </div>

        {/* Mentor Section */}
        <div className="space-y-2">
          <h4 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
            {mentor.name}
          </h4>
          <div className="flex flex-wrap gap-1">
            {mentor.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-background/60 border-accent/20 text-foreground"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;