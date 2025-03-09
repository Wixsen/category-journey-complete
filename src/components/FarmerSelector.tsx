
import React from 'react';
import { MapPin } from 'lucide-react';
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
    <div className="flex items-center mb-4">
      <MapPin className="h-5 w-5 text-agri-green mr-2" />
      <div className="flex flex-col w-full">
        <span className="text-foreground mb-2">Select Farmer:</span>
        <div className="flex gap-2 items-center">
          <select 
            value={selectedFarmer}
            onChange={(e) => onFarmerChange(e.target.value)}
            className="p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-agri-green flex-1"
          >
            {farmers.map(farmer => (
              <option key={farmer} value={farmer}>{farmer} - {
                products.find(p => p.farmer === farmer)?.location
              }</option>
            ))}
          </select>
          <Button 
            variant="outline"
            onClick={toggleFarmerProfile}
            className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
          >
            {showFarmerProfile ? "Hide Profile" : "View Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FarmerSelector;
