
import React from 'react';
import { Truck, ShieldCheck, Leaf } from 'lucide-react';

const ProductFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="flex items-center">
        <Truck className="h-5 w-5 text-agri-green mr-2" />
        <span className="text-sm text-muted-foreground">Fast Delivery</span>
      </div>
      <div className="flex items-center">
        <ShieldCheck className="h-5 w-5 text-agri-green mr-2" />
        <span className="text-sm text-muted-foreground">Quality Guaranteed</span>
      </div>
      <div className="flex items-center">
        <Leaf className="h-5 w-5 text-agri-green mr-2" />
        <span className="text-sm text-muted-foreground">Sustainably Grown</span>
      </div>
    </div>
  );
};

export default ProductFeatures;
