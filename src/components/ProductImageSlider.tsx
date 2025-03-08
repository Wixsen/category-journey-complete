
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageSliderProps {
  mainImage: string;
  productName: string;
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ mainImage, productName }) => {
  // Generate additional images by modifying the main image URL for demo purposes
  // In a real app, you would have actual different images
  const generateImageVariants = (url: string): string[] => {
    const images = [url];
    
    // Create 3 variants by adding query params to the URL
    // This simulates different images while using the same base image
    for (let i = 1; i <= 3; i++) {
      images.push(`${url}?v=${i}`);
    }
    
    return images;
  };
  
  const images = generateImageVariants(mainImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="relative">
      <div className="relative rounded-lg overflow-hidden border border-gray-100 aspect-square">
        <img 
          src={images[currentIndex]} 
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md h-10 w-10"
          onClick={goToPrevSlide}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md h-10 w-10"
          onClick={goToNextSlide}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-agri-green' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
