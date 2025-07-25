import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import ProfileModal from '@/components/ProfileModal';
import MatchButton from '@/components/MatchButton';
import MatchResults from '@/components/MatchResults';
import AdminDashboard from '@/components/AdminDashboard';
import PlaceholderTemplates from '@/components/PlaceholderTemplates';
import { useToast } from '@/hooks/use-toast';
import { Profile, Match, Stats } from '@/types/profile';

// Main app component with layout and matching logic
const Index = () => {
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [mentees, setMentees] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const { toast } = useToast();

  // Add sample data for demo
  React.useEffect(() => {
    const sampleMentors: Profile[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        skills: ['React', 'TypeScript', 'Leadership', 'Product Management'],
        goals: ['Team Building', 'Strategic Planning'],
        availability: '2-4 hours/week',
        department: 'Engineering',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Michael Chen',
        skills: ['Node.js', 'Python', 'Data Science', 'Machine Learning'],
        goals: ['Technical Excellence', 'Innovation'],
        availability: '1-2 hours/week',
        department: 'Engineering',
        createdAt: new Date()
      }
    ];
    
    const sampleMentees: Profile[] = [
      {
        id: '3',
        name: 'Alex Rivera',
        skills: ['JavaScript', 'React', 'Frontend Development'],
        goals: ['Career Growth', 'Technical Skills'],
        availability: '2-4 hours/week',
        department: 'Engineering',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Jordan Kim',
        skills: ['Python', 'Data Analysis', 'Statistics'],
        goals: ['Machine Learning', 'Data Science'],
        availability: '4-6 hours/week',
        department: 'Product',
        createdAt: new Date()
      }
    ];
    
    setMentors(sampleMentors);
    setMentees(sampleMentees);
  }, []);

  // Enhanced matching algorithm
  const runMatching = async () => {
    setIsMatching(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newMatches: Match[] = [];
    const usedMentors = new Set<string>();

    mentees.forEach(mentee => {
      let bestMatch: { mentor: Profile; score: number; sharedSkills: string[] } | null = null;

      mentors.forEach((mentor) => {
        if (usedMentors.has(mentor.id)) return;

        // Calculate skill overlap
        const commonSkills = mentee.skills.filter(skill => 
          mentor.skills.some(mentorSkill => 
            mentorSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(mentorSkill.toLowerCase())
          )
        );
        
        // Calculate goal alignment
        const commonGoals = mentee.goals.filter(goal =>
          mentor.goals.some(mentorGoal =>
            mentorGoal.toLowerCase().includes(goal.toLowerCase()) ||
            goal.toLowerCase().includes(mentorGoal.toLowerCase())
          )
        );
        
        // Weight: 70% skills, 20% goals, 10% department alignment
        const skillScore = commonSkills.length / Math.max(mentee.skills.length, mentor.skills.length, 1);
        const goalScore = commonGoals.length / Math.max(mentee.goals.length, mentor.goals.length, 1);
        const deptScore = mentee.department === mentor.department ? 0.1 : 0;
        
        const score = (skillScore * 0.7) + (goalScore * 0.2) + deptScore;
        
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { mentor, score, sharedSkills: commonSkills };
        }
      });

      if (bestMatch && bestMatch.score > 0.1) { // Minimum threshold
        newMatches.push({
          id: `match-${mentee.id}-${bestMatch.mentor.id}`,
          mentee,
          mentor: bestMatch.mentor,
          score: bestMatch.score,
          sharedSkills: bestMatch.sharedSkills,
          createdAt: new Date()
        });
        usedMentors.add(bestMatch.mentor.id);
      }
    });

    setMatches(newMatches);
    setIsMatching(false);
    
    toast({
      title: "Matching Complete!",
      description: `Found ${newMatches.length} mentor-mentee pairs`,
    });
  };

  const addMentor = (mentorData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newMentor: Profile = {
      ...mentorData,
      id: `mentor-${Date.now()}`,
      createdAt: new Date()
    };
    setMentors(prev => [...prev, newMentor]);
    toast({
      title: "Mentor Added!",
      description: `${mentorData.name} has been added as a mentor.`,
    });
  };

  const addMentee = (menteeData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newMentee: Profile = {
      ...menteeData,
      id: `mentee-${Date.now()}`,
      createdAt: new Date()
    };
    setMentees(prev => [...prev, newMentee]);
    toast({
      title: "Mentee Added!",
      description: `${menteeData.name} has been added as a mentee.`,
    });
  };

  const getStats = (): Stats => {
    const avgScore = matches.length > 0 
      ? matches.reduce((sum, match) => sum + match.score, 0) / matches.length 
      : 0;
    
    return {
      totalMentors: mentors.length,
      totalMentees: mentees.length,
      matchedPairs: matches.length,
      avgCompatibilityScore: avgScore
    };
  };

  const isMatchDisabled = mentors.length === 0 || mentees.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profiles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="matching">Matching</TabsTrigger>
            <TabsTrigger value="admin">Dashboard</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Profile Management Tab */}
          <TabsContent value="profiles" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">Profile Management</h2>
              <p className="text-muted-foreground">Manage mentor and mentee profiles for your organization</p>
            </div>

            <Tabs defaultValue="mentees" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
                <TabsTrigger value="mentees">Mentees ({mentees.length})</TabsTrigger>
                <TabsTrigger value="mentors">Mentors ({mentors.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="mentees" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Mentees</h3>
                  <ProfileModal type="mentee" onAddProfile={addMentee} />
                </div>
                
                {mentees.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                    <div className="text-4xl mb-4">👥</div>
                    <p className="text-muted-foreground mb-4">No mentees yet</p>
                    <ProfileModal type="mentee" onAddProfile={addMentee} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mentees.map((mentee) => (
                      <ProfileCard key={mentee.id} profile={mentee} type="mentee" />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mentors" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Mentors</h3>
                  <ProfileModal type="mentor" onAddProfile={addMentor} />
                </div>
                
                {mentors.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                    <div className="text-4xl mb-4">🧑‍🏫</div>
                    <p className="text-muted-foreground mb-4">No mentors yet</p>
                    <ProfileModal type="mentor" onAddProfile={addMentor} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mentors.map((mentor) => (
                      <ProfileCard key={mentor.id} profile={mentor} type="mentor" />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Matching Tab */}
          <TabsContent value="matching" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">AI-Powered Matching</h2>
              <p className="text-muted-foreground">Run our algorithm to find optimal mentor-mentee pairings</p>
            </div>

            <MatchButton
              onRunMatch={runMatching}
              isDisabled={isMatchDisabled}
              isLoading={isMatching}
            />

            <MatchResults matches={matches} />
          </TabsContent>

          {/* Admin Dashboard Tab */}
          <TabsContent value="admin">
            <AdminDashboard stats={getStats()} matches={matches} />
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <PlaceholderTemplates />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
