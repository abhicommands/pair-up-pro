// components/ProfileCard.tsx

import React from 'react';
import { Profile } from '@/types/profile';

interface ProfileCardProps {
  profile: Profile;
  type: 'mentor' | 'mentee';
  onRemove?: () => void;
}

export default function ProfileCard({
  profile, type, onRemove
}: ProfileCardProps) {
  return (
    <div className="relative border rounded-2xl p-4 shadow hover:shadow-lg transition">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title={`Remove ${type}`}
        >
          ✕
        </button>
      )}
      <h4 className="font-semibold text-lg">{profile.name}</h4>
      <p className="text-sm text-muted-foreground">{profile.role}</p>
      <p className="text-sm text-muted-foreground mb-2">
        {profile.yearsOfExperience} yrs experience
      </p>
      <div className="flex flex-wrap gap-1 mb-2">
        {profile.skills.map(skill => (
          <span
            key={skill}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {profile.goals.map(goal => (
          <span
            key={goal}
            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
          >
            {goal}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {profile.department} • {profile.availability}
      </p>
    </div>
  );
}
