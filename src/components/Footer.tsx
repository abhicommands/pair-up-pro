import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Building2 } from 'lucide-react';

// Footer component with company placeholder and settings link
const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Company Logo Placeholder */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your Company</h3>
              <p className="text-sm text-muted-foreground">Empowering connections</p>
            </div>
          </div>

          {/* Settings Link */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Your Company. Built for meaningful mentor-mentee connections.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;