import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Building, Clock, Target } from 'lucide-react';
import { Profile } from '@/types/profile';

interface ProfileCardProps {
  profile: Profile;
  type: 'mentor' | 'mentee';
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, type }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          {profile.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          {profile.department}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {profile.availability}
        </div>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {profile.goals.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Goals</h4>
            <div className="flex flex-wrap gap-1">
              {profile.goals.map((goal, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;