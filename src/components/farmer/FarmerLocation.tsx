
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { FarmerDetails } from '@/types/farmer';

interface FarmerLocationProps {
  farmerData: FarmerDetails;
}

const FarmerLocation: React.FC<FarmerLocationProps> = ({ farmerData }) => {
  return (
    <div className="flex flex-wrap gap-2 text-muted-foreground mb-4">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{farmerData.location}</span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mx-1" />
        <span>Since {farmerData.since}</span>
      </div>
    </div>
  );
};

export default FarmerLocation;
