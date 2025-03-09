
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';
import { Product } from '@/data/categoryData';

interface ProductInfoProps {
  product: Product;
  categoryName: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, categoryName }) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {product.isOrganic && (
          <Badge className="bg-agri-green dark:bg-agri-light-green text-white hover:bg-agri-green">
            <Leaf className="h-3 w-3 mr-1" /> Organic
          </Badge>
        )}
        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          {categoryName}
        </Badge>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold text-agri-green dark:text-agri-light-green">
          ₹{product.price.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground ml-2">
          per item
        </span>
      </div>
      
      <p className="text-foreground mb-6">{product.description}</p>
      
      <div className="border-t border-b border-border py-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-foreground">Availability:</span>
          <span className={`font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
