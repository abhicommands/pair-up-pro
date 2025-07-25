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
              <h3 className="font-semibold text-foreground">Apexon</h3>
              <p className="text-sm text-muted-foreground"></p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Apexon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;