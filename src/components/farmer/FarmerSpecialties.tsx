
import React from 'react';

interface FarmerSpecialtiesProps {
  specialties: string[];
}

const FarmerSpecialties: React.FC<FarmerSpecialtiesProps> = ({ specialties }) => {
  if (specialties.length === 0) return null;
  
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-foreground mb-2">Specialties</h4>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty, index) => (
          <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FarmerSpecialties;
