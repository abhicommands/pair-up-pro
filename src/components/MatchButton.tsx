import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Users } from 'lucide-react';

interface MatchButtonProps {
  onRunMatch: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

// Central action button for running the mentor-mentee matching algorithm
const MatchButton: React.FC<MatchButtonProps> = ({ onRunMatch, isDisabled, isLoading }) => {
  return (
    <div className="flex justify-center py-8">
      <Button
        onClick={onRunMatch}
        disabled={isDisabled || isLoading}
        variant="match"
        size="xl"
        className="px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Matching...
          </>
        ) : (
          <>
            <Users className="mr-3 h-6 w-6" />
            Run Match
          </>
        )}
      </Button>
    </div>
  );
};

export default MatchButton;