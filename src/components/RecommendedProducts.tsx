
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/data/categoryData';

interface RecommendedProductsProps {
  products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-foreground">You May Also Like</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              categoryId={product.categoryId}
              isOrganic={product.isOrganic}
              isFeatured={product.isFeatured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
