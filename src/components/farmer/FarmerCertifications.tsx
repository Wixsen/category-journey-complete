
import React from 'react';

interface FarmerCertificationsProps {
  certifications: string[];
}

const FarmerCertifications: React.FC<FarmerCertificationsProps> = ({ certifications }) => {
  if (certifications.length === 0) return null;
  
  return (
    <div>
      <h4 className="text-sm font-medium text-foreground mb-2">Certifications</h4>
      <div className="flex flex-wrap gap-2">
        {certifications.map((certification, index) => (
          <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {certification}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FarmerCertifications;
