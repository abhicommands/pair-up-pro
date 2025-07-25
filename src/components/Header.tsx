import React from 'react';
import { Users, Sparkles } from 'lucide-react';

// Header component with gradient background and app title
const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground shadow-lg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Users className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Mentor‑Mentee Matcher
          </h1>
          <Sparkles className="h-6 w-6 opacity-80 animate-pulse" />
        </div>
        <p className="text-center mt-3 text-primary-foreground/90 text-lg">
          Connect mentors with mentees through intelligent skill matching
        </p>
      </div>
    </header>
  );
};

export default Header;