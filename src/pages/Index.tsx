import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DataInput from '@/components/DataInput';
import MatchButton from '@/components/MatchButton';
import ResultCard from '@/components/ResultCard';
import { useToast } from '@/hooks/use-toast';

interface Person {
  name: string;
  skills: string[];
}

interface Match {
  mentee: Person;
  mentor: Person;
  score: number;
}

// Main app component with layout and matching logic
const Index = () => {
  const [mentors, setMentors] = useState<Person[]>([]);
  const [mentees, setMentees] = useState<Person[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const { toast } = useToast();

  // Simple matching algorithm based on skill overlap
  const runMatching = async () => {
    setIsMatching(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newMatches: Match[] = [];
    const usedMentors = new Set<number>();

    mentees.forEach(mentee => {
      let bestMatch: { mentor: Person; score: number; index: number } | null = null;

      mentors.forEach((mentor, index) => {
        if (usedMentors.has(index)) return;

        // Calculate skill overlap score
        const commonSkills = mentee.skills.filter(skill => 
          mentor.skills.some(mentorSkill => 
            mentorSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(mentorSkill.toLowerCase())
          )
        );
        
        const score = commonSkills.length / Math.max(mentee.skills.length, mentor.skills.length);
        
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { mentor, score, index };
        }
      });

      if (bestMatch) {
        newMatches.push({
          mentee,
          mentor: bestMatch.mentor,
          score: bestMatch.score
        });
        usedMentors.add(bestMatch.index);
      }
    });

    setMatches(newMatches);
    setIsMatching(false);
    
    toast({
      title: "Matching Complete!",
      description: `Found ${newMatches.length} mentor-mentee pairs`,
    });
  };

  const mentorPlaceholder = `[
  {
    "name": "Sarah Johnson",
    "skills": ["React", "TypeScript", "Leadership", "Product Management"]
  },
  {
    "name": "Michael Chen",
    "skills": ["Node.js", "Python", "Data Science", "Machine Learning"]
  }
]`;

  const menteePlaceholder = `[
  {
    "name": "Alex Rivera",
    "skills": ["JavaScript", "React", "Frontend Development"]
  },
  {
    "name": "Jordan Kim",
    "skills": ["Python", "Data Analysis", "Statistics"]
  }
]`;

  const isMatchDisabled = mentors.length === 0 || mentees.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Data Input Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DataInput
            title="Mentors"
            placeholder={mentorPlaceholder}
            onLoadData={setMentors}
            isLoaded={mentors.length > 0}
          />
          <DataInput
            title="Mentees"
            placeholder={menteePlaceholder}
            onLoadData={setMentees}
            isLoaded={mentees.length > 0}
          />
        </div>

        {/* Match Button */}
        <MatchButton
          onRunMatch={runMatching}
          isDisabled={isMatchDisabled}
          isLoading={isMatching}
        />

        {/* Results Grid */}
        {matches.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Matched Pairs ({matches.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <ResultCard
                  key={index}
                  mentee={match.mentee}
                  mentor={match.mentor}
                  matchScore={match.score}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
