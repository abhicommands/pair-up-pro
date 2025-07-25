import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Lightbulb, TrendingUp, Heart, Briefcase, Users } from 'lucide-react';

const PlaceholderTemplates: React.FC = () => {
  const templates = [
    {
      title: 'Leadership Growth',
      description: 'Structured conversations for developing leadership skills and management capabilities',
      icon: TrendingUp,
      category: 'Career Development',
      status: 'Coming Soon'
    },
    {
      title: 'Return from Maternity',
      description: 'Support and guidance for smooth transition back to work after parental leave',
      icon: Heart,
      category: 'Life Transitions',
      status: 'Coming Soon'
    },
    {
      title: 'Technical Skill Building',
      description: 'Focused mentorship for developing specific technical competencies',
      icon: Lightbulb,
      category: 'Skill Development',
      status: 'Coming Soon'
    },
    {
      title: 'Career Transition',
      description: 'Navigate role changes, department moves, or career pivots with confidence',
      icon: Briefcase,
      category: 'Career Development',
      status: 'Coming Soon'
    },
    {
      title: 'New Employee Onboarding',
      description: 'Comprehensive support for new team members during their first 90 days',
      icon: Users,
      category: 'Onboarding',
      status: 'Coming Soon'
    },
    {
      title: 'Performance Improvement',
      description: 'Structured approach to address performance gaps and build success habits',
      icon: TrendingUp,
      category: 'Performance',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Guided Mentorship Templates</h2>
        <p className="text-muted-foreground">
          Structured conversation guides to help mentors and mentees make the most of their sessions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent opacity-75 cursor-not-allowed">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <template.icon className="h-5 w-5 text-accent" />
                </div>
                {template.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {template.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
                <Badge variant="outline" className="text-xs text-accent border-accent">
                  {template.status}
                </Badge>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  Interactive conversation guide
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            Template library launching soon with AI-powered conversation suggestions
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderTemplates;