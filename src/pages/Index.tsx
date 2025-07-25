// pages/Index.tsx

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const Index = () => {
  const [mentors, setMentors] = useState<Profile[]>([]);
  const [mentees, setMentees] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const { toast } = useToast();

  // Sample data for demo (remove in prod)
  useEffect(() => {
    setMentors([
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Engineering Manager',
        yearsOfExperience: 8,
        skills: ['React', 'TypeScript', 'Leadership'],
        goals: ['Team Building', 'Strategic Planning'],
        availability: '2-4 hours/week',
        department: 'Engineering',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Michael Chen',
        role: 'Data Scientist',
        yearsOfExperience: 5,
        skills: ['Python', 'ML', 'Data Analysis'],
        goals: ['Innovation', 'Technical Excellence'],
        availability: '1-2 hours/week',
        department: 'Engineering',
        createdAt: new Date(),
      },
    ]);

    setMentees([
      {
        id: '3',
        name: 'Alex Rivera',
        role: 'Frontend Engineer',
        yearsOfExperience: 2,
        skills: ['JavaScript', 'React'],
        goals: ['Career Growth'],
        availability: '2-4 hours/week',
        department: 'Engineering',
        createdAt: new Date(),
      },
      {
        id: '4',
        name: 'Jordan Kim',
        role: 'Product Analyst',
        yearsOfExperience: 1,
        skills: ['Data Analysis', 'SQL'],
        goals: ['Data Science'],
        availability: '3-5 hours/week',
        department: 'Product',
        createdAt: new Date(),
      },
    ]);
  }, []);

  // One‑to‑many matching with fallback
  const runMatching = async () => {
    setIsMatching(true);
    await new Promise(r => setTimeout(r, 800));

    const newMatches: Match[] = [];

    mentees.forEach(mentee => {
      let best: { mentor: Profile; score: number; sharedSkills: string[] } | null = null;

      mentors.forEach(mentor => {
        // shared skills & goals
        const sharedSkills = mentee.skills.filter(s =>
          mentor.skills.some(ms => ms.toLowerCase().includes(s.toLowerCase()))
        );
        const sharedGoals = mentee.goals.filter(g =>
          mentor.goals.some(mg => mg.toLowerCase().includes(g.toLowerCase()))
        );

        // bonuses
        const roleBonus = mentor.role === mentee.role ? 0.1 : 0;
        const expGap = Math.abs(mentor.yearsOfExperience - mentee.yearsOfExperience);
        const expBonus = expGap <= 3 ? 0.05 : 0;
        const deptBonus = mentor.department === mentee.department ? 0.1 : 0;

        // base scores
        const skillScore = sharedSkills.length / Math.max(mentee.skills.length, mentor.skills.length, 1);
        const goalScore = sharedGoals.length / Math.max(mentee.goals.length, mentor.goals.length, 1);

        const score = (skillScore * 0.6)
          + (goalScore * 0.15)
          + deptBonus
          + roleBonus
          + expBonus;

        if (!best || score > best.score) {
          best = { mentor, score, sharedSkills };
        }
      });

      let fallback = false;
      let chosenMentor = best!.mentor;
      let finalScore = best!.score;
      let sharedSkills = best!.sharedSkills;

      // fallback if no good match
      if (finalScore < 0.1) {
        fallback = true;
        const random = mentors[Math.floor(Math.random() * mentors.length)];
        chosenMentor = random;
        sharedSkills = [];
        finalScore = 0;
      }

      newMatches.push({
        id: `match-${mentee.id}-${chosenMentor.id}-${Date.now()}`,
        mentee,
        mentor: chosenMentor,
        score: finalScore,
        sharedSkills,
        fallback,
        createdAt: new Date(),
      });
    });

    setMatches(newMatches);
    setIsMatching(false);

    toast({
      title: "Matching Complete",
      description: `Created ${newMatches.length} matches${newMatches.some(m => m.fallback) ? ' (including random fallbacks)' : ''}.`,
    });
  };

  const addMentor = (data: Omit<Profile, 'id' | 'createdAt'>) => {
    setMentors(m => [
      ...m,
      { ...data, id: `mentor-${Date.now()}`, createdAt: new Date() }
    ]);
    toast({ title: "Mentor Added", description: `${data.name} added.` });
  };

  const addMentee = (data: Omit<Profile, 'id' | 'createdAt'>) => {
    setMentees(m => [
      ...m,
      { ...data, id: `mentee-${Date.now()}`, createdAt: new Date() }
    ]);
    toast({ title: "Mentee Added", description: `${data.name} added.` });
  };

  const removeMentor = (id: string) => {
    setMentors(m => m.filter(x => x.id !== id));
    toast({ title: "Mentor Removed" });
  };

  const removeMentee = (id: string) => {
    setMentees(m => m.filter(x => x.id !== id));
    toast({ title: "Mentee Removed" });
  };

  const getStats = (): Stats => {
    const avgScore = matches.length
      ? matches.reduce((sum, m) => sum + m.score, 0) / matches.length
      : 0;
    return {
      totalMentors: mentors.length,
      totalMentees: mentees.length,
      totalMatches: matches.length,
      avgCompatibilityScore: avgScore
    };
  };

  const isMatchDisabled = !mentors.length || !mentees.length;

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

          {/* Profiles */}
          <TabsContent value="profiles" className="space-y-8">
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
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p>No mentees yet</p>
                    <ProfileModal type="mentee" onAddProfile={addMentee} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mentees.map(m => (
                      <ProfileCard
                        key={m.id}
                        profile={m}
                        type="mentee"
                        onRemove={() => removeMentee(m.id)}
                      />
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
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p>No mentors yet</p>
                    <ProfileModal type="mentor" onAddProfile={addMentor} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mentors.map(m => (
                      <ProfileCard
                        key={m.id}
                        profile={m}
                        type="mentor"
                        onRemove={() => removeMentor(m.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Matching */}
          <TabsContent value="matching" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">AI‑Powered Matching</h2>
              <p>Find the best mentor for each mentee, with random fallback when needed.</p>
            </div>
            <MatchButton
              onRunMatch={runMatching}
              isDisabled={isMatchDisabled}
              isLoading={isMatching}
            />
            <MatchResults matches={matches} />
          </TabsContent>

          {/* Admin Dashboard */}
          <TabsContent value="admin">
            <AdminDashboard stats={getStats()} matches={matches} />
          </TabsContent>

          {/* Templates */}
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
