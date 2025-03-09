
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array of images for the slideshow
  const images = [
    "https://images2.imgbox.com/f6/f6/yFHjkzUq_o.jpg",
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  ];

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-gray-900">
      {/* Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Agricultural slide ${index + 1}`} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay"></div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center z-10 px-4">
        <div className="animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            AgriRoad
          </h1>
          <div className="flex justify-center space-x-1 mb-8">
            {images.map((_, index) => (
              <span 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/60'
                }`}
              ></span>
            ))}
          </div>
          <Button 
            onClick={scrollToCategories}
            className="animate-bounce mt-8 bg-transparent border border-white text-white hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
