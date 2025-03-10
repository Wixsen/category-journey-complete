import React from 'react';
import { Card } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react'; // Changed from default import to named import

interface QRCodeProps {
  url: string;
  title: string;
  description?: string;
  size?: number;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ 
  url, 
  title, 
  description,
  size = 200
}) => {
  return (
    <Card className="p-6 flex flex-col items-center text-center max-w-sm mx-auto border border-border shadow-md">
      <div className="mb-4 bg-white p-4 rounded-lg">
        <QRCodeSVG
          value={url}
          size={size}
          level="H"
          includeMargin={true}
          className="text-foreground"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-4 text-agri-green hover:text-agri-dark-green dark:text-agri-light-green dark:hover:text-agri-green"
      >
        Open Link
      </a>
    </Card>
  );
};

export default QRCodeComponent;
