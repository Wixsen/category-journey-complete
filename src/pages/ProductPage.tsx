
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, getCategoryById, getRecommendedProducts, products } from '@/data/categoryData';
import { useCart } from '@/contexts/CartContext';
import ProductBreadcrumbs from '@/components/ProductBreadcrumbs';
import ProductNotFound from '@/components/ProductNotFound';
import ProductImageSlider from '@/components/ProductImageSlider';
import ProductDetails from '@/components/ProductDetails';
import RecommendedProducts from '@/components/RecommendedProducts';

const ProductPage = () => {
  const { categoryId, productId } = useParams<{ categoryId: string; productId: string }>();
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(productId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const recommendedProducts = productId && categoryId 
    ? getRecommendedProducts(categoryId, productId) 
    : [];
  
  const farmers = productId && categoryId
    ? [...new Set(products
        .filter(p => p.categoryId === categoryId)
        .map(p => p.farmer))]
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (!product || !category) {
    return <ProductNotFound />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <ProductBreadcrumbs 
          categoryId={category.id} 
          categoryName={category.name} 
          productName={product.name} 
        />
      </div>
      
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="animate-fade-in">
              <ProductImageSlider mainImage={product.image} productName={product.name} />
            </div>
            
            <ProductDetails 
              product={product}
              categoryName={category.name}
              farmers={farmers}
              products={products}
              addToCart={addToCart}
            />
          </div>
        </div>
      </section>
      
      <RecommendedProducts products={recommendedProducts} />
      
      <Footer />
    </div>
  );
};

export default ProductPage;
