
import React from 'react';
import { getFarmerData } from '@/services/farmerService';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import FarmerLocation from '@/components/farmer/FarmerLocation';
import FarmerSpecialties from '@/components/farmer/FarmerSpecialties';
import FarmerCertifications from '@/components/farmer/FarmerCertifications';
import FarmerReviews from '@/components/farmer/FarmerReviews';

interface FarmerProfileProps {
  farmerName: string;
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({ farmerName }) => {
  const farmerData = getFarmerData(farmerName);

  return (
    <div className="animate-fade-in bg-card rounded-lg shadow-md overflow-hidden border border-border">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img 
            src={farmerData.image} 
            alt={farmerData.farmer} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <FarmerHeader farmerData={farmerData} />
          <FarmerLocation farmerData={farmerData} />
          <p className="text-foreground mb-4">{farmerData.about}</p>
          <FarmerSpecialties specialties={farmerData.specialties} />
          <FarmerCertifications certifications={farmerData.certifications} />
        </div>
      </div>
      <FarmerReviews reviews={farmerData.reviews} />
    </div>
  );
};

export default FarmerProfile;
