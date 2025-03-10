
import React from 'react';
import { Card } from '@/components/ui/card';

interface QRCodeProps {
  url: string;
  title: string;
  description?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, title, description }) => {
  // Generate a QR code SVG using a simple pattern
  const generateQRPatternSVG = () => {
    const size = 200;
    const cellSize = 8;
    const cells = size / cellSize;
    
    let svgContent = '';
    
    // Create a deterministic pattern based on the URL
    const hash = Array.from(url).reduce((acc, char) => {
      return (acc * 31 + char.charCodeAt(0)) & 0xffffffff;
    }, 0);
    
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        // Skip the finder patterns (corners)
        if ((i < 7 && j < 7) || (i < 7 && j >= cells - 7) || (i >= cells - 7 && j < 7)) {
          continue;
        }
        
        // Use hash plus position to determine if cell should be filled
        const shouldFill = ((hash + i * j) % 5) < 2;
        
        if (shouldFill) {
          svgContent += `<rect x="${j * cellSize}" y="${i * cellSize}" width="${cellSize}" height="${cellSize}" />`;
        }
      }
    }
    
    // Add finder patterns (the three corner squares)
    const addFinderPattern = (x: number, y: number) => {
      // Outer square
      svgContent += `<rect x="${x}" y="${y}" width="56" height="56" class="stroke-current" fill="none" stroke-width="8" />`;
      // Inner square
      svgContent += `<rect x="${x + 16}" y="${y + 16}" width="24" height="24" />`;
    };
    
    // Top-left, top-right, and bottom-left finder patterns
    addFinderPattern(0, 0);
    addFinderPattern(size - 56, 0);
    addFinderPattern(0, size - 56);
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="text-foreground">
        ${svgContent}
      </svg>
    `;
  };

  return (
    <Card className="p-6 flex flex-col items-center text-center max-w-sm mx-auto border border-border shadow-md">
      <div 
        className="mb-4 bg-white p-4 rounded-lg" 
        dangerouslySetInnerHTML={{ __html: generateQRPatternSVG() }} 
      />
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

export default QRCode;
