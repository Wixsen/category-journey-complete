
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-gray-900">
      <img 
        src="https://images2.imgbox.com/f6/f6/yFHjkzUq_o.jpg" 
        alt="Agricultural field with crops" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay"></div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center z-10 px-4">
        <div className="animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            AgriRoad
          </h1>
          <div className="flex justify-center space-x-1 mb-8">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
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
