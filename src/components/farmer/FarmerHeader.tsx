
import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import { FarmerDetails } from '@/types/farmer';

interface FarmerHeaderProps {
  farmerData: FarmerDetails;
}

const FarmerHeader: React.FC<FarmerHeaderProps> = ({ farmerData }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-semibold text-foreground">{farmerData.farmer}</h3>
      <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
        <span className="font-medium">{farmerData.rating.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default FarmerHeader;
