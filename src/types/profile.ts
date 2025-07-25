export interface Profile {
  id: string;
  name: string;
  skills: string[];
  goals: string[];
  availability: string;
  department: string;
  createdAt: Date;
}

export interface Match {
  id: string;
  mentee: Profile;
  mentor: Profile;
  score: number;
  sharedSkills: string[];
  createdAt: Date;
}

export interface Stats {
  totalMentors: number;
  totalMentees: number;
  matchedPairs: number;
  avgCompatibilityScore: number;
}