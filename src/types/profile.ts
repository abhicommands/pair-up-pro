// types/profile.ts

export interface Profile {
  id: string;
  name: string;
  role: string;               // e.g. "Software Engineering"
  yearsOfExperience: number;  // e.g. 5
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
  fallback: boolean;    // true if we had to assign randomly
  createdAt: Date;
}

export interface Stats {
  totalMentors: number;
  totalMentees: number;
  totalMatches: number;
  avgCompatibilityScore: number;
}
