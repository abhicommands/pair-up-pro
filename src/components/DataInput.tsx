import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DataInputProps {
  title: string;
  placeholder: string;
  onLoadData: (data: any[]) => void;
  isLoaded: boolean;
}

// Component for inputting and loading mentor/mentee data via JSON
const DataInput: React.FC<DataInputProps> = ({ title, placeholder, onLoadData, isLoaded }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLoadData = () => {
    try {
      const parsedData = JSON.parse(inputValue);
      if (Array.isArray(parsedData)) {
        onLoadData(parsedData);
        setError('');
      } else {
        setError('Data must be an array');
      }
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <Card className="p-6 h-full bg-gradient-to-br from-card to-muted/20 border-border/50 shadow-lg">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>

        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-64 p-4 border border-border rounded-lg bg-background/80 text-foreground placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}

        <Button
          onClick={handleLoadData}
          disabled={!inputValue.trim() || isLoaded}
          variant="gradient"
          className="w-full"
        >
          {isLoaded ? '✓ Data Loaded' : 'Load Data'}
        </Button>
      </div>
    </Card>
  );
};

export default DataInput;