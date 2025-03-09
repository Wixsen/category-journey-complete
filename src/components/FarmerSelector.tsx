
import React from 'react';
import { MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/categoryData';

interface FarmerSelectorProps {
  selectedFarmer: string;
  farmers: string[];
  products: Product[];
  onFarmerChange: (farmer: string) => void;
  toggleFarmerProfile: () => void;
  showFarmerProfile: boolean;
}

const FarmerSelector: React.FC<FarmerSelectorProps> = ({
  selectedFarmer,
  farmers,
  products,
  onFarmerChange,
  toggleFarmerProfile,
  showFarmerProfile
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
      <div className="flex items-center">
        <User className="h-5 w-5 text-primary mr-2" />
        <span className="text-foreground font-medium">Farmer:</span>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3 items-start md:items-center">
        <select 
          value={selectedFarmer}
          onChange={(e) => onFarmerChange(e.target.value)}
          className="p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-1 text-foreground w-full md:w-auto"
        >
          {farmers.map(farmer => (
            <option key={farmer} value={farmer}>
              {farmer} - {products.find(p => p.farmer === farmer)?.location}
            </option>
          ))}
        </select>
        <Button 
          variant="outline"
          onClick={toggleFarmerProfile}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full md:w-auto"
        >
          {showFarmerProfile ? "Hide Profile" : "View Profile"}
        </Button>
      </div>
    </div>
  );
};

export default FarmerSelector;
